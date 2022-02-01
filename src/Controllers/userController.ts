
import { AES } from "crypto-js";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";


export let UpdateUser = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.password) {
        req.body.password= AES.encrypt(
            req.body.password,
            process.env.AEC_KEY
        ).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
            {
              $set: req.body,
            },
              {new : true}
        )
        res.status(200).send(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export let DeleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {

          await User.findByIdAndDelete(req.params.id)
          res.status(200).json("User has been deleted !")

      } catch (err) {

          res.status(500).json(err)
          
      }
}

export let FindUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let user = await User.findById(req.params.id)
     !user 
      res.status(400).json("Invalid User")
    res.status(200).json(user)

} catch (err) {

    res.status(500).json(err)
    
}
}



export let FindAllUser = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.new
    try {
       const users = query
        ? await User.find().sort({_id: -1}).limit(5)
        : await User.find()        
       res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
}


export let UserStats = async (req: Request, res: Response, next: NextFunction) => {
  const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { $match: {createdAt: { $gte: lastyear } } },
            {
                $project: {
                    month: { $month: "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err.message)
    }
}