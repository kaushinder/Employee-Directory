import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  employees: [],
  setEmployees: (employees) => set({ employees }),

  createEmployee: async (newEmployee) => {
    const { name, role, contact, image } = newEmployee;

    if (!name || !role || !contact || !image) {
      return { success: false, message: "Please fill in all fields." };
    }

    const res = await fetch("/api/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message || "Failed to create employee" };
    }

    set((state) => ({ employees: [...state.employees, data.data] }));
    return { success: true, message: "Employee created successfully" };
  },

    fetchEmployees: async (page = 1, search = "") => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", 6);  

    if (search) params.set("search", search);

    const res = await fetch(`/api/employee?${params.toString()}`);
    const data = await res.json();

    if (!data.success) {
      console.error("Failed to fetch employees:", data.message);
      return;
    }

    set({
      employees: data.data,
      totalPages: data.pagination.totalPages,
      currentPage: data.pagination.currentPage,
      totalEmployees: data.pagination.totalEmployees,
    });
  },


  deleteEmployee: async (pid) => {
    const res = await fetch(`/api/employee/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      employees: state.employees.filter((employee) => employee._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateEmployee: async (pid, updatedEmployee) => {
    const res = await fetch(`/api/employee/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmployee),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      employees: state.employees.map((employee) =>
        employee._id === pid ? data.data : employee
      ),
    }));

    return { success: true, message: "Employee updated successfully" };
  },
}));
