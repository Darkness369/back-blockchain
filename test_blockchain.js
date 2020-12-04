const SHA256 = require("crypto-js/sha256");

const { Router } = require('express');
const router = Router();
let block = require('./model/blockchain_model');
// const { CryptoBlockchain, CryptoBlock } = require('../test_blockchain')

class CryptoBlock {
    constructor(index, data, precedingHash = " ") {
        this.index = index;
        this.timestamp = new Date();
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.nonce = 0;
    }

    computeHash() {
        return SHA256(
            this.index +
            this.precedingHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        ).toString();
    }

    proofOfWork(difficulty) {
        // let hola = Array(difficulty + 1).join("0")
        // console.log(hola)
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }
}

class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
    }
    startGenesisBlock() {
        return new CryptoBlock();
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        //newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }


}

router.get('/', (req, res) => {
    block.find((err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error encontrando la información' + JSON.stringify(err, undefined, 2));
        }
    })
});


// let smashingCoin = new CryptoBlockchain();

// console.log("smashingCoin mining in progress....");
// smashingCoin.addNewBlock(
//     new CryptoBlock(1, "01/06/2020", {
//         sender: "Iris Ljesnjanin",
//         recipient: "Cosima Mielke",
//         quantity: 50
//     })
// );

// smashingCoin.addNewBlock(
//     new CryptoBlock(2, "01/07/2020", {
//         sender: "Vitaly Friedman",
//         recipient: "Ricardo Gimenes",
//         quantity: 100
//     })
// );

// console.log(JSON.stringify(smashingCoin, null, 4));

// module.exports = {
//     CryptoBlockchain,
//     CryptoBlock
// }
router.post('/add', async(req, res) => {


    // console.log(bloque);
    // console.log("smashingCoin mining in progress....");



    let smashingCoin = new CryptoBlockchain();
    smashingCoin.addNewBlock(new CryptoBlock(req.body));
    console.log(JSON.stringify(smashingCoin, null, 4));
    // console.log(smashingCoin);

    let bloque = new block(smashingCoin);

    await bloque.save((err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error encontrando la información' + JSON.stringify(err, undefined, 2));
        }
    })

});

module.exports = router;