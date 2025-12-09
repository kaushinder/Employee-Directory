import express from "express";

import { createEmployee, deleteEmployee, getEmployees, updateEmployee, getEmployeeById } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);


export default router;
