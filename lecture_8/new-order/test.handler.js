const processOrder = require('./handler').processOrder;
const message = require('./samples/new-order.json');

const event = {
  Records: [
    {
      messageId: 'e725323d-74da-47d8-84f0-07e29026020a',
      receiptHandle: 'AQEBJv9BGwHBGLgVTzD/Bhdw87bsCl4cSQyxSbg+axSP9ZijvA+lgV5vZimWE7jHuoyO7m4Qf1vz6dtvx/1rkZ1uqm/zoaSbCAHKKbGfvG4QQsiVrShToGCoYFmGV3Rythb7ev9vxssj4IXOZ+eojcv22zKd4nhGKUniyKIL1GHTlTWXcaRs9vqdReQG4wyWwJCBC8zXtelWikHFAcmph0PnaXZi5jk+W73fwX+8pUoW0KKV9oFehp+yrzQtNjnvVptJOAHrFWwyhmKOMN+R97lpF1YyDyg7swsx2ufCBuTz21EFyowIG5qREdRTLh81kbpkmEBkiUxL7t/0gtF0poOXQVMSxspkwFzNEcS9wBPDXBgxc08vuINr8NZDbt/Hn1WH',
      body: '{\n' +
        '  "Type" : "Notification",\n' +
        '  "MessageId" : "fec360fe-6604-5263-b7c6-3a0516a6a9c7",\n' +
        '  "TopicArn" : "arn:aws:sns:us-east-1:248678306276:scc-lecture-8-new-order",\n' +
        '  "Message" : "{ header: { version: \'1.0.0\', event: { version: \'1.1.0\', category: \'online-order\', name: \'shopify\', type: \'data\', origin: \'facebook\', timestamp: \'2019-12-04T21:36:40.040Z\', env: \'palm\' } }, body: { actionCode: \'CREATED\', webOrderId: \'24593\', productId: \'01\' } }",\n' +
        '  "Timestamp" : "2022-05-15T21:19:30.237Z",\n' +
        '  "SignatureVersion" : "1",\n' +
        '  "Signature" : "Eke7KqngvrnZY5XFqCw+yOeViCfKxSisrJ6znBcSHTjL6RVlHppNLcpXzt5bB6x2ILtd2BOla/o4+tglDKaIMfq28Dthv49AZ3ZEjdtUa1coJ8IZtkO1yRrZ45eKPPuMh0kB2tv5MqzCAFTMSTscpVarrxVVNeAtpHcOrf6iLJQJhXBEStHsHHF4ZNJfNgL7BJBh8Fa8sgCEpBuQLmHpOX6e4cTS3gNECCzH9lGQ8DsLLV+SeQNZcHTOV0imIa3GWiGuybV+q1IYviaaYTxz65SlmHgUQfanx0LsXGgtzT72ZuSQbKlGzVTPBzYHkbBjAojCFT2wFdAVmP/khn5E6A==",\n' +
        '  "SigningCertURL" : "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-7ff5318490ec183fbaddaa2a969abfda.pem",\n' +
        '  "UnsubscribeURL" : "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:248678306276:scc-lecture-8-new-order:8c299ba5-51aa-4916-be2a-5536863dfd7c"\n' +
        '}',
      attributes: [Object],
      messageAttributes: {},
      md5OfBody: 'cc06a1458b574c8c86c2e2c4a920b151',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:us-east-1:248678306276:scc_lecture_8',
      awsRegion: 'us-east-1'
    }
  ]
};

(async () => console.log(
  await processOrder(event)
))();

// return new Promise(resolve => { setTimeout(() => resolve(console.log('[LMS TOS][assessment-order][delete]')), 3000) });