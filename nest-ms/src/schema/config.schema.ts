import * as Joi from 'joi';

export default Joi.object({
  APP_PORT: Joi.number().required().messages({
    'number.base': 'APP_PORT must be a number',
    'any.required': 'APP_PORT is required',
  }),
  APP_HOST: Joi.string().required().messages({
    'string.base': 'APP_HOST must be a string',
    'any.required': 'APP_HOST is required',
  }),
});
