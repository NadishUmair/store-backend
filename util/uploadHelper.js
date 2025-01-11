const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadDirectory = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Multer storage configuration to save the file with a unique name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Uploading file to: ", uploadDirectory); // Log destination directory
    cb(null, uploadDirectory); // Save file to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    console.log("File being saved with name: ", Date.now() + path.extname(file.originalname)); // Log filename
    cb(null, Date.now() + path.extname(file.originalname)); // Make the filename unique
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    console.log("File received: ", file.originalname); // Log the received file name
    const allowedTypes = /jpeg|jpg|png|gif/;

    // Check file extension and MIME type
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    console.log("File extension: ", extname); // Log file extension
    console.log("File MIME type: ", mimetype); // Log MIME type

    if (allowedTypes.test(extname) && allowedTypes.test(mimetype)) {
      return cb(null, true); // If the file is valid, allow upload
    } else {
      console.log("Invalid file type! Only image files are allowed."); // Log error when file is invalid
      cb(new Error('Only image files are allowed!'), false); // Reject invalid files
    }
  },
}) 
module.exports = upload;
