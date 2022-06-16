'use strict';
const AWS = require('aws-sdk');
// Configure AWS Access - Make sure your IAM role has full SNS Access
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, /* Insert your IAM AWS Access Key Id */
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, /* Insert your IAM AWS Secret Key */
});
const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

module.exports.publishMessage = async (event) => {
  // Note the request body is received as a serialized string under event.body
  const params = {
    Message: event.body, /* required */
    TopicArn: 'TOPIC_ARN', /* Insert your SNS Topic ARN */
  };

  // Create promise and SNS service object
  await sns.publish(params).promise();

  return {
    statusCode: 200,
    body: 'SCC API Gateway accepted payload and published to SNS Topic successfully!',
  };
};
