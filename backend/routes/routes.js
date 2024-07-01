const express = require("express")
const Task = require("../models/models")
const router = express.Router()

/*router.get('/' , async(req,res) => {
   const task = new Task({
    todo : 'Do Practicals',
    isComplete : false
   })
  try{
    const savedData = await Task.save()
    console.log('Saved data: ',savedData)
    res.status(200).json(savedData)
  }
catch(err){
    console.log('Error saving data: ',err)
    res.status(500).send(err)
  }

})
    */

router.get("/", async (req, res) => {
  try {
    const items = await Task.find({})
    res.status(200).json(items)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedData = await task.save();
    console.log("Saved data: ", savedData);
    res.status(200).json(savedData)
  } catch (err) {
    console.log("Error saving data: ", err);
    res.status(500).send(err)
  }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedTask)
  } catch (error) {
    console.log(err)
  }
})

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json(deletedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
});

module.exports = router
