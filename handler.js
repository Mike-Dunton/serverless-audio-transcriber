'use strict';

const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();

module.exports.endpoint = (event, context, callback) => {
  const data = JSON.parse(event.body);
  var params = {
    Bucket: process.env.BUCKET,
    Key: data.key
  };
  console.log("params", JSON.stringify(params));
  s3.getObject(params)
  .promise()
  .then((data) => {
    const response = {
      statusCode: 200,
      body: "Got the File",
    };
    callback(null, response);  
  })
  .catch((error) => {
    console.log(error, error.stack);
    callback(error, null);
  })
};