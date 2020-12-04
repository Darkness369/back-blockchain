const SHA256 = require("crypto-js/sha256");
const { Router } = require('express');
const router = Router();
let block = require('../model/blockchain_model');
const { CryptoBlockchain, CryptoBlock } = require('../test_blockchain')

router.post('/add', async(req, res) => {

    let bloque = new block(req.body);

    console.log(bloque);
    // console.log("smashingCoin mining in progress....");

    let smashingCoin = new CryptoBlockchain();


    smashingCoin.addNewBlock(new CryptoBlock(bloque));

    console.log(JSON.stringify(smashingCoin, null, 4));


    await bloque.save((err, doc) => {
        if (!err) {
            res.send(doc)

        } else {
            console.log('Error encontrando la información' + JSON.stringify(err, undefined, 2));
        }
    })

});



router.put('/:id', (req, res) => {

    let bloque = {}

});

router.get('/', (req, res) => {
    block.find((err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error encontrando la información' + JSON.stringify(err, undefined, 2));
        }
    })
});

router.get('/verify', (req, res) => {
    block.find((err, doc) => {
        if (!err) {
            res.send(doc)
            elbloque = JSON.stringify(doc)
            validation = checkChainValidity(elbloque)
        } else {
            console.log('Error encontrando la información' + JSON.stringify(err, undefined, 2));
        }
    })
});

function checkChainValidity(chain) {
    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const precedingBlock = chain[i - 1];

        if (currentBlock.hash !== currentBlock.computeHash()) {
            return false;
        }
        if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
}



module.exports = router;