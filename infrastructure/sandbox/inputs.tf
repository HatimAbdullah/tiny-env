variable "private_key_path" {
  description = "path to private key to inject into the instances to allow ssh"
  default     = "./ssh/id_rsa"
}

variable "public_key_path" {
  description = "path to public key to inject into the instances to allow ssh"
  default     = "./ssh/id_rsa.pub"
}

variable "key_name" {
  description = "keypair name"
  default     = "sandbox-key"
}

variable "name" {
  description = "A name to be used for naming resources"
}

variable "aws_region" {
  description = "india"
  default     = "ap-south-1"
}

variable "instance_type" {
  default = "t2.xlarge"
}
