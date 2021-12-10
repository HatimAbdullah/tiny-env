variable "region" {
  default = "ap-south-1"
}

variable "public_key_path" {
  description = "path to public key to inject into the instances to allow ssh"
  default     = "./ssh/id_rsa.pub"
}

variable "private_key_path" {
  description = "path to private key for ssh"
  default     = "./ssh/id_rsa"
}

variable "key_name" {
  description = "keypair name"
  default     = "sandbox-key"
}

variable "name" {
  description = "A name to be used for naming resources"
}

variable "instance_type" {
  default = "t2.xlarge"
}
