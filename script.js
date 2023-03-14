/*
 * Reading CSV file and storing all related info to database
 * related fields [first_name, last_name, email, mobile]
 * @author itsveersa
 */



const fs = require('fs');
const { parse } = require('csv-parse');

const columns = ['CTC'];

let key;








const runScript = (data) => {
    fs.createReadStream(data.path)
        .pipe(parse({ delimiter: ",", from_line: "1" }))
        .on("data", function (row) {
            for (let i = 0; i < Object.keys(row).length; i++) {
                if (columns.indexOf(row[i]) > -1) {
                    key = i;
                }
            }
            console.log(row[key]);
        });
    return [];
}

module.exports = {
    runScript
}
