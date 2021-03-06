import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {

    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..',  'uploads'),

        filename(request, file, callback) {
            // gerar um hash para garantir que o nome do arquivo seja único
            const hash = crypto.randomBytes(6).toString('hex');

            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    }),
}