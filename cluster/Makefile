up: cluster init

down: cluster-down

cluster-down:
	k3d cluster delete maclust

clean: logs

git-config:
	git config --global user.name "hatimabdullah" && git config --global user.email "hatimalqiamh@gmail.com"

cluster:
	k3d cluster create maclust \
	    -p 80:80@loadbalancer \
	    -p 443:443@loadbalancer \
	    -p 30000-32767:30000-32767@server:0 \
	    -v /etc/machine-id:/etc/machine-id:ro \
	    -v /var/log/journal:/var/log/journal:ro \
	    -v /var/run/docker.sock:/var/run/docker.sock \
               --k3s-arg --disable=traefik@server:0 \
	    --agents 3

init: logs repos namespaces

logs:
	touch output.log
	rm -f output.log
	touch output.log

repos:
	helm repo add stable https://charts.helm.sh/stable
	helm repo add hashicorp https://helm.releases.hashicorp.com
	helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
	helm repo add grafana https://grafana.github.io/helm-charts
	helm repo add elastic https://helm.elastic.co
	helm repo add fluent https://fluent.github.io/helm-charts
	helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
	helm repo update

namespaces:
	kubectl apply -f init

install-service-mesh:
	echo "Service-Mesh: install" | tee -a output.log
	helm install consul hashicorp/consul -n service-mesh -f platform/service-mesh/values.yaml | tee -a output.log

delete-service-mesh:
	echo "Service-Mesh: delete" | tee -a output.log
	helm delete -n service-mesh consul 2>/dev/null | true

install-secrets:
	echo "Secrets: install" | tee -a output.log
	helm install vault hashicorp/vault -n secrets -f platform/secrets/values.yaml | tee -a output.log

delete-secrets:
	echo "Secrets: delete" | tee -a output.log
	helm delete -n secrets vault 2>/dev/null | true

install-ingress:
	echo "Ingress: install" | tee -a output.log
	kubectl apply -n ingress-nginx -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml | tee -a output.log
	kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s

delete-ingress:
	echo "Ingress: delete" | tee -a output.log
	kubectl delete -n ingress -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml | tee -a output.log 2>/dev/null | true


