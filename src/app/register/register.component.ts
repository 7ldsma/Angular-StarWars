import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  public registerForm!: FormGroup;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router){  }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  signUp(){
    console.log("hola");
    this.http.post<any>("http://localhost:3000/signupUsers", this.registerForm.value)
    .subscribe({
      next: res => {
        alert("Sing Up was successfull");
        this.registerForm.reset();
        this.router.navigate(['login']);
      }, 
      error: err => {
        alert("Something went wrong")
      }
    });
  }


get nameField( ){
  return this.registerForm.get('name')
}

get lastnameField( ){
  return this.registerForm.get('lastname')
}

get emailField( ){
  return this.registerForm.get('email')
}



}
