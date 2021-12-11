# Description

this repo contains four different component which i will break down below. they serve to create an orchestrated and automated environment for a Q/A application. using k3d, docker, and jenkins.
## Break Down

### qa-service

a service that allows the user to submit question and answer them. a more descriptive postman collection is is included under the following path:
### base image

a service that creates a sandbox amazon machine image prepared with an immutable behavior to serve k3d (rancher's k8s distribution). it is used as the AMI for the environment's computing instance.
### infrastructure

infrastructure as code using terraform is created under this directory to launch all the needed resources to aws.
### cluster

all the cluster related tools and resources are listed under this directory such as CI/CD
# live env

link to the live environment: http://3.109.182.245