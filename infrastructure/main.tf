
provider "aws" {
  profile = "default"
  region  = var.region
}

module "dev" {
  name             = var.name
  source           = "./sandbox"
  key_name         = var.key_name
  public_key_path  = var.public_key_path
  private_key_path = var.private_key_path
  instance_type    = var.instance_type
  aws_region       = var.region
}

