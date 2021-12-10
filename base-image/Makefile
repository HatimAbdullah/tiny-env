OWNER=000
NAME=mars

default: pack

shell:
	docker container run -it --rm \
		   --env AWS_PROFILE=default \
		   -v $$PWD/creds:/root/.aws \
		   -v /var/run/docker.sock:/var/run/docker.sock \
		   -v $$PWD:/$$(basename $$PWD) \
		   --hostname "$$(basename $$PWD)" \
		   --name "$$(basename $$PWD)" \
		   -w /$$(basename $$PWD) \
		   bryandollery/terraform-packer-aws-alpine

pack:
	docker container run -it --rm \
		   --env AWS_PROFILE=default \
		   -v $$PWD/creds:/root/.aws \
		   -v /var/run/docker.sock:/var/run/docker.sock \
		   -v $$PWD:/$$(basename $$PWD) \
		   --hostname "$$(basename $$PWD)" \
		   --name "$$(basename $$PWD)" \
		   -w /$$(basename $$PWD) \
		   --entrypoint="/usr/local/bin/packer" \
		   bryandollery/terraform-packer-aws-alpine build -var="owner=$$OWNER" -var="name=$$NAME" packer.pkr.hcl

fmt:
	docker container run -it --rm \
		   -v $$PWD/creds:/root/.aws \
		   -v /var/run/docker.sock:/var/run/docker.sock \
		   -v $$PWD:/$$(basename $$PWD) \
		   --hostname "$$(basename $$PWD)" \
		   --name "$$(basename $$PWD)" \
		   -w /$$(basename $$PWD) \
		   --entrypoint="/usr/local/bin/packer" \
		   bryandollery/terraform-packer-aws-alpine fmt -var="owner=$$OWNER" -var="name=$$NAME" packer.pkr.hcl

inspect:
	docker container run -it --rm \
		   -v $$PWD/creds:/root/.aws \
		   -v /var/run/docker.sock:/var/run/docker.sock \
		   -v $$PWD:/$$(basename $$PWD) \
		   --hostname "$$(basename $$PWD)" \
		   --name "$$(basename $$PWD)" \
		   -w /$$(basename $$PWD) \
		   --entrypoint="/usr/local/bin/packer" \
		   bryandollery/terraform-packer-aws-alpine inspect -var="owner=$$OWNER" -var="name=$$NAME" packer.pkr.hcl

stop:
	        docker rm -f "$$(basename $$PWD)" 2> /dev/null || true
