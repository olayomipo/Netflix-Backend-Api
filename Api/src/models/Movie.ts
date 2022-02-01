
import mongoose from "mongoose";

export const MovieSchema = new mongoose.Schema({

    title: { 
        type: String,
        required: true,
        unique: true
     },
    desc: { 
        type: String,
     },
    Image: { 
        type: String,
     },
     ImageTitle: { 
        type: String,
     },
     ImageSm: { 
        type: String,
     },
     trailer: { 
        type: String,
     },
     video: { 
        type: String,
     },
     year: {
        type: String,
     },
     limit: {
        type: Number,
     },
     genre: {
        type:String,
     },
     isSeries: {
        type: Boolean,
        default: false
     }

  },
   { timestamps: true }
   );

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
