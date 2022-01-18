import nextConnect from 'next-connect'
import multiparty from 'multiparty'

import  formidable  from  'formidable-serverless';

function handleUpload(form, req) {
    
    return new Promise((resolve, reject) => {
        let file = null
        let fields;
        
        form.onPart = function (part) {
            form.handlePart(part);
        }
        
        form.parse(req)
        form.on('file', (_, f) => {
            file = f
        })
        
        form.on('error', reject)
        form.on('aborted', () => reject(new Error('aborted')))
        form.on('end', () => resolve(file))
    })
}

const middleware = nextConnect()

middleware.use(async (req, res, next) => {
    try {
        const  form = formidable({ multiples:  true, keepExtensions: true, }); 

        console.log('middleware', req.headers);
        const  contentType = req.headers['content-type']
    
        
        if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
            console.log('jere');
    
            
            form.parse(req, (err, fields) => {
                console.log('err', err);
                if (!err) {
                    req.body = fields; // sets the body field in the request object
                }
            })
            
            const file = await handleUpload(form, req);
            req.files = file; // sets the files field in the request object
            next(); // continues to the next middleware or to the route
    
        } else {
            console.log('else');
            next();
        }
    } catch (error) {
        console.log('Middleware error:', error);
    }
})



export default middleware