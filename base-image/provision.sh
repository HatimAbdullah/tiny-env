#!/bin/bash

sudo apt update -y
sudo apt upgrade -y
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt update -y
sleep 10
sudo apt install -y curl vim jq git make apt-transport-https helm
bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"
sudo curl -sL get.docker.com | sh
sudo usermod -aG docker ubuntu
sudo docker pull rancher/k3s:v1.18.6-k3s1
sudo docker pull rancher/k3d-proxy:v3.0.1
sudo docker pull alpine
curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
curl -LOs https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod a+rx kubectl
sudo mv kubectl /usr/local/bin
sudo apt autoremove -y
echo "source /home/ubuntu/.bash_aliases"
echo 'alias k=kubectl' > /home/ubuntu/.bash_aliases
echo "alias ll='ls -gAlFh'"

echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list


echo "done"
