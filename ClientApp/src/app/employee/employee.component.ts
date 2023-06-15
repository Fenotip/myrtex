import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  employee: any = {};
  editMode = false;
  isNewEmployee = false;
  selectedColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadEmployees();
  }

  //loadEmployees() {
  //  this.http.get<any[]>('api/employee').subscribe(data => {
  //    this.employees = data;
  //  });
  //}

  loadEmployees() {
    const sortParam = this.selectedColumn ? `&_sort=${this.selectedColumn}&_order=${this.sortDirection}` : '';
    this.http.get<any[]>('api/employee').subscribe(data => {
      this.employees = data;
      this.sortEmployees();
    });
  }

  sortEmployees() {
    if (this.selectedColumn) {
      this.employees.sort((a, b) => {
        const valueA = a[this.selectedColumn];
        const valueB = b[this.selectedColumn];
        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
  }

  sortColumn(column: string) {
    if (this.selectedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.selectedColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortEmployees();
  }

  editEmployee(employee: any) {
    this.employee = { ...employee };
    this.editMode = true;
    this.employee.birthDate = new Date(employee.birthDate + 'z').toISOString().substring(0, 10);
    this.employee.employmentDate = new Date(employee.employmentDate + 'z').toISOString().substring(0, 10);
  }

  deleteEmployee(employee: any) {
    if (confirm('Вы действительно хотите удалить сотрудника?')) {
      this.http.delete(`api/employee/${employee.id}`).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  addEmployee() {
    this.employee = {};
    this.editMode = true;
    this.isNewEmployee = true;
  }

  saveEmployee() {
    if (this.isNewEmployee) {
      this.http.post('api/employee', this.employee).subscribe(() => {
        this.loadEmployees();
        this.cancelEdit();
      });
    } else {
      this.http.put(`api/employee/${this.employee.id}`, this.employee).subscribe(() => {
        this.loadEmployees();
        this.cancelEdit();
      });
    }
  }

  cancelEdit() {
    this.employee = {};
    this.editMode = false;
    this.isNewEmployee = false;
  }
}
