#!/bin/sh

docker rm -f btcrun
docker build -t btc .
docker run --name btcrun -v ~/disk2/bitcoin:/usr/bitcoin -p 8332:8332 -p 8333:8333 --restart always -d btc
