import { Router } from 'express';
import { check } from 'express-validator';

import { postUnit, uploadDocument, getAllUnits, getAnUnit } from '../controllers/units';
import { fileValidationUpload } from '../middlewares/files-validation';
import { fieldsValidation } from '../middlewares/inputs-validation';

const router = Router();

router.post('/', [
    check('id', 'The id field is required').not().isEmpty(),
    check('id_module', 'The id module field is required').not().isEmpty(),
    check('title', 'The title field is required').not().isEmpty(),
    fieldsValidation
], postUnit );

router.put('/:id_module/:id', [
    fileValidationUpload,
    check('id', 'The id field is required').not().isEmpty(),
    check('id_module', 'The id module field is required').not().isEmpty(),
    fieldsValidation
], uploadDocument );

router.get('/:id_module', [
    check('id_module', 'The id module field is required').not().isEmpty(),
    fieldsValidation
], getAllUnits );

router.get('/:id_module/:id', [
    check('id', 'The id field is required').not().isEmpty(),
    check('id_module', 'The id module field is required').not().isEmpty(),
    fieldsValidation
], getAnUnit );

export default router;