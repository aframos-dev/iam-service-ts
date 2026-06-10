import * as Joi from 'joi'

export const envValidation = Joi.object({
  PORT: Joi.number().port().required(),
})
