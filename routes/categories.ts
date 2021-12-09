import { Router } from 'express';
import { check } from 'express-validator';
import { postCategories, getAllCategories, getCategoryById } from '../controllers/categories';

// Instance of router
const router = Router();

// Create a new Category
router.post('/', [
    // check('identification','The identification field is required.').not().isEmpty(),
], postCategories);

// Get all Categories
router.get('/', getAllCategories);

// Get a Category
router.get('/:id', [

], getCategoryById);

export default router;