import Joi from "joi";

const userRegistrValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    password_again: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    img_url: Joi.string().required(),
  });

  return schema.validate(data);
};

const userLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validate(data);
};

const userPostValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    token: Joi.string().required(),
    img_url: Joi.string().required(),
  });

  return schema.validate(data);
};

export { userRegistrValidation, userLoginValidation, userPostValidation };
