module.exports = (sequelize, DataTypes) => {
    let alias = "Product";

    let cols = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(100)
        },
        price: {
            type: DataTypes.DOUBLE
        },
        discount: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING(45)
        },
        description: {
            type: DataTypes.STRING(500)
        },
        image: {
            type: DataTypes.STRING(45)
        }
    };

    let config= {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias,cols,config);
    return Product;
}