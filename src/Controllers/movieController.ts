
import { NextFunction, Request, Response } from "express";
import Movie from "../models/Movie";

export let postMovie = async (req: Request, res: Response, next: NextFunction) => {

    const newMovie = new Movie (req.body)

    try {
        const savedMovie = await newMovie.save()
        res.status(201).json(savedMovie)

    } catch (err) {
        res.status(500).json(err)
    }

}


export let putMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
          {
            $set: req.body,
          },
            {new : true}
      )
      res.status(200).send(updatedMovie)
        
    } catch (err) {
        res.status(500).json(err)
    }

}
export let deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("Movie has been deleted !")
        } catch (err) {
            res.status(500).json(err)
        }

}

export let findMovieById = async (req: Request, res: Response, next: NextFunction) => {

        try {

            const movie = await Movie.findOne({userId: req.params.id})
            
            res.status(200).json(movie)
        } catch (err) {
            res.status(500).json(err)
        }

}

export let findMovie = async (req: Request, res: Response, next: NextFunction) => {
    
        try {
            const movies = await Movie.find()
            res.status(200).json(movies)
        } catch (err) {
            res.status(500).json(err)
        }

}
