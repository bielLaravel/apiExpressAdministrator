const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category_name: String,
    category_description: String,
    is_active: { type: Boolean, default: false}
}, {
    timestamps: true,
})

//Exportem el module per poder utilitzarel
module.exports = mongoose.model('Category', CategorySchema);