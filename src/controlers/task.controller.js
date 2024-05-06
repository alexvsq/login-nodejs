import Task from "../models/task.model.js"

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.json(task);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}
export const createTask = async (req, res) => {
    const { title, description, date } = req.body
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    })

    const taskSaved = await newTask.save()
    res.json(taskSaved)

}
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user : req.user.id }).populate("user");
        res.json(tasks);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}
export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
}
export const updateTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const taskUpdated = await Task.findOneAndUpdate(
          { _id: req.params.id },
          { title, description, date },
          { new: true }
        );
        return res.json(taskUpdated);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

/* 
 try {
    const { title, description, date } = req.body;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    );
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
*/