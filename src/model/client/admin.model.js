import sequelize from '../../database/databasa.js'
import { DataTypes } from 'sequelize'
import {Tables} from '../../const/Table.js'

const AdminModel=sequelize.define(Tables.USER.ADMIN,{
    full_name:{type:DataTypes.STRING,allowNull:false,validate:{
        len:[3,128]
    }},
    email:{type:DataTypes.STRING,unique:true,allowNull:false,validate:{
        len:[3,128]
    }},

    is_active:{type:DataTypes.BOOLEAN,defaultValue:true},

    role:{type:DataTypes.ENUM(Tables.USER.ADMIN),defaultValue:Tables.USER.ADMIN}
})

export default AdminModel