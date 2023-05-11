import {
  userRegistrValidation,
  userLoginValidation,
  userPostValidation,
} from "../validation/user_validation.js";
const userRegistValidation = function (req, res, next) {
  try {
    const { error } = userRegistrValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const userLogiValidation = function (req, res, next) {
  try {
    const { error } = userLoginValidation(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const userPosValidation = function (req, res, next) {
  try {
    const { error } = userPostValidation(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export { userRegistValidation, userLogiValidation, userPosValidation };
