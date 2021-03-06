# set env COINHIVE_ID
#
# docker rm -f btcrun
# docker build -t btc .
# docker run --name btcrun -v ~/disk2/bitcoin:/usr/bitcoin -p 8332:8332 -p 8333:8333 --restart always -d btc
# docker logs btcrun
#
# Env:
# -e ENVVAR='Value 1 asdf'
#
# clean: docker rmi $(docker images -a -q)
#
# connect:      docker exec -i -t btcrun /bin/bash
# connect root: docker exec -i -t -u root btcrun /bin/bash
#
# logs: docker logs -f btcrun
#
# show network graph: nload
#
# commands
# https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list
#
#
# $ bitcoin-cli -datadir=/usr/bitcoin -conf=~/.bitcoin/bitcoin.conf getinfo
#


#
# TODO
# - enable ssl: https://en.bitcoin.it/wiki/Enabling_SSL_on_original_client_daemon
#

FROM ubuntu:16.04
LABEL maintainer="Jordi Burgos <jordiburgos@gmail.com>"

RUN apt-get -y update
RUN apt-get -y install software-properties-common
RUN apt-add-repository ppa:bitcoin/bitcoin
RUN apt-get -y update
RUN apt-get -y install bitcoind

#RUN apt-get -y install nload nmap telnet curl net-tools sudo

RUN apt-get -y install curl

RUN apt-get clean && apt-get autoclean && apt-get autoremove

# Create user and set environment
RUN useradd --create-home --shell /bin/bash bitcoin
USER bitcoin
WORKDIR /home/bitcoin
ENV HOME /home/bitcoin

EXPOSE 8332 8333 18332 18333

# Config
RUN mkdir -p $HOME/.bitcoin
COPY bitcoin.conf $HOME/.bitcoin/

COPY walletnotify.sh $HOME

# Data directory
#RUN mkdir -p /usr/bitcoin
VOLUME /usr/bitcoin

CMD bitcoind -datadir=/usr/bitcoin -conf=/home/bitcoin/.bitcoin/bitcoin.conf
