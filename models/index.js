// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
// Categories have many Products
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'product-tags',
  foreignKey: 'product_id',
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'tagged-products',
  foreignKey: 'tag_id',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};