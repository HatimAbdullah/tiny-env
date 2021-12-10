module "tags_sandbox" {
  source      = "git::https://github.com/cloudposse/terraform-null-label.git"
  namespace   = var.name
  environment = "dev"
  name        = "qa-env"
  delimiter   = "_"

  tags = {
    owner = var.name
    type  = "labs"
  }
}

resource "aws_vpc" "sandbox_vpc" {
  cidr_block           = "10.0.0.0/16"
  tags                 = module.tags_sandbox.tags
  enable_dns_hostnames = true
}

resource "aws_internet_gateway" "sandbox_ig" {
  vpc_id = aws_vpc.sandbox_vpc.id
  tags   = module.tags_sandbox.tags
}

resource "aws_route" "sandbox_internet_access" {
  route_table_id         = aws_vpc.sandbox_vpc.main_route_table_id
  gateway_id             = aws_internet_gateway.sandbox_ig.id
  destination_cidr_block = "0.0.0.0/0"
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_subnet" "sandbox_sn" {
  vpc_id                  = aws_vpc.sandbox_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[0]
  tags                    = module.tags_sandbox.tags
}

variable "ing" {
  type = list(any)
  default = [
    { from = 80, to = 80 },
    { from = 8080, to = 8080 },
    { from = 443, to = 443 },
    { from = 22, to = 22 },
  ]
}

resource "aws_security_group" "sandbox_sg" {
  vpc_id = aws_vpc.sandbox_vpc.id
  tags   = module.tags_sandbox.tags

  dynamic "ingress" {
    for_each = var.ing
    content {
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      from_port   = ingress.value.from
      to_port     = ingress.value.to
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "sandbox_kp" {
  key_name   = format("%s%s", var.name, "_keypair_2")
  public_key = file(var.public_key_path)
}

data "aws_ami" "latest_sandbox" {
  most_recent = true
  owners      = ["self"]
  name_regex  = "^-sandbox-\\d*$"

  filter {
    name   = "name"
    values = ["-sandbox-*"]
  }
}

resource "aws_instance" "sandbox" {
  ami                    = data.aws_ami.latest_sandbox.id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.sandbox_sn.id
  vpc_security_group_ids = [aws_security_group.sandbox_sg.id]
  key_name               = aws_key_pair.sandbox_kp.id

  root_block_device {
    volume_size = 50
    volume_type = "gp2"
  }

  tags = module.tags_sandbox.tags
}
