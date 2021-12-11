build:
	docker build -t ${tag} .
clean:
	docker rmi -f ${tag}
runi:
	docker run -d -p ${port}:${port} --name ${name} ${tag}
