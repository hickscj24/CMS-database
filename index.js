
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
                type:'list',
                name: 'userChoice',
                choices: [
                    {
                        name: 'View All Employees', 
                        value:'view_employees'
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
                       name:"Add Dept",
                       value: "add_dept"
                   },
                   { 
                       name: 'View All Roles', 
                       value: 'view_roles'
                   }
                ]
            }
        ]) .then(res =>{
            let choice = res.userChoice
            console.log(choice)
            switch(choice){
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
                case 'view_roles':
                    viewAllRoles();
                    break;
            }
        })
    }
   

 





        function viewAllEmployees(){ 
            console.log('view employees')
            db.viewAllEmployees()
                .then(([rows]) => {
                    var res=rows
                    console.table('DATA HERE', res)
                })
                //.then(() => loadPrompt())

                loadPromt();
        }


        function viewAllDept(){

            console.log('view employees by dept')

            db.viewAllDept()
            .then(([rows]) => {
                var res=rows;
                console.table(res)
            })
            loadPromt();
        };

    function viewAllRoles(){
        db.viewAllRoles().then(([rows]) => {
            var res = rows;
            console.table(res);
        })
    }

    function addEmployee(){
        inquirer.prompt([
            {
                name: 'first_name',
                message: 'What is employees first name?'
            }, 
            { 
                name: 'last_name',
                message: 'what is the employees last name?'
            }
        ]).then( res => {
            console.log(res)
            var nameF = res.first_name;
            var nameL = res.last_name;

            db.viewAllRoles().then(([rows]) => {
                var roles=rows;
                var roleChoice = roles.map(({id, title}) => ({
                    name:title,
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
                    var roleId =res.roleChoice;
                    
                    db.viewAllEmployees()
                    .then(([rows]) => {
                        var employ = rows;
                        var managerChoice =employ.map(({id, first_name, last_name}) =>({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }))
                        inquirer.prompt({
                            type: 'list',
                            name: 'managerChoice',
                            message: 'Employees Manger?',
                            choices: managerChoice
                        })
                        .then(res=>{
                            let newEmployee = {
                                manager_id : res.managerChoice,
                                role_id: roleId,
                                first_name: nameF,
                                last_name: nameL
                            }

                         //   console.log(newEmployee)
                         db.addNewEmployee(newEmployee)
                        
                        })
                        .then(()=>{
                            console.log('New Employee Added')
                            loadPromt();
                        })
                    })

                })
            })
        })
    };

    function addDept(){
        console.log('hey')
        inquirer.prompt([
            {name: 'name', message: 'Waht is the new depts name?'}
        ]).then(res =>{
            console.log('name', res.name)
            var name = res.name;
            db.addNewDept(name)
            .then((err)=>console.log('Department Created', err));
            loadPromt();

        })
    }

        
 
 employee_tracker();
