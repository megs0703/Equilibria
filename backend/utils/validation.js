const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required(),
  age: Joi.number().min(13).max(120).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  height: Joi.number().min(100).max(250).required(),
  weight: Joi.number().min(30).max(300).required(),
  fitnessGoals: Joi.array().items(Joi.string()),
  injuries: Joi.array().items(Joi.string())
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const workoutPlanSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('gym', 'home').required(),
  goal: Joi.string().valid('weight_loss', 'weight_gain', 'muscle_gain', 'endurance').required(),
  exercises: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    sets: Joi.number().min(1).required(),
    reps: Joi.string().required(),
    weight: Joi.number().min(0),
    duration: Joi.number().min(0),
    restTime: Joi.number().min(0)
  }))
});

const mealSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()),
  quantity: Joi.number().min(0).required(),
  calories: Joi.number().min(0).required(),
  protein: Joi.number().min(0),
  carbs: Joi.number().min(0),
  fats: Joi.number().min(0),
  isJunkFood: Joi.boolean()
});

module.exports = {
  registerSchema,
  loginSchema,
  workoutPlanSchema,
  mealSchema
};