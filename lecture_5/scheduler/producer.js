import AWS from 'aws-sdk';
import orders from '../__mock__/orders.js';
import shipping from '../__mock__/shipping.js'
import inventory from '../__mock__/inventory.js'

// Configure AWS Access
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

/*
 * Scheduler sends a message to SQS queue every 60 seconds
 */
const init = async () => {
  // generate index from 0-5
  const idx = Math.floor(Math.random() * 5) + 1;
  // Get one message from each category to queue
  const messages = [orders[idx], shipping[idx], inventory[idx]];

  const params = messages.map(message =>
    sqs.sendMessage({
      MessageBody: JSON.stringify(message),
      QueueUrl: process.env.SQS_URL
    }).promise()
  );

  await Promise.all(params);

  // Reload every 60 seconds
  setTimeout(() => {
    init();
  }, 600000);
};

/*
 * Scheduler sends batch messages to SQS queue every 60 seconds
 */
const initBatch = async () => {
  // generate index from 0-5
  const idx = Math.floor(Math.random() * 5) + 1;
  // Get one message from each category to queue
  const messages = [orders[idx], shipping[idx], inventory[idx]];

  const params = {
    Entries: messages.map((message, idx) => ({
      Id: idx.toString(),
      MessageBody: JSON.stringify(message),
    })),
    QueueUrl: process.env.SQS_URL
  };

  await sqs.sendMessageBatch(params).promise();

  // Reload every 60 seconds
  setTimeout(() => {
    initBatch();
  }, 600000);
};

export default {
  // start: () => init(),
  start: () => initBatch(),
};
