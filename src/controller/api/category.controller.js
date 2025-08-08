import { BaseController } from "../base.controller.js";
import { Category } from '../../model/api/category.model.js'
import { AppError } from "../../error/AppError.js";
import { successRes } from "../../utils/successRes.js";

class CategoryController extends BaseController {
    constructor() {
        super(Category)
    }
    createCategory=async(req,res,next)=>{
        try {
            const {name}=req.body
            const exists=await Category.findOne({name})
            if(exists){
                throw new AppError(`this ${name} already create on Category`)
            }
            const result=await Category.create(req.body)
            return successRes(res,result,201)
        } catch (error) {
            next(error)
        }
    }

    updateCategory=async(req,res,next)=>{
        try {
            const id=req.params.id
            const {name}=req.body
            const exists=await Category.findOne({name})
            if(exists){
                throw new AppError(`this ${name} already create on Category`)
            }
            await BaseController.checkById(id,Category)
            const result=await Category.findByIdAndUpdate(id,req.body,{new:true})
            return successRes(res,result)
        } catch (error) {
            next(error)
        }
    }
}

export default new CategoryController()