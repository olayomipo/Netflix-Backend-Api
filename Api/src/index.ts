import express from "express";
import { connectDB } from "./db";
import dotenv from "dotenv"
import { LoginUser, PostUser } from "./Controllers/auth";
import { DeleteUser, FindAllUser, FindUserById, UpdateUser, UserStats } from "./Controllers/userController";
import { deleteMovie, findMovie, findMovieById, postMovie, putMovie } from "./Controllers/movieController";


dotenv.config({ path: '../bin/.env' });

connectDB()

const app: any = express()

// Our Express APP config
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

const auth: any = "/api/auth"
const user: any = "/api/user"
const list: any = "/api/list"
const movie: any = "/api/movie"




//auth
app.post(`${auth}/register`, PostUser);
app.post(`${auth}/login`, LoginUser);

//user
app.post(`${user}/`, UpdateUser)
app.get(`${user}/find/:id`, FindUserById)
app.get(`${user}/`, FindAllUser)
app.get(`${user}/stats`, UserStats)
app.delete(`${user}/:id`, DeleteUser)

//movie
app.post(`${movie}/`, postMovie)
app.put(`${movie}/:id`, putMovie)
app.delete(`${movie}/:id`, deleteMovie)
app.get(`${movie}/:id`, findMovieById)
app.get(`${movie}/`, findMovie)















const PORT : any = process.env.PORT || 600 ;
app.listen( PORT, () => {
    console.log(`App is running on port %d`, PORT)

})
