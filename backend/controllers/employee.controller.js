import mongoose from "mongoose";
import Employee from "../models/employee.model.js";

export const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || "";

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const skip = (page - 1) * limit;

    const [employees, totalEmployees] = await Promise.all([
      Employee.find(query).skip(skip).limit(limit),
      Employee.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      success: true,
      data: employees,
      pagination: {
        totalEmployees,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.log("error in fetching employees:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Employee Id" });
  }

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.log("error in fetching employee:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createEmployee = async (req, res) => {
  const employee = req.body;

  if (!employee.name || !employee.role || !employee.contact || !employee.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide name, role, contact and image" });
  }

  const newEmployee = new Employee(employee);

  try {
    await newEmployee.save();
    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    console.error("Error in Create employee:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Employee Id" });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: updatedEmployee });
  } catch (error) {
    console.log("error in updating employee:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Employee Id" });
  }

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Employee deleted" });
  } catch (error) {
    console.log("error in deleting employee:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
