module.exports = {
    // product
    addProduct: require('./create/addProduct'),
    getProduct: require('./read/getProduct'),
    editProduct: require('./edit/editProduct'),
    updateStock: require('./edit/editStock'),
    deleteStock: require('./delete/deleteProduct'),

    // category
    addCategory: require('./create/addCategory'),
    getCategory: require('./read/getCategory'),
    editCategory: require('./edit/editCategory'),
    deleteCategory: require('./delete/deleteCategory')
}