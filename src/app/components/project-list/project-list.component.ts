import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { Router } from '@angular/router';


import { Project } from '../../shared/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ProjectService]
})

export class ProjectListComponent implements OnInit {

  projects:Project[];

  constructor(private projectService: ProjectService,private router: Router) { }

  ngOnInit() {
   this.projectService.getProjectList().subscribe(value=>this.projects=value);
  }

  onDelete(id:number){
    var ans = confirm("Do you want to delete project with Id: " + id);  
    if (ans) {  
      this.projectService.deleteProject(id).subscribe((data) => {  
        this.projects = this.projects.filter(project => project.id !== id);        
      }, error => console.log(error))
    }  
  }

  addClick() {
    this.router.navigateByUrl('/add');
  };
  
  editClick(id:number){
    console.log(id);
    this.router.navigate(['edit', id]);    
  }

}
