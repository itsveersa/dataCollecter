const express = require('express');
const multer  = require('multer');
const os = require('os');
const sqlite3 = require('sqlite3').verbose();
const { runScript } = require('./script');

var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

const app = express();

const upload = multer({ dest: os.tmpdir() });

app.use(urlencodedParser);
const db = new sqlite3.Database(':memory:');



app.use(express.static('public'))

app.post('/upload-candidate', upload.single('file'), (req, res) => {
    const file = req.file;
    const script_data = runScript(file);
    console.log("result", script_data);
    db.serialize(() => {
        db.run("CREATE TABLE lorem (info TEXT)");

        const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
            console.log(row.id + ": " + row.info);
        });
    });

    db.close();
    res.send({
        message: 'candidate details saved successfuly!'
    })
});

app.listen(3000, () => {
    console.log('server started at http://localhost:3000');
})