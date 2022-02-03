var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');

async function employee_tracker() {
   
    async function createDepartment() {

        await inquirer.prompt([
            /* Pass your questions in here */
            {
                type: 'input',
                name: 'department',
                message: 'do you want to view all departments?'
            },
            {
                type: 'input',
                name: 'roles',
                message: 'do you want to view all roles?'
            },
            {
                type: 'input',
                name: 'employees',
                message: 'do you want to view all employees?'
            },
           

        ]).then(async (answers) => {
            console.log(answers)

            var department = new department(answers.department, answers.roles, answers.employees)
           
           
            await department(department);

            async function addDepartment(department) {
                await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'which department to you want to add?',
                        choices: [
                            'Sales',
                            'Engineering',
                            'Finance',
                            'Legal',
                            'I do not want to add another department'
                        ]
                    }