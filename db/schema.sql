DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(30) NOT NULL
); 

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    title varchar(30) NOT NULL, 
    salary decimal(10,2) NOT NULL,
   CONSTRAINT department_id FOREIGN KEY (id) REFERENCES department(id) ON DELETE CASCADE    
); 

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT NOT NULL
);








