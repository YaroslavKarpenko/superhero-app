import mongoose, { Types } from 'mongoose';
import { Superhero } from '../types';
// import Grid from 'gridfs-stream';

// let gfs;
// mongoose.connection.once('open', () => {
//   gfs = Grid(mongoose.connection.db, mongoose.mongo);
// });

// const superheroSchema = new mongoose.Schema<Superhero>({
//   nickname: String,
//   real_name: String,
//   origin_description: String,
//   superpowers: [String],
//   catch_phrase: String,
//   // images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fs.files' }], // Reference GridFS files
// });

// interface SuperheroDocument {
//   __v?: unknown;
//   _id?: Types.ObjectId;
//   id: string;
//   nickname: string;
//   real_name: string;
//   origin_description: string;
//   superpowers: string;
//   catch_phrase: string;
//   images: string[];
// }

const superheroSchema = new mongoose.Schema<Superhero>({
  nickname: { type: String, required: true, unique: true },
  real_name: { type: String, required: true },
  origin_description: { type: String, required: true },
  superpowers: { type: String, required: true },
  catch_phrase: { type: String, required: true },
  images: { type: [String], required: true },
});

superheroSchema.set('toJSON', {
  transform: (_document, returnedObject: Record<string, unknown>) => {
    if (returnedObject._id instanceof Types.ObjectId) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const superheroModel = mongoose.model<Superhero>('Superhero', superheroSchema);

export default superheroModel;
