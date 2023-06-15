
SELECT * FROM Employees; /****** ¬ыборка всех сотрудников  ******/
SELECT * FROM Employees WHERE Salary > 10000;  /****** сотрудников у кого зп выше 10000  ******/
DELETE FROM Employees WHERE DATEDIFF(year, BirthDate, GETDATE()) > 70; /****** удалени€ сотрудников старше 70 лет  ******/
UPDATE Employees SET Salary = 15000 WHERE Salary < 15000;  /****** обновить зп до 15000  тем сотрудникам, у которых она меньше  ******/


