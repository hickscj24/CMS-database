const connection = require('./connection');

//fille sending queries to db 

class DB {
    constructor(connection) {
        this.connection = connection
    }


    viewAllEmployees(){
       return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }

    viewAllDept(){
        return this.connection.promise().query(
            "SELECT department.id, department.name from department"
        )
    }
    
    viewAllRoles(){
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        )
    }

    addNewEmployee(e){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", e
        )
    }

    addNewDept(d){
        console.log(d)
        return this.connection.promise().query(
           // "INSERT INTO department SET ?", d
          // "INSERT INTO department (name) VALUES (`${d}`);"
        )
    }
}

module.exports = new DB(connection);