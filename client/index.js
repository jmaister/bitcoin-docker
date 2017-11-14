var bitcoin = require('bitcoin');

// all config options are optional
const client = new bitcoin.Client({
  host: 'localhost',
  port: 8332,
  user: 'btc',
  pass: 'FDxmNSZRKWEC6Sg92eezsxUvdNceIXYrCUDbVADFujM=',
  timeout: 30000
});

client.getBlockchainInfo(function (err, info, headers) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("info", info);
        console.log("headers", headers);
    }
});