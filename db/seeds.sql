INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Marketing'),
    ('Sales'),
    ('Human Resources'),
    ('Accounting'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Software Engineer', 85000, 1),
    ('Data Engineer', 85000, 1),
    ('Engineer Manager', 100000, 1),
    ('Marketing Manager', 100000, 2),
    ('Marketing Analyst', 75000, 2),
    ('Digital Media', 75000, 2),
    ('Sales Manager', 100000, 3),
    ('Sales Representative', 70000, 3),
    ('Business Development', 80000, 3),
    ('Human Resources Manager', 90000, 4),
    ('HR Representative', 70000, 4),
    ('Recruiter', 80000, 4),
    ('Accountant', 90000, 5),
    ('CFO', 100000, 5),
    ('Legal Team Lead', 100000, 6),
    ('Lawyer', 90000, 6),
    ('Paralegal', 60000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Emily', 'Blunt', 3, NULL),
    ('Jacob', 'Black', 1, 1),
    ('Hannah', 'Corbin', 2, 1),
    ('Michael', 'Scott', 4, NULL),
    ('Sarah', 'Parker', 5, 4),
    ('Joshua', 'Pine', 6, 4),
    ('Samantha', 'Jones', 7, NULL),
    ('Nicholas', 'Frye', 8, 7),
    ('Ashley', 'Greene', 9, 7),
    ('Christopher', 'Jensen', 10, NULL),
    ('Madison', 'Reed', 11, 10),
    ('Tyler', 'Durden', 12, 10),
    ('Taylor', 'Jones', 13, 14),
    ('Andrew', 'Garfield', 14, NULL),
    ('Jessica', 'Rabbit', 15, NULL),
    ('Daniel', 'Thompson', 16, 15),
    ('Victoria', 'Lane', 17, 15),
    ('Ryan', 'Gosling', 1, 3),
    ('Emma', 'Watson', 16, 15),
    ('Jonathan', 'Krimsier', 2, 1);

