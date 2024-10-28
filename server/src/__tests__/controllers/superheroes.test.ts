import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import Superhero from '../../models/superhero';
import c from '../../controllers/superheroes';
import fs from 'fs';
import path from 'path';
const app = express();

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /superheroes', () => {
  beforeEach(async () => {
    await Superhero.deleteMany({});
  });
  app.use(express.json());
  app.get('/superheroes', c.getSuperheroes);

  it('should return 400 if page or limit is not provided', async () => {
    const res = await request(app).get('/superheroes');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Page and limit parameters are required' });
  });

  it('should return 400 if page or limit is not a number', async () => {
    const res = await request(app).get('/superheroes?page=one&limit=5');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Page and limit must be valid numbers' });
  });

  it('should return a list of superheroes with pagination', async () => {
    const mockSuperheroes = [
      {
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'Krypton',
        superpowers: 'Flying',
        catch_phrase: 'Up, up, and away!',
      },
      {
        nickname: 'Batman',
        real_name: 'Bruce Wayne',
        origin_description: 'Gotham',
        superpowers: 'Intelligence',
        catch_phrase: 'I am vengeance!',
      },
      {
        nickname: 'Wonder Woman',
        real_name: 'Diana Prince',
        origin_description: 'Themyscira',
        superpowers: 'Strength',
        catch_phrase: 'For justice!',
      },
    ];

    await Superhero.insertMany(mockSuperheroes);

    const res = await request(app).get('/superheroes?page=1&limit=2');
    expect(res.statusCode).toEqual(200);
    expect(res.body.total).toEqual(2);
    expect(res.body.superheroes.length).toEqual(2);
    expect(res.body.superheroes[0].nickname).toBe('Superman');
  });
});

describe('GET /superheroes/:id', () => {
  app.use(express.json());
  app.get('/superheroes/:id', c.getSuperheroById);

  let superheroId: string;

  beforeEach(async () => {
    await Superhero.deleteMany({});

    const superhero = await Superhero.create({
      nickname: 'Superman',
      real_name: 'Clark Kent',
      origin_description: 'Krypton',
      superpowers: 'Flying',
      catch_phrase: 'Up, up, and away!',
    });

    superheroId = superhero._id.toString();
  });

  it('should return 404 if superhero is not found', async () => {
    const res = await request(app).get(`/superheroes/${superheroId}123`);
    expect(res.statusCode).toEqual(404);
    expect(res.text).toContain('Something went wrong.');
  });

  it('should return a superhero by ID', async () => {
    const res = await request(app).get(`/superheroes/${superheroId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.nickname).toBe('Superman');
    expect(res.body.real_name).toBe('Clark Kent');
  });
});

const imagesDir = path.join(__dirname, 'images');

describe('POST /superheroes', () => {
  app.use(express.json());
  app.post('/superheroes', c.addSuperhero);
  beforeAll((done) => {
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }
    done();
  });

  afterAll((done) => {
    const mockFilePath = path.join(imagesDir, 'superman.jpg');
    if (fs.existsSync(mockFilePath)) {
      fs.unlinkSync(mockFilePath);
    }
    done();
  });

  it('should return 400 if no files are provided', async () => {
    const res = await request(app).post('/superheroes').send({
      nickname: 'Batman',
      real_name: 'Bruce Wayne',
      origin_description: 'From Gotham',
      superpowers: 'Rich, Intelligent',
      catch_phrase: 'I am Batman!',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Files are required.');
  });
});
