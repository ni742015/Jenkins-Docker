FROM node:9.6.0

RUN apt-get update
RUN apt-get install vim -y

RUN npm install -g pm2 --registry=https://registry.npm.taobao.org

ARG PRO_ENV=test
ENV PRO_ENV=$PRO_ENV

# 复制需要的目录
COPY ./ /demo

WORKDIR /demo
RUN /bin/bash scripts/build.sh

CMD /bin/bash scripts/start.sh
