import sequelize from '../../database/databasa.js'
import { DataTypes } from 'sequelize'
import { Tables } from '../../const/Table.js'

const SallerModel = sequelize.define(Tables.USER.SALLER, {
    full_name: {
        type: DataTypes.STRING, allowNull: false, validate: {
            len: [3, 128]
        }
    },
    email: {
        type: DataTypes.STRING, unique: true, allowNull: false, validate: {
            len: [3, 128]
        }
    },

    phone_number: { type: DataTypes.STRING(12), unique: true, allowNull: false },

    balance: {
        type: DataTypes.INTEGER, defaultValue: 0, validate: {
            min: 0
        }
    },

    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },

    role: { type: DataTypes.ENUM(Tables.USER.SALLER), defaultValue: Tables.USER.SALLER }
})

export default SallerModel