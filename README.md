# Bitcoin-docker

Docker image to start a Bitcoin full node.

As of today, the full blockchain is about 195GB. Be patient while it downloads all the blockchain.

As soon as the downloader arrives to the current block, notifications will start runing walletnotify.sh to notify the app.

# Build

    docker build -t btc .

# Run 

    docker run --name btcrun -v ~/disk2/bitcoin:/usr/bitcoin -p 8332:8332 -p 8333:8333 --restart always -d btc

I used **~/disk2/bitcoin** as my local folder to store the bitcoin files. You can use whatever folder you like.

**--restart always** is useful to keep the image always running.

## Status while running

    docker logs -f btcrun

Log looks like this. height=495264 shows that the block 495264 has been downloaded, from date='2017-11-20 15:20:44'.

2017-11-23 23:53:45 UpdateTip: new best=0000000000000000009e2864647172364d0df128d8b998ee80a1f56de74d18d9 height=495264 version=0x20000000 log2_work=87.500887 tx=272978254 date='2017-11-20 15:20:44' progress=0.996718 cache=353.4MiB(2621051txo)

# Run app

    node clien/app.js

The app will listen on port 3000 to get notifications from bitcoind.

On each block notification, it prints the block info on the console.