FROM node:8.12.0-alpine

ADD build /app
ENV NODE_CONFIG_DIR /app/config
RUN rm /app/config/local.js || /bin/true

ENV KUBE_VERSION="v1.11.3"
ENV HELM_VERSION="v2.10.0"

RUN apk add --update ca-certificates bash \
 && apk add --update -t deps wget curl git \
 && curl -L https://storage.googleapis.com/kubernetes-release/release/${KUBE_VERSION}/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl \
 && chmod +x /usr/local/bin/kubectl \
 && wget https://storage.googleapis.com/kubernetes-helm/helm-${HELM_VERSION}-linux-amd64.tar.gz \
 && tar -xvf helm-${HELM_VERSION}-linux-amd64.tar.gz \
 && mv linux-amd64/helm /usr/local/bin \
# && mkdir -p $(helm home)/plugins \
 && helm init --client-only \
 && helm plugin install https://github.com/rimusz/helm-tiller \
 && apk del --purge deps \
 && rm /var/cache/apk/* \
 && rm -f /helm-${HELM_VERSION}-linux-amd64.tar.gz

ENTRYPOINT ["node"]
CMD ["/app/dist"]

# to build:
#
# yarn build
# docker build -t k8s-boot .
#
# to run:
#
# docker run -e K8S_BOOT_ROOT=/k8s-boot -v $(pwd):/k8s-boot
#
# working directory should have:
#
# +-/values
# +-/secrets
# +-bootstrap.yaml
