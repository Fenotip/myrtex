using Microsoft.EntityFrameworkCore;
using MyrtexProject.Models;
using System.Collections.Generic;

namespace MyrtexProject
{
    public class ApplicationContext : DbContext
    {

      
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }

        public DbSet<Employee> Employees { get; set; }

    }
}
