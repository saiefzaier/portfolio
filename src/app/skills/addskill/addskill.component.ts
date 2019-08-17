import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {SkillsService} from '../../services/skills.service';
import {Skill} from '../../models/skill.model';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
  private userSub: Subscription;
  loggedIn = false;
  name: string;
  desc: string;
  skilldesc: string[];
  sk: Skill = {
    id: '',
    skill: '',
    skilldesc: ''
  };


  constructor(private authService: AuthService, private skillService: SkillsService) {

  }


  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.loggedIn = !user ? false : true;
      }
    );
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSubmit() {
    this.skillService.addSkill(this.sk);

  }

}
