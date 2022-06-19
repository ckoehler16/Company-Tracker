// Import the node packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

require('dotenv').config();

// Connect to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'company_db'
});

// Start mysql server and connect to database
connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database');
    inputPrompts();
});

// Prompt the user for input
const inputPrompts = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menuChoices',
            message: 'What would you like to do?',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit']
        }
    ])
        .then(answers => {
            if (answers.menuChoices === 'View all departments') {
                viewDepartments();
            }
            if (answers.menuChoices === 'View all roles') {
                viewRoles();
            }
            if (answers.menuChoices === 'View all employees') {
                viewEmployees();
            }
            if (answers.menuChoices === 'Add a department') {
                addDepartment();
            }
            if (answers.menuChoices === 'Add a role') {
                addRole();
            }
            if (answers.menuChoices === 'Add an employee') {
                addEmployee();
            }
            if (answers.menuChoices === 'Update an employee role') {
                updateEmployeeRole();
            }
            if (answers.menuChoices === 'Exit') {
                connection.end();
            }
        });
};

// Function to view all departments
const viewDepartments = () => {
    const sql = `SELECT department.id AS department_id, department.name AS department_name FROM department`;
    connection.query(sql, (err, sql) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(sql);
        inputPrompts();
    });
};

// Function to view all roles
const viewRoles = () => {
    const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id`;
    connection.query(sql, (err, sql) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(sql);
        inputPrompts();
    });
};

// Function to view all employees
const viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    connection.query(sql, (err, sql) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(sql);
        inputPrompts();
    });
};

// Function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department you want to add?',
            validate: departmentName => {
                if (departmentName) {
                    return true;
                } else {
                    console.log('Please enter a department name');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            connection.query(sql, answer.departmentName, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`${answer.departmentName} department added`);
                viewDepartments();
            });
        });
};

// Function to add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the job title of the role you want to add?',
            validate: roleTitle => {
                if (roleTitle) {
                    return true;
                }
                else {
                    console.log('Please enter a job title for the new role.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role you want to add?',
            validate: roleSalary => {
                if (roleSalary) {
                    return true;
                }
                else {
                    console.log('Please enter a salary for the new role.');
                    return false;
                }
            }
        }
    ])
        .then(answers => {
            const parameters = [answers.roleTitle, answers.roleSalary];
            const roleVar = `SELECT name, id FROM department`;
            connection.query(roleVar, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const departmentChoices = data.map(({ name, id }) => ({ name, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departmentChoices',
                        message: 'What department is this role in?',
                        choices: departmentChoices
                    }
                ])
                    .then(departmentChoicesChoice => {
                        const departmentChoices = departmentChoicesChoice.departmentChoices;
                        parameters.push(departmentChoices);
                        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                        connection.query(sql, parameters, (err, res) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log(`${answers.roleTitle} role added`);
                            viewRoles();
                        });
                    });
            });
        });
};

// Function to add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee you want to add?',
            validate: firstName => {
                if (firstName) {
                    return true;
                }
                else {
                    console.log('Please enter a first name for the new employee.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee you want to add?',
            validate: lastName => {
                if (lastName) {
                    return true;
                }
                else {
                    console.log('Please enter a last name for the new employee.');
                    return false;
                }
            }
        }
    ])
        // Function to add the name of the employee to the array
        .then(answers => {
            const parameters = [answers.firstName, answers.lastName];

            // Take the role titles and use them as choices for the user to select
            const roleVar = `SELECT roles.id, roles.title FROM roles`;
            connection.query(roleVar, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const roleChoices = data.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleChoices',
                        message: 'What role is this employee in?',
                        choices: roleChoices
                    }
                ])
                    // Function to add the role to the array
                    .then(roleChoicesChoice => {
                        const job = roleChoicesChoice.roleChoices;
                        parameters.push(job);

                        // Take the employees in manager positions (employees who's manager_id is NULL) and use them as choices for the user to select
                        const managerSql = `SELECT * FROM employee WHERE manager_id IS NULL`;
                        connection.query(managerSql, (err, data) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            const managerChoices = data.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'managerChoices',
                                    message: 'Who is the manager of this employee?',
                                    choices: managerChoices
                                }
                            ])
                                // Function to add the manager to the array
                                .then(managerChoicesChoice => {
                                    const manager = managerChoicesChoice.managerChoices;
                                    parameters.push(manager);

                                    // Add the new employee to the database
                                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                                    connection.query(sql, parameters, (err, res) => {
                                        if (err) {
                                            console.log(err);
                                            return;
                                        }
                                        console.log(`${answers.firstName} ${answers.lastName} added`);
                                        viewEmployees();
                                    });
                                });
                        });
                    });
            });
        });
};

// Function to update an employee's role
const updateEmployeeRole = () => {

    // Take the employees and use them as choices for the user to select
    const employeeSql = `SELECT * FROM employee`;
    connection.query(employeeSql, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const employees = data.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to update?',
                choices: employees
            }
        ])
            // Function to add the employee to the array
            .then(employeesChoice => {
                const employee = employeesChoice.name;
                const parameters = [];
                parameters.push(employee);

                // Take the role titles and use them as choices for the user to select
                const roleSql = `SELECT * FROM roles`;
                connection.query(roleSql, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    const newRole = data.map(({ id, title }) => ({ name: title, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the new role of this employee?',
                            choices: newRole
                        }
                    ])
                        // Function to add the role to the array
                        .then(newRoleChoice => {
                            const role = newRoleChoice.role;
                            parameters.push(role);
                            parameters.reverse();

                            // Update the employee's role in the database
                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                            connection.query(sql, parameters, (err, res) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                console.log(`${employee}'s role updated`);
                                viewEmployees();
                            });
                        });
                });
            });
    });
};






    




