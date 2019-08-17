import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Skill} from '../models/skill.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class SkillsService implements OnInit{
  skillsCollection: AngularFirestoreCollection<Skill>;
  items: Observable<Skill[]>;
  skillDoc: AngularFirestoreDocument<Skill>;

  constructor(private afs: AngularFirestore) {

  }

  ngOnInit(): void {

  }



  getSkills() {
    this.skillsCollection = this.afs.collection('skills');

    this.items = this.skillsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Skill;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.items;
  }

  addSkill(skill: Skill) {
    this.skillsCollection.add(skill);
  }

  deleteItem(skill: Skill) {
    this.skillDoc = this.afs.doc(`skills/${skill.id}`);
    this.skillDoc.delete();
  }


  updateSkill(skill: Skill) {
    this.skillDoc = this.afs.doc(`skills/${skill.id}`);
    this.skillDoc.update(skill);
  }
}
