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
    database: process.env.DB_DATABASE
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


