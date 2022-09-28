const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

//@desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  //commented to get specific user goal by entering his logedin  token number
  const goals = await Goal.find();
  //const goals = await Goal.find({user:req.user.id});
  res.status(200).json(goals);
});
//@desc Set goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});
// @desc Update goal
//@route PUT /api/goals/:id
//@access Priavte
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal Not found");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc Delete goal
//@route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal Not found");
  }
await goal.remove()
  res.status(200).json({id:req.params.id});
});
module.exports = {
  getGoals,
  setGoal,
  deleteGoal,
  updateGoal,
};
