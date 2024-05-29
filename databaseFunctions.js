const { pool } = require('./database');
async function viewAllDepartments() {
  try {
    const query = 'SELECT * FROM departments';
    const { rows } = await pool.query(query);
    console.table(rows);
  } catch (error) {
    console.error('Error viewing departments:', error);
  }
}

async function viewAllRoles() {
  try {
    const query = 'SELECT * FROM roles';
    const { rows } = await pool.query(query);
    console.table(rows);
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
}

async function viewAllEmployees() {
  try {
    const query = 'SELECT * FROM employees';
    const { rows } = await pool.query(query);
    console.table(rows);
  } catch (error) {
    console.error('Error viewing employees:', error);
  }
}

async function addDepartment(departmentName) {
  try {
    const query = 'INSERT INTO departments (name) VALUES ($1) RETURNING *';
    const { rows } = await pool.query(query, [departmentName]);
    console.log('Department added successfully:', rows[0]);
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

async function addRole(title, salary, departmentId) {
  try {
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [title, salary, departmentId]);
    console.log('Role added successfully:', rows[0]);
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await pool.query(query, [firstName, lastName, roleId, managerId]);
    console.log('Employee added successfully:', rows[0]);
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

async function updateEmployeeRole(employeeId, roleId) {
  try {
    const query = 'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, [roleId, employeeId]);
    console.log('Employee role updated successfully:', rows[0]);
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
