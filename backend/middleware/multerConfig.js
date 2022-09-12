
const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg':'jpeg',
    'image/png':'png'
}

const storage = multer.diskStorage(
{
    destination : (req,file,callback) => {
        
        callback(null,'images')
    },
    
    filename : (req,file,callback) => {
       
   
        const extension = MIME_TYPES[file.mimetype]
 
        callback(null,  Date.now() + '.'+ extension)
    }
})

module.exports = multer({storage}).single('image')