Category.init(
    {
      // define columns
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'category',
    }
  );
  
  module.exports = Category;
  