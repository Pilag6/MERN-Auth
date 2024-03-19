import Task from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id,
        }).populate("user");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id).populate("user");
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({ title, description, date, user: req.user.id});
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, date },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
