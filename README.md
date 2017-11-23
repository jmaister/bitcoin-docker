# Bitcoin-docker

Docker image to start a Bitcoin full node

# Build

    docker build -t btc .

# Run 

    docker run --name btcrun -v ~/disk2/bitcoin:/usr/bitcoin -p 8332:8332 -p 8333:8333 --restart always -d btc

I used **~/disk2/bitcoin** as my local folder to store the bitcoin files. You can use whatever folder you like.

**--restart always** is useful to keep the image always running.