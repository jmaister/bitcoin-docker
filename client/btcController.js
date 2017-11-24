const bitcoin = require('bitcoin-promise');

// all config options are optional
const client = new bitcoin.Client({
    host: '127.0.0.1',
    port: 8332,
    user: 'btc',
    pass: 'FDxmNSZRKWEC6Sg92eezsxUvdNceIXYrCUDbVADFujM=',
    timeout: 30000
});

const ctrl = {};

ctrl.getBlockByHeight = (req, res) => {
    const height = parseInt(req.params.height);
    client.getBlockHash(height).then((blockHash)=>{
        return client.getBlock(blockHash);
    })
    .then((blockInfo) => {
        res.json(blockInfo)
    })
    .catch(function (err) {
        res.status(500).send(err);
    });    
};


ctrl.getTxById = (req, res) => {
    const txid = parseInt(req.params.txid);
    client.getTransaction(txid)
    .then((args) => res.json(args))
    .catch(function (err) {
        res.status(500).send(err);
    });    
};

ctrl.getBlockById = (blockId) => {
    client.getBlock(blockId)
    .then((blockInfo) => {
        console.log(blockInfo);
    })
    .catch(function (err) {
        console.log('error', err);
    });    
};

exports.default = ctrl;
