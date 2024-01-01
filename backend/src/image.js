const multer = require('multer');
const stream = require('stream');
const cloudinary = require('cloudinary');
if (!process.env.CLOUDINARY_URL) {
    console.error("You have not set your Cloudinary URL");
}

function upload(publicId, req, res, next) {
    if (!req.file) {
        next();
        return;
    }
    const uploadStream = cloudinary.uploader.upload_stream(result => {
        // capture the url and public_id and add to the request
        req.fileurl = result.url
        req.fileid = result.public_id
        next()
    }, { public_id: req.body[publicId] })


    const s = new stream.PassThrough()
    s.end(req.file.buffer)
    s.pipe(uploadStream)
    s.on('end', uploadStream.end)
    // and the end of the buffer we tell cloudinary to end the upload.
}

const uploadImage = (publicId) => (req, res, next) => {
    multer().single(publicId)(req, res, () => upload(publicId, req, res, next));
}

module.exports = uploadImage;