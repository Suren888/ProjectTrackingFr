import { Routes } from '@angular/router';

import { ProjectCreateEditComponent } from './components/project-create-edit/project-create-edit.component';
import { ProjectListComponent } from './components/project-list/project-list.component'

export const appRoutes: Routes = [  
  {
    path: 'project-list',
    component: ProjectListComponent
  },
  { 
    path: 'add', 
    component: ProjectCreateEditComponent 
  },
  { 
    path: 'edit/:id', 
    component: ProjectCreateEditComponent 
  },  
  { 
    path: '', 
    redirectTo: '/project-list', pathMatch: 'full' 
  }
];
