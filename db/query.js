const connection = require('./connection');

//fille sending queries to db 

class DB {
    constructor(connection) {
        this.connection = connection
    }


    viewAllEmployees(){
       return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, 
            department.name as Department_Name, role.salary, CONCAT(m.last_name, ", ", m.first_name) as Manager_Name FROM employee 
            LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on 
            role.department_id = department.id LEFT JOIN employee AS m on employee.manager_id = m.id;`
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

    addNewRole(e){
        return this.connection.promise().query(
            "INSERT INTO role SET ?", e
        )
    }

    addNewDept(d){
        console.log(d)
        return this.connection.promise().query(
            'INSERT INTO department SET ?', d
           // "INSERT INTO department SET ?", d
          // "INSERT INTO department (name) VALUES (`${d}`);"
        )
    }
    updateEmployeeRole(d){
        console.log(d)
        return this.connection.promise().query(
           "UPDATE employee SET role_id = ? WHERE id = ?", [d.role_id, d.employee_id]
        )
    }
}

module.exports = new DB(connection);