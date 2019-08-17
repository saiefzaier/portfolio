import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {ProjectService} from '../services/project.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Project} from '../models/project.mod';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  loggedIn = false;
   projects;
   userSub: Subscription;
  progress;
  projectToEdit: any;
  editState: boolean = false;
  imgsrc: string = '';
  selectedFiles: FileList;
  file: File;
  task: AngularFireUploadTask;
  adding: boolean;

  constructor(private authService: AuthService, private projectsService: ProjectService, private afStorage: AngularFireStorage, private db: AngularFirestore) {

  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.loggedIn = !user ? false : true;
      }
    );

    this.projectsService.getProjects().subscribe(
      items => {
        console.log(items);
        this.projects = items;
      }
    );


  }


  uploadpic(event) {
    this.selectedFiles = event.target.files;
    let file = this.selectedFiles.item(0);
    const path = `test/${new Date().getTime()}_${file.name}`;
    this.task = this.afStorage.upload(path, file);
    this.task.then(
      () => {
        const ref = this.afStorage.ref(path);
        return ref.getDownloadURL().subscribe(url => {
          this.imgsrc = url;
          console.log(url);
        });
      }
    );
    this.task.percentageChanges().subscribe((value) => {
      console.log(value);
      this.progress = value.toFixed(2);
    });

  }

  deletepic(url) {
    this.afStorage.storage.refFromURL(url).delete();
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  submit(project: Project) {
    console.log('Before delete' + project.imageurl);
    console.log(this.imgsrc);
    if (!this.imgsrc && this.imgsrc=='') {
      this.projectsService.updateProject(project);
    }
    else {
      this.deletepic(project.imageurl);
      project.imageurl = this.imgsrc;
      this.projectsService.updateProject(project);
    }

  }

  editProject(event, project) {
    this.projectToEdit = project;
    this.editState = true;
  }

  deleteProject(event, project) {
    if (confirm('Are you sure you want to delete ' + project.title)) {
      this.projectsService.deleteProject(project);
    }
  }

  enableadd() {
    this.adding=!this.adding;
  }
}
