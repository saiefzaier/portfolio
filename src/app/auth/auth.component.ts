import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {



  error:string=null;
  constructor(private authService: AuthService,private router:Router) {
  }




  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }



    const email = authForm.value.email;
    const password = authForm.value.password;




      this.authService.login(email,password).subscribe(
        (resData: any) => {
          console.log(resData);
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
          this.error=err;


        }
      );



    console.log(authForm.value);

  }

  handleError() {
    this.error=null;
  }
}
