---
--- 

## 1NF: Atomic Values
Original:
- Orders(order_id, customer, items)
  - order_id: 1
  - customer: "John"
  - items: "shirt, pants, hat"

Problem:
- Items field contains comma-separated list
- Can't query/filter individual items
- Can't count items easily

Solution:
- Orders(order_id, customer)
- OrderItems(order_id, item)
  - Each item gets separate row
  - Easy to query/count/filter

## 2NF: No Partial Dependencies
Original:
- StudentCourses(student_id+course_id, grade, course_name, professor)
  - "123-CS101", "A", "Intro CS", "Smith"

Problem:
- course_name/professor only depend on course_id
- Duplicates course info for every student
- Course updates need multiple row changes

Solution:
- StudentGrades(student_id+course_id, grade)
- Courses(course_id, course_name, professor)

## 3NF: No Transitive Dependencies
Original:
- Employees(emp_id, dept_id, dept_name, dept_budget)
  - 1, "D1", "Sales", 1000000

Problem:
- dept_name/budget depend on dept_id, not emp_id
- Department info duplicated for each employee
- Budget update requires changing multiple rows

Solution:
- Employees(emp_id, dept_id)
- Departments(dept_id, dept_name, dept_budget)