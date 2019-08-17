import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BsDropdownModule, ModalModule, ProgressbarModule, TooltipModule} from 'ngx-bootstrap';
import { ProjectsComponent } from './projects/projects.component';
import {RouterModule} from '@angular/router';
import { SkillsComponent } from './skills/skills.component';
import { AddskillComponent } from './skills/addskill/addskill.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SkillsService} from './services/skills.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AboutComponent } from './about/about.component';
import { AddprojectComponent } from './projects/addproject/addproject.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthGuard} from './auth/auth.guard';

// @ts-ignore
const routes=[
  {path:'projects',component:ProjectsComponent,canActivateChild: [AuthGuard]
  ,children: [{path: "addproject",component: AddprojectComponent}]},
  {path: "skills",component: SkillsComponent,children:[
      {path:"addskill",component:AddskillComponent}
    ]},
  {path: "auth",component: AuthComponent},
  {path: "about",component: AboutComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    SkillsComponent,
    AddskillComponent,
    AuthComponent,
    AboutComponent,

    AddprojectComponent,

  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule, HttpClientModule
    , BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, ReactiveFormsModule, ProgressbarModule,
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [SkillsService,AngularFireStorage,AuthGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }
