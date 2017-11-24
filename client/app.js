
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const btcController = require('./btcController').default;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.post('/notify', function (req, res) {
    console.log("/notify");
    console.log(req.body);
    res.json({ok: true});
    if (req.body.c === 'block') {
        console.log('new block');
        btcController.getBlockById(req.body.txid);
    } else {
        console.log('Other event');
    }
});

app.get('/block/height/:height', btcController.getBlockByHeight);
app.get('/tx/:txid', btcController.getTxById);
