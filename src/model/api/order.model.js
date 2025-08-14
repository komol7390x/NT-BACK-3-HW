import sequelize from '../../database/databasa.js'
import { DataTypes } from 'sequelize'
import {Tables} from '../../const/Table.js'

const OrderModel=sequelize.define(Tables.API.ORDER,{
    customerID:{type:DataTypes.NUMBER,allowNull:false},
    productID:{type:DataTypes.NUMBER,allowNull:false}
})

export default OrderModel