import { Router } from 'express';
import { check } from 'express-validator';
import { postCategories, getAllCategories, getCategoryById } from '../controllers/categories';
import { fieldsValidation } from '../middlewares/inputs-validation';

// Instance of router
const router = Router();

// Create a new Category
router.post('/', [
    check('id','The id field is required.').not().isEmpty(),
    check('name','The name field is required.').not().isEmpty(),
    fieldsValidation
], postCategories);

// Get all Categories
router.get('/', getAllCategories);

// Get a Category
router.get('/:id', [
    check('id','The id field is required.').not().isEmpty(),
], getCategoryById);

export default router;