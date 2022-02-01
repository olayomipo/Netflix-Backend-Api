
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { AES , enc} from "crypto-js";
import { sign } from "jsonwebtoken"; 

//REGISTER
export let PostUser = async (req: Request, res: Response, next: NextFunction) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: AES.encrypt(req.body.password, process.env.AEC_KEY).toString()
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
        
    } catch (err) {
        res.status(500).json(err)
    }

   
}

export let LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
            const user = await User.findOne({ username: req.body.username})
            !user && res.status(401).json(" Wrong Password or username! ")

            const hashedPassword = AES.decrypt(
                user.password,
                process.env.AEC_KEY
            )

            const paxxword = hashedPassword.toString(enc.Utf8)

            paxxword !== req.body.password &&
            res.status(401).json(" Wrong Credentials! ")

             const accessToken = sign(
              {
                id: user._id,
                isAdmin: user.isAdmin
              }, 
                 process.env.JWT_KEY,
                {expiresIn: "5d"}
            );


            const {password, ...others} = user._doc;

            res.status(200).json({...others, accessToken})

    } catch (err) {

        res.status(500).json(err)
        
    }
}

