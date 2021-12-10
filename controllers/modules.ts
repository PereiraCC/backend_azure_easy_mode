import { Request, Response } from 'express';

import db from '../db/config';
import { returnDocsFirebase } from '../helpers/returnDocsFirebase';

import Module from '../models/module';

// Reference to collection of users in firebase
const modulesRef = db.collection('modules');

export const postModule = async (req : Request, res: Response) => {

    const {id , id_category, name } : {id : string, id_category : string, name : string } = req.body;

    try {

        const mod : Module = new Module(id, id_category, name);

        const data = mod.fromJson();

        const doc = await modulesRef.add( data );
        
        res.status(201).json({
            ok: true,
            uid: doc.id,
            data
        });

    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create a module'
        });
    }

}

export const getAllModules = async (req : Request, res: Response) => {

    const { id_category } = req.params;
    const {limit = 10, from = 1} = req.query;

    try {

        // Get all data to the limit
        const data = await modulesRef
            .where('id_category', '==', id_category)
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
        const resp = await modulesRef
            .orderBy('id')
            .limit(limit as number)
            .startAt(data.docs[from as number - 1])
            .where('id_category', '==', id_category)
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

export const getModuleById = async (req : Request, res: Response) => {

    const { id, id_category } = req.params;

    try {
        
        // Get all categories with status true and id equal
        const resp = await modulesRef.where('status', '==', true)
                                     .where('id','==', id)
                                     .where('id_category','==', id_category).get();

        // Verification if there are documents
        if( resp.docs.length == 0 ){
            return res.status(404).json({
                msg: 'Module with that ID not found in the database.'
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
            msg: 'Error: Get a module by Id'
        });
    }

}