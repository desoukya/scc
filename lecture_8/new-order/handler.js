'use strict';
const validate = require('./validation');

/**
 * LMS Lambda handler
*/
module.exports.processOrder = event => {
  for (const { body } of (event && event.Records)) {
    console.log('body :>> ', body);
    try {
      const data = JSON.parse(body);
      // SNS events will contain "Message" field, otherwise message be in event.body
      const message = JSON.parse(data.Message || body);
      console.log('message :>> ', message);

      const { category, name } = (message && message.header && message.header.event) || {};
      
      const validationResults = validate.newOrderMessage(message, category);
      console.log('validationResults :>> ', validationResults);
      if (validationResults) {
        console.log('[processOrder Validation Error]:', JSON.stringify(validationResults));
        throw validationResults;
      }

      console.log('<<: successfully processed order :>> ');
      return {
        status: 200,
        message: 'successfully processed order',
      };

    } catch (e) {
      console.log('[processOrder Error] error:', JSON.stringify(e));
      console.log('[processOrder Error] event:', JSON.stringify(event));
      throw e;
    }
  }
};
