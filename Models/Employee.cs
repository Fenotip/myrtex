﻿namespace MyrtexProject.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Department { get; set; }
        public string? FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime EmploymentDate { get; set; }
        public decimal Salary { get; set; }


    }
}
