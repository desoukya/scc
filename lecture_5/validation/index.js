const Joi = require('@hapi/joi');
const { partial } = require('lodash');

/**
 * Hyperloop TOS validation schema
 */
const tosBody = () =>
  Joi.object()
    .keys({
      webOrderId: Joi.string().required(),
      aiCd: Joi.string().required(),
      programId: Joi.string().required(),
      orgId: Joi.string().required(),
      asmtEventId: Joi.string().required(),
      asmtAdminCd: Joi.string().required(),
      adminDate: Joi.string().required(),
      testStartDate: Joi.string().required(),
      digitalOrder: Joi.string().required(),
      preAdmin: Joi.string().required()
    })
    .unknown(true);

/**
 * Hyperloop DEX validation schema
 */
const dexBody = () =>
  Joi.object()
    .keys({
      aiCode: Joi.string().required(),
      orgId: Joi.string().required(),
      assessmentTitle: Joi.string().required(),
      primaryAssessmentEventId: Joi.string().required(),
      contractStateCd: Joi.string().required(),
      primaryTestDate: Joi.string().required(),
      asmtId: Joi.string().required(),
      districtCd: Joi.string().required(),
      districtName: Joi.string().required(),
      orgName: Joi.string().required(),
      satEssayInd: Joi.string().required(),
      schoolType: Joi.string().required(),
      participationInd: Joi.string().required(),
      primaryTestMode: Joi.string().required(),
      primaryDeliveryPlatformCd: Joi.string().required(),
      contractGradeLevel: Joi.string().required(),
      Address: Joi.array(),
      contact: Joi.array()
    })
    .unknown(true);

/**
 * Hyperloop TOS CONTACT validation schema
 */
const tosContactBody = () =>
  Joi.object()
    .keys({
      aiCd: Joi.string().required(),
      actionCd: Joi.string().required(),
      aiName: Joi.string().required(),
      aiInstTypeCd: Joi.string().required(),
      aiInstTypeCdDesc: Joi.string().required(),
      psatParticipationStatusCd: Joi.string().required(),
      psatParticipationStatusCdDesc: Joi.string().required(),
      addresses: Joi.array().required(),
      contact: Joi.array().required()
    })
    .unknown(true);

module.exports = {
  /**
   * Message validation schema
   */
  hyperloopMessage: (event, category) => {
    const messageBody = {
      'order': partial(tosBody),
      'contract-management': partial(dexBody),
      'customer-management': partial(tosContactBody)
    }[category];

    const schema = Joi.object()
      .keys({
        header: Joi.object()
          .keys({
            version: Joi.string().required(),
            event: Joi.object()
              .keys({
                category: Joi.string().required(),
                name: Joi.string().required(),
                type: Joi.string().required(),
                version: Joi.string().required(),
                origin: Joi.string().required(),
                timestamp: Joi.string().required(),
                syncEndPoint: Joi.string()
              })
              .required(),
            hyperloop: Joi.object()
              .keys({
                // inserted by hyperloop smart routers (not from the publishers)
                eventId: Joi.string()
              })
              .unknown(true)
          })
          .required()
          .unknown(true),
        body: messageBody // event specific data
      })
      .unknown(true);
    return schema.validate(event).error;
  }
};