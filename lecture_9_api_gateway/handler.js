'use strict';

module.exports.hello = async (event) => {
  console.log('event :>> ', event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'SCC API Gateway deployed and successful!',
        input: event,
      }),
  };
};
