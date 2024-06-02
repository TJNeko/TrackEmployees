const { pool } = require('./database');
const inquirer = require('inquirer');

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

async function getRoles() {
  try {
    const query = 'SELECT * FROM roles';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
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

async function getEmployees() {
  try {
    const query = 'SELECT * FROM employees';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

async function addEmployee(firstName, lastName) {
  try {
    const roles = await getRoles();
    const managers = await getEmployees();
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
    const managerChoices = managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }));
    const { roleId, managerId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the employee\'s role:',
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the employee\'s manager:',
        choices: [...managerChoices, { name: 'None', value: null }]
      }
    ]);
    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await pool.query(query, [firstName, lastName, roleId, managerId]);
    console.log('Employee added successfully:', rows[0]);
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

async function updateEmployeeRole(employeeId, roleId) {
  try {
    const employees = await getEmployees();
    const roles = await getRoles();
    const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:',
        choices: employeeChoices
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the employee\'s new role:',
        choices: roleChoices
      }
    ]);
    const query = 'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, [roleId, employeeId]);
    console.log('Employee role updated successfully:', rows[0]);
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

async function getDepartments() {
  try {
      const query = 'SELECT * FROM departments';
      const { rows } = await pool.query(query);
      return rows;
  } catch (error) {
      console.error('Error fetching departments:', error);
      return [];
  }
}

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, getDepartments, getEmployees, getRoles };
