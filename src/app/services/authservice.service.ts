import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/signupUsers';
  user = sessionStorage.getItem('email');
  

  getAll(){
    return this.http.get(this.apiUrl)
  }

  getByCode(code: any){
    return this.http.get(this.apiUrl + '/' + code)
  }

  proceedRegister(inputData: any){
    return this.http.post(this.apiUrl, inputData)
  }


  isLoggedIn(){
    return sessionStorage.getItem('email')!= null;
  }




}
