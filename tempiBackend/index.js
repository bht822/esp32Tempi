const express = require('express')
const app = express();
const AWS = require('aws-sdk');



//db client 
AWS.config.update({ region: 'us-east-2'});
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'esp32weatherBrad'
const params = {
    TableName: tableName
}


/**
 * Single end point to get the device data stored in the dynamo_db to view the logged data
 */

app.get('/', (req, res) => {
    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            data.Items.forEach(el=>{
                items.push(el[' device_data'])
            })
            res.contentType = 'application/json';
            res.send(items);
        }
    })
})

/**
 * Serverport to listen on
 */
app.listen('8080', () => {
    console.log('Server Started')

})