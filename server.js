const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { runScript } = require('./script');
const db = new sqlite3.Database(':memory:');

const app = express();

app.use(express.static('public'))

app.post('/upload-candidate', (req, res) => {
    const script_data = runScript(req.body);
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