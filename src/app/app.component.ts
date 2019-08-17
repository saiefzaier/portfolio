import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Portfolio';private userSub:Subscription;

  @Input()
 Loggedin=false;
  public modalRef: BsModalRef; // {1}
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub=  this.authService.user.subscribe(
      user=>{
        this.Loggedin= !user ? false : true;
      }
    );
  } // {2}




}
