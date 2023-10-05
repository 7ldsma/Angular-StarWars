import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor ( private FormBuilder: FormBuilder, 
    private route: ActivatedRoute){

    this.buildForm();

  };
 

 


logInForm = this.FormBuilder.group({

    userName: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)])],
    password: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{5,}$/)])],

});


private buildForm(){
    this.logInForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {console.log(value) })

} 


save(event: Event) {
    event.preventDefault();
    if(this.logInForm.valid) {

    } else {
        // alert('you must fill the form')
        this.logInForm.markAllAsTouched();
    };


}


get nameField() {
    return this.logInForm.get('userName');
}

get clientField() {
    return this.logInForm.get('password');
}



}
