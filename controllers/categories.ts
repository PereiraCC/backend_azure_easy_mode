import { Request, Response } from 'express';

import db from '../db/config';

// Reference to collection of users in firebase
const categoriesRef = db.collection('categories');

export const postCategories = (req : Request, res: Response) => {

    const {id , name  } : {id : string, name : string } = req.body;

    try {
        
        res.status(200).json({
            msg: 'Create a category',
            id, name
        });

    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create a category'
        });
    }

}

export const getAllCategories = (req : Request, res: Response) => {

    try {
        
        res.status(200).json({
            msg: 'Get all categories'
        });

    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: Get all categories'
        });
    }

}

export const getCategoryById = (req : Request, res: Response) => {

    const { id } = req.params;

    try {
        
        res.status(200).json({
            msg: 'Get a category by Id',
            id
        });

    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: Get a category by Id'
        });
    }

}