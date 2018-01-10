import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'kumar',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  formValidVar:boolean= true;
  constructor(fb:FormBuilder) {

    this.RegisterForm=fb.group({
      'username':[null,Validators.required],
      'email':[null,Validators.compose([Validators.required,Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
      'password':[null,Validators.compose([Validators.minLength(5),Validators.maxLength(10)])],
      'items':{'item1':true,'item2':true,'item3':true,'item4':true},
      'item1':true,
      'item2':false,
      'item3':false,
      'item4':true
    })

      }

  ngOnInit() {
  }

  SubmitForm(formdata: any): void{
    if(this.RegisterForm.valid===true){
      console.log(formdata);
    }else{
      console.log("invalid form");
      if(this.RegisterForm.controls['username'].valid===false || this.RegisterForm.controls['email'].valid===false){
        //console.log(this.RegisterForm.controls);
        this.formValidVar=false;
          }
    }
  }
}
