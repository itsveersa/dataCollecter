/*
 * Reading CSV file and storing all related info to database
 * related fields [first_name, last_name, email, mobile]
 * @author itsveersa
 */


const fs = require('fs');
const { parse } = require('csv-parse');

const columns = ['resumeid'];

fs.createReadStream("sample.csv")
    .pipe(parse({ delimiter: ",", from_line: "1" }))
    .on("data", (row) => {
        for (let i = 0; i < Object.keys(row).length; i++) {
            if (columns.indexOf(row[i]) > -1) { // read column 
                console.log(row);
            } 
        }
        console.log(row);
    })



