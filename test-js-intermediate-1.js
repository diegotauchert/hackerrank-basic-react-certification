'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
      inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
      return inputString[currentLine++];
}

// TEST METHODS - STARTS HERE
async function getNumTransactions(username) {
    // write your code here
    const url = 'https://jsonmock.hackerrank.com/api/article_users?username='+username;
    const urlTransaction = 'https://jsonmock.hackerrank.com/api/transactions?&userId=';

    async function fetch(url, urlTransaction){
      return new Promise ((resolve) => {
        https.get(url, res => {
        let data = [];
      
        res.on('data', chunk => {
          data.push(chunk);
        });
      
        res.on('end', () => {
          const users = JSON.parse(Buffer.concat(data).toString()).data;
          if(users.length === 0) {
            resolve('Username Not Found');
          }else{
            for(let user of users) {
              https.get(urlTransaction+user.id, res => {
                let dataTransactions = [];
              
                res.on('data', chunk => {
                  dataTransactions.push(chunk);
                });
              
                res.on('end', () => {
                  const transactions = JSON.parse(Buffer.concat(dataTransactions).toString());
                  resolve(transactions.total);
                });
              })
            }
          }
        });
      })
    })
    }

    const result = await fetch(url, urlTransaction);
  console.log(result);
    
    return result;
    
    // API endpoint: https://jsonmock.hackerrank.com/api/article_users?username=<username>
    // API endpoint: https://jsonmock.hackerrank.com/api/transactions?&userId=<userId>
}

// TEST METHODS - ENDS HERE

//getNumTransactions('epaga');

async function main() {
  // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  const username = `WisNorCan`;
  const result = await getNumTransactions(username);
  console.log(result);
  // ws.write(result.toString());
}

main()