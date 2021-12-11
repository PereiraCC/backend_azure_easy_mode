import { Router } from 'express';
import { check } from 'express-validator';

import { postUnit, uploadDocument } from '../controllers/units';

const router = Router();

router.post('/', [

], postUnit );

router.put('/:id_module/:id', [

], uploadDocument );

router.get('/:id_module', [

], () => {});

router.get('/:id_module/:id', [

], () => {});

export default router;