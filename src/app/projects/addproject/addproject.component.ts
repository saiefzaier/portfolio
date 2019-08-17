import {Component, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Project} from '../../models/project.mod';
import {ProjectService} from '../../services/project.service';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  imgsrc;
  selectedFiles:FileList;
  file:File;
  task: AngularFireUploadTask;
  progress: any;

  project: Project={
  imageurl:'',
  title:'',
  description:'',
  github:'',
  youtube:'',
  www:'',
  };




  constructor(private projectService:ProjectService ,private afStorage: AngularFireStorage,private db: AngularFirestore) {

  }


  ngOnInit() {
  }


  chooseFiles(event) {
    this.selectedFiles=event.target.files;
    if (this.selectedFiles.item(0)) {
      this.uploadpic();
    }
  }

   uploadpic() {
    let file=this.selectedFiles.item(0);
     const path = `test/${new Date().getTime()}_${file.name}`;
     this.task = this.afStorage.upload(path, file);
  this.task.then(

       () => {
         const ref=this.afStorage.ref(path);
         return ref.getDownloadURL().subscribe(url => {
         this.imgsrc=url;
         console.log(url);
         })
       }

     );
this.task.percentageChanges().subscribe((value) => {
  console.log(value);
  this.progress= value.toFixed(2);
});

   }


  submit() {
    this.project.imageurl=this.imgsrc;
    console.log(this.project);
    this.projectService.addProject(this.project);
  }
}
