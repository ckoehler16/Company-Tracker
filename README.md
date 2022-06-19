# Company Tracker

![badge](https://img.shields.io/badge/License-MIT-success.svg)


## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)


## Description

As a developer I wanted to create a command-line application from scratch that would help to manage a company's employee database. The command-line application uses Node.js, Inquirer, and MySQL. With this application's prompts the user can view tables of all the company's departments, job roles, and employees. The user can also add a new department, job role, and/or employee as well as update an existing employee's job role. 


## Installation

- Start by clicking the link to the application's repository: [Repository Link](https://github.com/ckoehler16/Company-Tracker)
- Next clone the Company-Tracker repository to your local computer.
- Then while in the root directory run 'npm init -y' in the command-line terminal to ensure your package.json
- Make sure in your package.json file that it says '"main": "server.js"' and that under "scripts" it says "start": "node server.js"
- Next in the command-line's root directory run 'npm i inquirer mysql2 express console.table dotenv' to make sure all the necessary node packages are installed (I recommend installing the dotenv and creating the .env file to protect you MySQL information being public).
- Then in the root directory command-line run 'mysql -u root -p' and follow the prompts to be logged into MySQL.
- Next run 'source db/schema.sql' followed by 'source db/seeds.sql' to clear out any existing database, create a new one, and populate the tables with existing information.
- Then back in your root directory's command-line run 'npm start' and follow the prompts.


## Usage

Click on the link below for a tutorial on how to run the application.
- [Tutorial](https://drive.google.com/file/d/1B8TYoMHdQ_9s_4WTRY8r6FfyIsn-44Ls/view)


## License

MIT License
For more information on this license go to:
- [MIT License](https://choosealicense.com/licenses/mit/)


## Questions

If you have any questions regarding this applications please contact me at:
- GitHub: [ckoehler16](https://github.com/ckoehler16)
- Email: ckoehler16@gmail.com
