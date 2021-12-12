import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import Unit from '../models/unit';
import { firestore } from '../db/config';
import { getModule } from './modules';
import { uploadFile } from '../helpers/uploadFile';
import { returnDocsFirebase } from '../helpers/returnDocsFirebase';

// Reference to collection of users in firebase
const unitsRef = firestore.collection('units');

export const postUnit = async (req : Request, res : Response ) => {
    
    const { id, id_module, title } : {id : string, id_module : string, title : string } = req.body;

    try {
        
        const unit : Unit = new Unit(id, id_module, title);

        const dataJson = unit.fromJson();

        const doc = await unitsRef.add( dataJson );

        return res.status(201).json({
            ok: true,
            uid: doc.id,
            unit: dataJson
        });

    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create an unit'
        });
    }
}

export const uploadDocument = async (req : Request, res : Response) => {
    
    const { id_module, id } = req.params;

    try {

        const { tempFilePath, name} = req.files?.file as UploadedFile;

        const moduleRef = await getModule(id_module);

        const urlFile : string = await uploadFile( tempFilePath, name, moduleRef?.data().name );

        let docRef = await getUnit(id, id_module);

        await unitsRef.doc(docRef?.id).update({
            document : urlFile
        });

        docRef = await getUnit(id, id_module);

        res.status(200).json({
            ok: true,
            uid: docRef?.id,
            unit: docRef?.data()
        });

    } catch (err) {
        console.log(`Error: ${err}`);
        return res.status(500).json({
            msg: 'Error: create an unit'
        });
    }

}

export const getAllUnits = async (req: Request, res: Response) => {

    const { id_module } = req.params;
    const {limit = 10, from = 1} = req.query;

    try {
        
        // Get all data to the limit
        const data = await unitsRef
            .where('id_module', '==', id_module)
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
        const resp = await unitsRef
            .orderBy('id')
            .limit(limit as number)
            .startAt(data.docs[from as number - 1])
            .where('id_module', '==', id_module)
            .where('status', '==', true).get();

        // Send data
        return res.status(200).json({
            ok: true,
            total : resp.docs.length,
            documents : returnDocsFirebase(resp)
        });

    } catch (err) {
        console.log(`Error ${err}`);
        return res.status(500).json({
            msg: 'Error: get all units'
        });
    }
}

export const getAnUnit = async (req: Request, res: Response) => {

    const { id, id_module } = req.params;

    try {
        
        // Get all categories with status true and id equal
        const resp = await unitsRef.where('status', '==', true)
                                     .where('id','==', id)
                                     .where('id_module','==', id_module).get();

        // Verification if there are documents
        if( resp.empty ){
            return res.status(404).json({
                msg: 'Unit with that ID not found in the database.'
            });
        }

        // Send data
        return res.status(200).json({
            ok: true,
            documents : returnDocsFirebase(resp)
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error: get an unit'
        });
    }

}

const getUnit = async (id : string, id_module : string) => {

    // Obtain all agents with status true / false (param) and id equal
    const resp = await unitsRef.where('status', '==', true)
                            .where('id','==', id)
                            .where('id_module', '==', id_module).get();

    // From the list obtain documento with id equal
    const docRef = resp.docs.find((doc) => {
        if(doc.data().id === id){
            return doc;
        }
    });

    return docRef;

}