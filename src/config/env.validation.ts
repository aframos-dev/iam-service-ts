import * as Joi from 'joi'

export const envValidation = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'production').required(),
  PORT: Joi.number().port().required(),
})
