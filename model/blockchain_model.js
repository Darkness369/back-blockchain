const { Schema, model, Mixed } = require('mongoose');

const blockChainSchema = new Schema({
    blockchain: {
        type: [
            Mixed
        ]
    },
    difficulty: {
        type: Number
    }

})

module.exports = model('blockchain', blockChainSchema);