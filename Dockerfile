FROM node:8.12.0-alpine

ENV KUBE_VERSION="v1.11.3"
ENV HELM_VERSION="v2.11.0"

RUN \
    apk add --update ca-certificates bash python3 &&\
    apk add --update -t deps wget curl git &&\
    curl -s -L https://storage.googleapis.com/kubernetes-release/release/${KUBE_VERSION}/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl &&\
    chmod +x /usr/local/bin/kubectl &&\
    wget -q https://storage.googleapis.com/kubernetes-helm/helm-${HELM_VERSION}-linux-amd64.tar.gz &&\
    tar -xvf helm-${HELM_VERSION}-linux-amd64.tar.gz &&\
    mv linux-amd64/helm /usr/local/bin &&\
    helm init --client-only &&\
    helm plugin install https://github.com/rimusz/helm-tiller &&\
    pip3 install --upgrade pip &&\
    pip3 install awscli &&\
    which aws &&\
    wget -q https://amazon-eks.s3-us-west-2.amazonaws.com/1.10.3/2018-07-26/bin/linux/amd64/aws-iam-authenticator &&\
    chmod +x aws-iam-authenticator &&\
    cp aws-iam-authenticator /usr/local/bin &&\
    which aws-iam-authenticator &&\
    apk del --purge deps &&\
    rm /var/cache/apk/* &&\
    rm -f /helm-${HELM_VERSION}-linux-amd64.tar.gz

ADD build /app
ENV NODE_CONFIG_DIR /app/config
ENV HELM_HOME /root/.helm
RUN rm /app/config/local.js || /bin/true
WORKDIR /work
ENTRYPOINT ["node", "/app/dist"]
