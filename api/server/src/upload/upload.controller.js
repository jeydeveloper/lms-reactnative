const path     = require("path");
const multer = require('multer');
const Unzipper = require("decompress-zip");

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, '/app/server/src/public/upload_content')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})

const upload = multer({ storage: storage }).single('file');

//Create new Upload
exports.create = (req, res, next) => {
	upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        if (req.file) {
            let filepath = path.join(req.file.destination, req.file.filename);
            let unzipper = new Unzipper(filepath);
            unzipper.on("extract", function () {
                console.log("Finished extracting");
            });
            unzipper.extract({ path: "/app/server/src/public/upload_content"});
        }
        return res.status(200).send(req.file)
    })
};