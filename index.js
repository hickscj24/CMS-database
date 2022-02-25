
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var db = require('./db/query');
require('console.table');
//var connection = require('./db/connection');

function employee_tracker() {

    console.log('EMPLOYEE MANAGER');

    loadPromt();
}

function loadPromt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'view_employees'
                },
                {
                    name: 'Add an Employee',
                    value: 'add_employee'
                },
                {
                    name: 'View All Dept',
                    value: 'view_dept'
                },
                {
                    name: "Add Dept",
                    value: "add_dept"
                },
                {
                    name: "Add Role",
                    value: "add_role"
                },
                {
                    name: 'View All Roles',
                    value: 'view_roles'
                },
                {
                    name: 'Update Employee Role',
                    value: 'update_employee'
                }
            ]
        }
    ]).then(res => {
        let choice = res.userChoice
        console.log(choice)
        switch (choice) {
            case 'view_employees':
                viewAllEmployees();
                break;
            case 'add_employee':
                addEmployee()
                break;
            case 'view_dept':
                viewAllDept();
                break;
            case 'add_dept':
                addDept();
                break;
            case 'add_role':
                addRole();
                break;
            case 'view_roles':
                viewAllRoles();
                break;
            case 'update_employee':
                updateEmployeeRole();
                break;
        }
    })
}








function viewAllEmployees() {
    console.log('view employees')
    db.viewAllEmployees()
        .then(([rows]) => {
            var res = rows
            console.table('DATA HERE', res)
        })
    //.then(() => loadPrompt())

    loadPromt();
}


function viewAllDept() {

    console.log('view employees by dept')

    db.viewAllDept()
        .then(([rows]) => {
            var res = rows;
            console.table(res)
        })
    loadPromt();
};

function viewAllRoles() {
    db.viewAllRoles().then(([rows]) => {
        var res = rows;
        console.table(res);
    })
    loadPromt();
}

function addDept() {
    inquirer.prompt([
        { name: 'name', message: 'What is the new depts name?' }
    ]).then(res => {
        console.log('name', res.name)
        let newDept = {
            name: res.name,
        }
        db.addNewDept(newDept).then(() => {
            console.log('New Department Added')
            loadPromt();
        });
    })
}
function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            name: 'salary',
            message: 'What is the salary of the role?'
        }
    ]).then(res1 => {
        console.log(res1)

        db.viewAllDept().then(([rows]) => {
            var depts = rows;
            var deptChoice = depts.map(({ id, name }) => ({
                name: name,
                value: id
            }))

            inquirer.prompt({
                type: 'list',
                name: 'deptChoice',
                message: 'What dept will the role be assigned too?',
                choices: deptChoice
            }).then(res2 => {
                let newRole = {
                    title: res1.title,
                    salary: res1.salary,
                    department_id: res2.deptChoice
                }
                db.addNewRole(newRole).then(() => {
                    console.log('New Role Added')
                    loadPromt();
                });
            })

        })
    })
}
function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            message: 'What is employees first name?'
        },
        {
            name: 'last_name',
            message: 'what is the employees last name?'
        }
    ]).then(res => {
        console.log(res)
        var nameF = res.first_name;
        var nameL = res.last_name;

        db.viewAllRoles().then(([rows]) => {
            var roles = rows;
            var roleChoice = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }))

            inquirer.prompt({
                type: 'list',
                name: 'roleChoice',
                message: 'What role will the employee be assigned too?',
                choices: roleChoice
            })
                .then(res => {
                    console.log('NEW role', res)
                    var roleId = res.roleChoice;

                    db.viewAllEmployees()
                        .then(([rows]) => {
                            var employ = rows;
                            var managerChoice = employ.map(({ id, first_name, last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }))
                            inquirer.prompt({
                                type: 'list',
                                name: 'managerChoice',
                                message: 'Employees Manger?',
                                choices: managerChoice
                            })
                                .then(res => {
                                    let newEmployee = {
                                        manager_id: res.managerChoice,
                                        role_id: roleId,
                                        first_name: nameF,
                                        last_name: nameL
                                    }

                                    //   console.log(newEmployee)
                                    db.addNewEmployee(newEmployee)

                                })
                                .then(() => {
                                    console.log('New Employee Added')
                                    loadPromt();
                                })
                        })

                })
        })
    })
};
function updateEmployeeRole() {
    db.viewAllEmployees()
        .then(([rows]) => {
            var employ = rows;
            var employeeChoice = employ.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))
            inquirer.prompt({
                type: 'list',
                name: 'employeeChoice',
                message: 'Which employee?',
                choices: employeeChoice
            }).then(res1 => {
                db.viewAllRoles().then(([rows]) => {
                    var roles = rows;
                    var roleChoice = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }))

                    inquirer.prompt({
                        type: 'list',
                        name: 'roleChoice',
                        message: 'What role will the employee be assigned too?',
                        choices: roleChoice
                    })
                        .then(res2 => {
                            let employeeUpdate = {
                                employee_id: res1.employeeChoice,
                                role_id: res2.roleChoice
                            }
                            db.updateEmployeeRole(employeeUpdate) 
                            
                        })
                        .then(() => {
                            console.log('New Employee updated')
                            loadPromt();
                        })
                })
            })
        })
}




employee_tracker();
