# node-k8s-inceptr

apply stuff to k8s clusters with multiple mechanisms such as specs and helm charts

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/the-watchmen/node-k8s-inceptr.svg?branch=master)](https://travis-ci.org/the-watchmen/node-k8s-inceptr)
[![npm (scoped)](https://img.shields.io/npm/v/@watchmen/k8s-inceptr.svg)](https://img.shields.io/npm/v/@watchmen/k8s-inceptr.svg)

> see [tests](test) for examples

## run

```
yarn
yarn start
```

## build

```
yarn build
```

> `yarn build` required before docker build!

## docker

### build

```
docker build -t {account}/k8s-inceptr:{tag} .
```
example:
```
docker build -t feenix/k8s-inceptr:1.0.0
```

### run

```
docker run --rm -v (pwd):/work -v $HOME/.kube/config:/root/.kube/config {account}/k8s-inceptr:{tag}
```

> if testing with local minikube add `--network host`

## work folder structure

```
+-/values
+-/secrets
+-inception.yaml
```
