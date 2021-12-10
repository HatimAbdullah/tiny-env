variable "owner" {
}

variable "name" {
}

data "amazon-ami" "packer_builder" {
  filters = {
    name                = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20200625"
    root-device-type    = "ebs"
    virtualization-type = "hvm"
  }
  most_recent = true
  owners      = ["099720109477"]
  region      = "ap-south-1"
}

locals { timestamp = regex_replace(timestamp(), "[- TZ:]", "") }

source "amazon-ebs" "packer_builder" {
  ami_name      = format("%s-sandbox-%s", var.name, local.timestamp)
  instance_type = "t2.medium"
  region        = "ap-south-1"

  run_tags = {
    owner = var.owner
    type  = "sandbox-packer-builder"
  }

  run_volume_tags = {
    owner = var.owner
    type  = "sandbox-packer-volume"
  }

  source_ami   = data.amazon-ami.packer_builder.id
  ssh_username = "ubuntu"
}

build {
  name    = "sandbox-ami-builder"
  sources = ["source.amazon-ebs.packer_builder"]

  provisioner "file" {
    destination = "/home/ubuntu/"
    source      = "./provision.sh"
  }

  provisioner "shell" {
    script = "./provision.sh"
  }
}
