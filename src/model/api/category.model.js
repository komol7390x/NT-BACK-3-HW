import sequelize from '../../database/databasa.js'
import { DataTypes } from 'sequelize'
import {Tables} from '../../const/Table.js'

const CategoryModel=sequelize.define(Tables.API.CATEGORY,{

    title:{type:DataTypes.STRING,allowNull:false,unique:true,validate:{
        len:[3,128]
    }},
    desc:{type:DataTypes.STRING,validate:{
        len:[3,128]
    }},

    is_active:{type:DataTypes.BOOLEAN,defaultValue:false},

})

export default CategoryModel