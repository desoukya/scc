'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

module.exports.publishMessage = async (event) => {
  // Note the request body is received as a serialized string under event.body
  const params = {
    Message: event.body, /* required */
    TopicArn: 'TOPIC_ARN' /* Insert your SNS Topic ARN */
  };

  // Create promise and SNS service object
  await sns.publish(params).promise();

  return {
    statusCode: 200,
    body: 'SCC API Gateway accepted payload and published to SNS Topic successfully!',
  };
};
