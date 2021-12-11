import fs from 'fs';
import { storageRef } from '../db/config';
global.XMLHttpRequest = require("xhr2");


export const uploadFile = async (tempPath : string, name : string) => {

    const da = fs.readFileSync(tempPath);
    const metadata = {
        contentType: 'text/plain',
    };

    const categoryRef = storageRef.child(`category/${name}`);

    try {

        await categoryRef.put(da, metadata);
        return await categoryRef.getDownloadURL();

    } catch (err) {
        console.error(err);
        return '';
    }
}