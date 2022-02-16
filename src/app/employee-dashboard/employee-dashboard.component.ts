 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAddButton ! : boolean;
  showUpdateButton!:boolean;
  constructor(private formbuilber: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });

    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj).subscribe((res) => {
      alert('Employee Added Successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    });
  }
  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('Employee Deleted');
      this.getAllEmployee();
    });
  }
  clickAddEmployee(){
    this.showAddButton= true;
    this.showUpdateButton= false;
    this.formValue.reset();
  }

  onEdit(row: any) {
    this.showAddButton = false;
    this.showUpdateButton = true;
    this.employeeData.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id+1).subscribe((res)=>{
      alert('Employee Data Succesfully Updated!');
      //close the form and update the list 
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    });
  }
}
