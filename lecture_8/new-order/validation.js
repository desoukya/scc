const Joi = require('@hapi/joi');

module.exports = {
  /**
   * New order message validation schema
   */
  newOrderMessage: (event, category) => {
    const schema = Joi.object()
      .keys({
        header: Joi.object()
          .keys({
            version: Joi.string().required(),
            event: Joi.object()
              .keys({
                category: Joi.string().valid('online-order').required(),
                name: Joi.string().valid('shopify', 'BigCommerce').required(),
                type: Joi.string().required(),
                version: Joi.string().required(),
                origin: Joi.string().required(),
                timestamp: Joi.string().required(),
                env: Joi.string().required(),
              })
              .required(),
          })
          .required()
          .unknown(false),
        body: Joi.object()
          .keys({
            actionCode: Joi.string().valid('CREATED').required(),
            webOrderId: Joi.string().required(),
            productId: Joi.string().required(),
          })
          .unknown(false)
      })
      .unknown(false);
    return schema.validate(event).error;
  }
};
