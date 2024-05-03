const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');
const schemas = moongoose.Schema;
const ObjectId = schemas.ObjectId;

const productSchema = new schemas({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: Array,
        required: true,
        default: []
    },
    size: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: Object,
        default: {}
    }
});
module.exports = moongoose.model('product', productSchema);