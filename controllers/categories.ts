import { Request, Response } from 'express';

import db from '../db/config';
import { returnDocsFirebase } from '../helpers/returnDocsFirebase';
import Category  from '../models/category';

// Reference to collection of users in firebase
const categoriesRef = db.collection('categories');

export const postCategories = async (req : Request, res: Response) => {

    const {id , name  } : {id : string, name : string } = req.body;

    try {

        const category : Category = new Category(id, name);

        const data = category.fromJson();

        const doc = await categoriesRef.add( data );
        
        res.status(200).json({
            ok: true,
            uid: doc.id,
            data
        });

    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create a category'
        });
    }

}

export const getAllCategories = async (req : Request, res: Response) => {

    const {limit = 10, from = 1} = req.query;

    try {

        // Get all data to the limit
        const data = await categoriesRef
            .orderBy("id")
            .limit(limit as number).get();

        // Verification if docs
        if(from as number > data.docs.length || data.docs.length == 0) {
            return res.status(200).json({
                ok: true,
                total : 0,
                documents: []
            });
        }

        // Get data with filters
        const resp = await categoriesRef
            .orderBy('id')
            .limit(limit as number)
            .startAt(data.docs[from as number - 1])
            .where('status', '==', true).get();

        // Send data
        return res.status(200).json({
            ok: true,
            total : resp.docs.length,
            documents : returnDocsFirebase(resp)
        });

    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: Get all categories'
        });
    }

}

export const getCategoryById = async (req : Request, res: Response) => {

    const { id } = req.params;

    try {
        
        // Get all categories with status true and id equal
        const resp = await categoriesRef.where('status', '==', true)
                                        .where('id','==', id).get();

        // Verification if there are documents
        if( resp.docs.length == 0 ){
            return res.status(404).json({
                msg: 'Category with that ID not found in the database.'
            });
        }

        // Send data
        return res.status(200).json({
            ok: true,
            documents : returnDocsFirebase(resp)
        });


    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: Get a category by Id'
        });
    }

}