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

    name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)])],
    client: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,}$/)])],

});


private buildForm(){
    this.logInForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {console.log(value) })

} 


serviceCheck(control: AbstractControl) {

    const webControl = control.get('web')?.value;
    const consultoriaControl = control.get('consultoria')?.value;
    const addsControl = control.get('adds')?.value;

    if(!webControl && !consultoriaControl && !addsControl ){
        return { noCheck: true };
        console.log("esto no existe")
    } else {
        return null;

    }
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
    return this.logInForm.get('name');
}

get clientField() {
    return this.logInForm.get('client');
}



}
