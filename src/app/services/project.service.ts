import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Project} from '../models/project.mod';


@Injectable({providedIn: 'root'})
export class ProjectService implements OnInit {
  projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;
  projectsDoc: AngularFirestoreDocument<Project>;

  constructor(private  afs2: AngularFirestore) {
    this.projectsCollection = this. afs2.collection('projects');

  }

  ngOnInit(): void {

  }


  getProjects() {
    this.projects = this.projectsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Project;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.projects;
  }

  addProject(project: Project) {
    this.projectsCollection.add(project);
  }

  deleteProject(project: Project) {
    this.projectsDoc = this. afs2.doc(`projects/${project.id}`);
    this.projectsDoc.delete();
  }


  updateProject(project: Project) {
    this.projectsDoc = this. afs2.doc(`projects/${project.id}`);
    this.projectsDoc.update(project);
  }


}
