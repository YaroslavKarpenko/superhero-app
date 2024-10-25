import { RequestHandler } from 'express';
import Superhero from '../models/superhero';
import mongoose from 'mongoose';
import { Superhero as SuperheroInterface } from '../types';
import fs from 'fs';
import path from 'path';

const getSuperheroes: RequestHandler = async (req, res) => {
  try {
    const { page, limit } = req.query;

    if (!page || !limit) {
      res.status(400).json({ error: 'Page and limit parameters are required' });
      return;
    }

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      res.status(400).json({ error: 'Page and limit must be valid numbers' });
      return;
    }

    const totalSuperheroes = await Superhero.countDocuments();
    const pageCount = Math.ceil(totalSuperheroes / Number(limit));

    const superheroList = await Superhero.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.status(200).json({ total: pageCount, superheroes: superheroList });
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(404).send(errorMessage);
  }
};

const getSuperheroById: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const superheroById = await Superhero.findById(id);
    res.status(200).json(superheroById);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(404).send(errorMessage);
  }
};

const addSuperhero: RequestHandler = async (req, res) => {
  try {
    if (!Array.isArray(req.files)) {
      res.status(400).json({ error: 'Files are required.' });
      return;
    }

    const imagePaths = req.files.map((file: Express.Multer.File) => `images\/${file.filename}`);

    const superhero = new Superhero({
      ...req.body,
      images: imagePaths,
    });

    const savedSuperhero = await superhero.save();
    res.status(201).json(savedSuperhero);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(404).send(errorMessage);
  }
};

const updateSuperhero: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body as SuperheroInterface;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({ message: 'Invalid superhero ID' }).status(400);
      return;
    }
    const superhero = await Superhero.findById(id);

    if (!superhero) {
      res.json({ message: 'Superhero not found' });
      return;
    }

    if (req.files && Array.isArray(req.files)) {
      superhero.images.forEach((imagePath) => {
        const filePath = path.join(process.cwd(), '..', 'images', path.basename(imagePath));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      const newImagePaths = req.files.map(
        (file: Express.Multer.File) => `images\/${file.filename}`,
      );
      superhero.images = newImagePaths;
    }

    superhero.nickname = nickname;
    superhero.real_name = real_name;
    superhero.origin_description = origin_description;
    superhero.superpowers = superpowers;
    superhero.catch_phrase = catch_phrase;

    await superhero.save();

    res.status(200).json(superhero);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(404).send(errorMessage);
    return;
  }
};

const removeSuperhero: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const superhero = await Superhero.findById(id);

    if (!superhero) {
      res.status(404).json({ message: 'Superhero not found' });
      return;
    }
    superhero.images.forEach((imagePath) => {
      const filePath = path.join(process.cwd(), '..', 'images', path.basename(imagePath));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Superhero.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(404).send(errorMessage);
  }
};

export default { getSuperheroes, getSuperheroById, addSuperhero, updateSuperhero, removeSuperhero };
