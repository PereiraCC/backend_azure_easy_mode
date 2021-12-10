import { Router } from 'express';
import { check } from 'express-validator';

import { postModule, getAllModules, getModuleById } from '../controllers/modules';
import { fieldsValidation } from '../middlewares/inputs-validation';

// Instance of router
const router = Router();

router.post('/', [
    check('id', 'The id field is required.').not().isEmpty(),
    check('id_category', 'The id Category field is required.').not().isEmpty(),
    check('name', 'The name Category field is required.').not().isEmpty(),
    fieldsValidation
], postModule );

router.get('/:id_category', [
    check('id_category', 'The id category field is required.').not().isEmpty(),
    fieldsValidation
], getAllModules );

router.get('/:id_category/:id', [
    check('id', 'The id field is required.').not().isEmpty(),
    check('id_category', 'The id category field is required.').not().isEmpty(),
    fieldsValidation
], getModuleById );

export default router;