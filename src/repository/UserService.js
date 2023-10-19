
import userModel from "../models/userModel.js";
import { generateAccessToken } from "../authen.js";


class RecipeController {

    findAll = async (req, res, next) => {
        try {
            const userModels = await userModel.find({});
           
            return userModels;
        } catch (err) {
            return err;
        }

    }

    findOne = async (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            return next();
        }
        try {

            const userModel = await userModel.find(req.query)
            return userModel;
        } catch (err) {
            return err;
        }
    }

    Update = async (req, res, next) => {

        // kiểm tra giá trị truyền đến nhé
        const { id } = req.params;
        try {
            console.log(id);
            const userUpdate = await userModel.findById(id).exec();
            if (!userUpdate) {
                return {
                    data: {
                        statusCode: 400,
                        success: false,
                        error: "User not found"
                    }
                };
            }
            await userModel.findOneAndUpdate({ _id: id }, req.body);
            return {
                data: {
                    statusCode: 200,
                    success: true,
                }
            };
        } catch (err) {
            return err;
        }
    }
    // Change = async (req, res, next) => {

    //     // kiểm tra giá trị truyền đến nhé
    //     const { password,id } = req.body;
    //     try {
    //         console.log(id);
    //         const userUpdate = await userModel.findById(id).exec();
    //         if (!userUpdate) {
    //             return {
    //                 data: {
    //                     statusCode: 400,
    //                     success: false,
    //                     error: "User not found"
    //                 }
    //             };
    //         }
    //         await userModel.findOneAndUpdate({ _id: id }, req.body);
    //         return {
    //             data: {
    //                 statusCode: 200,
    //                 success: true,
    //             }
    //         };
    //     } catch (err) {
    //         return err;
    //     }
    // }

    Create = async (req, res, next) => {

        const { email } = req.body;

        try {

            const user = await userModel.findOne({ email: email }).exec();

            if (user) {
                return {
                    data: {
                        statusCode: 400,
                        success: false,
                        data: "Email is not the same the other user"
                    }
                };
            }

            const userModelFind = await userModel.create(req.body)
            const token = generateAccessToken({ _id: userModelFind['_id'],role: userModelFind["role"]  });
            return {
                data: {
                    statusCode: 200,
                    success: true,
                    data: userModelFind,
                    token: token
                }
            };


        } catch (error) {
            return error;
        }
    }

    Login = async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const userModelFind = await userModel.findOne({ email: email, password: password }, { password: 0}).exec();
            if(!userModelFind){
               return {
                    data: {
                        statusCode: 400,
                        success: false,
                        data: "Kiểm tra lại tên hoặc mật khẩu"
                    }
                };
            }
            const token = generateAccessToken({ _id: userModelFind['_id'],role: userModelFind["role"] });
            return {
                data: {
                    statusCode: 200,
                    success: true,
                    data: userModelFind,
                    token: token
                }
            };
        } catch (err) {
            return err;
        }

    }
    getTopChief = async (req, res, next) => {
        try {
            const topChief = await userModel.aggregate([
                { $match : { role: 'chief'} },
                { $addFields : { 
                    followers_size :{
                        $size :{
                            $ifNull:[
                                "$followers",[]
                            ]
                        },
                        
                },
                recipe_size :{
                    $size :{
                        $ifNull:[
                            "$ownerRecipes",[]
                        ]
                    },
                    
                 }}},
                { $sort: { followers_size : -1} },
                { $limit : 9}
            ])
            return topChief;
            
        } catch (error) {
            return err;
        }
        
    }


}

export default new RecipeController;