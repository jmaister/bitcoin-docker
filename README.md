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

On each block notification, it prints the block info on the console. e.g.

    { hash: '00000000000000000035dc6b5416c3b1ca29e0e3548d4b831613446448c84e58',
    confirmations: 1,
    strippedsize: 978039,
    size: 1058792,
    weight: 3992909,
    height: 495809,
    version: 536870912,
    versionHex: '20000000',
    merkleroot: '570a81911c9cf73bb6c99a6b0ddb3a7c635790a07ddad80051ccaf6e0bb57429',
    tx:
    [ 'cbdf53523238c1628aa945ea4e08804cfc6c151b168577661dac8bc20ac9d59b',
        '90984a58554e308f7c578ec73a82e00d30c3f6093a84899aa1f3b17821467ce7',
        ... XXXX more items ],
    time: 1511482693,
    mediantime: 1511479203,
    nonce: 1698268244,
    bits: '1800ce4b',
    difficulty: 1364422081125.147,
    chainwork: '000000000000000000000000000000000000000000b7c5c6cb4510ef005dbe82',
    previousblockhash: '00000000000000000019c3ae904fe5c9d55c4ea7dfc76e81dce43b4fa7d5a66d' }
