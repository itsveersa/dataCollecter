/*
 * Reading CSV file and storing all related info to database
 * related fields [first_name, last_name, email, mobile]
 * @author itsveersa
 */


const fs = require('fs');
const { parse } = require('csv-parse');

const columns = ['resumeid'];

let key = [];



fs.createReadStream("sample.csv")
    .pipe(parse({ delimiter: ",", from_line: "1" }))
    .on("data",function (row) { 

        

        for (let i = 0; i < Object.keys(row).length;i++) {
           if(columns.indexOf(row[i]) > -1) {
           console.log(i)
          
             key =  i;
             

             

    
         
       
          
       
        
            }
       

        }
       
        console.log(row[key]);
        
    })
     


const runScript = (data) => {
    data = row[key]
    return [row[key]];
}

module.exports = {
    runScript
}
