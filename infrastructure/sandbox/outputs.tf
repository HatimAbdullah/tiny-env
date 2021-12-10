output "sandbox_ip" {
  value = aws_instance.sandbox.public_ip
}

output "sandbox" {
  value = format("%s (%s)", aws_instance.sandbox.public_dns, aws_instance.sandbox.public_ip)
}

