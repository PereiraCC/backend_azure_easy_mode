    import { Request, Response } from 'express';
    import { UploadedFile } from 'express-fileupload';

    import { firestore } from '../db/config';
    import { returnDocsFirebase } from '../helpers/returnDocsFirebase';
    import { uploadFile } from '../helpers/uploadFile';
    import Unit from '../models/unit';

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

            const urlFile : string = await uploadFile( tempFilePath, name );

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

    export const getUnit = async (id : string, id_module : string) => {

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