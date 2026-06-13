import * as Joi from 'joi'

export const envValidation = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'production').required(),
  PORT: Joi.number().port().required(),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.number().integer().positive().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.number().integer().positive().required(),
})
