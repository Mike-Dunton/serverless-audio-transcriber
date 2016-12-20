# Audio Transcriber

## Use Cases

- Create Transcriptions of audio files(phone calls) stored in s3 buckets. Using [IBM Watson](https://www.ibm.com/cloud-computing/bluemix/watson)

## serverless yaml breakdown
https://aws.amazon.com/blogs/security/writing-iam-policies-how-to-grant-access-to-an-amazon-s3-bucket/

## Invoke the function locally

```bash
serverless invoke local --function transcribe
```

Which should result in:

```bash
Serverless: Your function ran successfully.

{
    "statusCode": 200,
    "body": "{\"message\":\"A Transcription\"}"
}
```

## Deploy

In order to deploy the you endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
...........................
Serverless: Stack update finished…

Service Information
service: serverless-simple-http-endpoint
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://2e16njizla.execute-api.us-east-1.amazonaws.com/dev/request
functions:
  serverless-simple-http-endpoint-dev-currentTime: arn:aws:lambda:us-east-1:488110005556:function:serverless-simple-http-endpoint-dev-currentTime
```

## Usage

You can now invoke the Lambda directly and even see the resulting log via

```bash
serverless invoke --function endpoint --log
```

or as send an HTTP request directly to the endpoint using a tool like curl

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/request --data '{"key":"s3Key",}'
```

## Scaling

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).
