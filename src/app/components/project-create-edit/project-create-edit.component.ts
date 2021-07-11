import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../shared/project.model';
import { Status } from '../../shared/status.model';
import { Contact } from '../../shared/contact.model'

import { ProjectService } from '../../shared/project.service';

@Component({
  selector: 'app-project-create-edit',
  templateUrl: './project-create-edit.component.html',
  styleUrls: ['./project-create-edit.component.css'],
  providers: [ProjectService]

})



export class ProjectCreateEditComponent implements OnInit {

  project: Project;
  statusList: Status[];
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  defProject:Project = {
    id:0,
    title:'',
    contacts:[{
      id:0,
      fullName:'',
      email:'',
      phone:''
    }],
    status:{
      id:0,
      name:''
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService) { 
      this.project = this.defProject
      this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      id:[this.project.id],
      title: [this.project.title, Validators.required ],
      status: [this.project.status, Validators.required ],
      contactsFormArr: this.getContactsFormArr()     
   });
   
  }

  get contactsFormArr(): FormArray {
    return this.form.get('contactsFormArr') as FormArray;
  }

  addContact(){
    this.contactsFormArr.push(this.formBuilder.group({
      id:[0],
      fullName: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['']
    }))
    this.project.contacts.push({
      id:0,
      fullName:'',
      email:'',
      phone:''
    })
  }

  deleteContact(index: number){
    this.contactsFormArr.removeAt(index);
  }
  
  getContactsFormArr() {
    let arr = new FormArray([]);
    this.project.contacts.forEach(contact => {
      arr.push(
        this.formBuilder.group({
          id: [contact.id],
          fullName: [contact.fullName, Validators.required ],
          email: [contact.email, Validators.required ],
          phone: [contact.phone]
        })
      );
    });
    return arr;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.projectService.getProjectById(this.id)          
      .subscribe(x => {
        this.project = x;
        this.createForm();
        this.form.patchValue(x)
      });  //.subscribe(x => this.form.patchValue(x));
    }else {
      this.project = this.defProject
    }

    this.projectService.getStatusList().subscribe(x => this.statusList = x); 
  }

  onSubmit(){
    console.log(this.form);
    console.log(this.form.controls.title.errors.required);
    
    if(this.isAddMode){
      this.projectService.postProject(this.project).subscribe(a=>console.log(a));
    }else{
      this.projectService.putProject(this.project).subscribe(a=>console.log(a));
    }
  }

}
