import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    phonenumber: null,
    newpassword: null,
    confirmpassword: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  phonenumber: any;
  confirmpassword: any;
  authService: any;

  

  onSubmit(): void {
    console.log("Submitted");

    const { firstname, lastname, email, phonenumber, newpassword, confirmpassword } = this.form;

    this.authService.register(firstname, lastname, email, phonenumber, newpassword, confirmpassword).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    const char = String.fromCharCode(event.charCode);
    if (!/\d/.test(char)) {
      event.preventDefault();
    }
  }


  // checkPasswordMatch() {

  //   // console.log(typeof(newpassword));
  //   // if (confirmedPassword !== newpassword) {
  //   //   this.confirmpassword.errors = { ...this.confirmpassword.errors, 'mismatch': true };
  //   // } else {
  //   //   // if (this.confirmpassword.errors && this.confirmpassword.errors['mismatch']) {
  //   //   //   delete this.confirmpassword.errors['mismatch'];
  //   //   if(confirmedPassword == newpassword){
  //   //     this.confirmpassword= { ...this.confirmpassword.errors, 'mismatch': true
  //   //   }

  //   //   }
  //   // }

  


}
