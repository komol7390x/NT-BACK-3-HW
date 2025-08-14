import sequelize from '../../database/databasa.js'
import { DataTypes } from 'sequelize'
import { Tables } from '../../const/Table.js'

const ProductModel = sequelize.define(Tables.API.PRODUCT, {

    name: {
        type: DataTypes.STRING, allowNull: false, unique: true, validate: {
            len: [3, 128]
        }
    },
    price: {
        type: DataTypes.INTEGER, allowNull: false, validate: {
            min: 0
        }
    },

    quantity: {
        type: DataTypes.INTEGER, defaultValue: 0, validate: {
            min: 0
        }
    },

    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },

})

export default ProductModel