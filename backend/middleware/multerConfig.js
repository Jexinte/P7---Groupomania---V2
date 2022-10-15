const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg':'jpeg',
    'image/png':'png',
    'image/webp':'webp',
    'image/gif':'gif'
}

const storage = multer.diskStorage(
{
    destination : (req,file,callback) => {
        
        callback(null,'images')
    
    },
    
    filename : (req,file,callback) => {
       
        
        const extension = MIME_TYPES[file.mimetype]
        
        callback(null,  Date.now() + '.'+ extension)
       
    },

    fileFilter : (req,file,callback) => {
        if(file.mimetype === MIME_TYPES['image/gif'] || file.mimetype === MIME_TYPES['image/webp'] || file.mimetype === MIME_TYPES['image/png'] || file.mimetype === MIME_TYPES['image/jpeg']  || file.mimetype === MIME_TYPES['image/jpg'] ) {
            callback(null,true)

        }

        else{
            req.story = "sdfsdfdfsf"
            callback(null,false)
            return callback(new Error('Only folowing files...'))
        }
    }


   
})

module.exports = multer({storage:storage}).single('imageFile')