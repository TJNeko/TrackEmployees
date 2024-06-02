const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, getDepartments, } = require('./databaseFunctions');

async function startApp() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all roles':
            await viewAllRoles();
            break;
        case 'View all employees':
            await viewAllEmployees();
            break;

        case 'Add a department':
            const { departmentName } = await inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'Enter the department name:'
            });
            await addDepartment(departmentName);
            break;

        case 'Add a role':
            const departments = await getDepartments();
            const departmentChoices = departments.map(department => ({ name: department.name, value: department.id }));
            const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the role title:'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the role salary:'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department for this role:',
                choices: departmentChoices
            }
        ]);
            await addRole(roleTitle, parseFloat(roleSalary), departmentId);
            break;

        case 'Add an employee':
            const { firstName, lastName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the employee\'s first name:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the employee\'s last name:'
                }
            ]);
            await addEmployee(firstName, lastName);
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            return;
    }

    console.log('');
    await startApp();
}

startApp();