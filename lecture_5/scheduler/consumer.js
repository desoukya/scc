import AWS from 'aws-sdk';

// Configure AWS Access
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

/*
 * Scheduler consumes message from SQS queue every 10 seconds
 */
const init = async () => {

  // Reload every 10 seconds
  setTimeout(() => {
    init();
  }, 10000);
};

export default {
  start: () => init(),
};
