import express from 'express';
import superheroesController from '../controllers/superheroes';
import uploadMiddleware from '../middleware/upload';
const router = express.Router();

router.get('/', superheroesController.getSuperheroes);
router.get('/:id', superheroesController.getSuperheroById);
router.delete('/:id', superheroesController.removeSuperhero);
router.post('/', uploadMiddleware.array('images'), superheroesController.addSuperhero);
router.put('/:id', uploadMiddleware.array('images'), superheroesController.updateSuperhero);

export default router;
