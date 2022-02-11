
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var connection = require('./db/connection');

 function employee_tracker() {

    console.log('EMPLOYEE MANAGER');

    loadPromt();

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
                        name: 'View All Employees By Dept',
                        value: 'view_employees_dept'
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
                case 'view_employees_dept':
                    viewAllEmployeesByDept();
                    break;
            }
        })
    }
   

 }





        function viewAllEmployees(){ 
            console.log('view employees')
        }


        function viewAllEmployeesByDept(){

            console.log('view employees by dept')
        }
        
 
 employee_tracker();
