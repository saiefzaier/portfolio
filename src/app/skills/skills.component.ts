import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Skill} from '../models/skill.model';
import {SkillsService} from '../services/skills.service';


@Component({selector: 'app-skills', templateUrl: './skills.component.html', styleUrls: ['./skills.component.css']})

export class SkillsComponent implements OnInit {
    skills;
    userSub : Subscription;
    loggedIn = false;
    adding : boolean;
    editState : boolean = false;
    skillToEdit : Skill;
    regex = (/\s+/);


    constructor(private authService : AuthService, private skillService : SkillsService) {}


    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.loggedIn = !user ? false : true;
        });

        this.skillService.getSkills().subscribe(items => {
            console.log(items);
            this.skills = items;
        });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    deleteSkill(event, skill) {
        if (confirm('Are you sure you want to delete ' + skill.skill)) {
            this.skillService.deleteItem(skill);
        }
    }


    editItem(event, skill) {
        this.editState = true;
        this.skillToEdit = skill;
    }

    updateSkill(skill : Skill) {
        this.skillService.updateSkill(skill);
    }


    enableAdd() {
        this.adding = !this.adding;
    }

}
