import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {Project} from "./project.model";
import {Status} from "./status.model";
import {Observable} from "rxjs/Observable";
 
@Injectable()
export class ProjectService {
  appUrl: string = 'http://localhost:8080/api/';
  constructor(private _http:HttpClient) { }

  getProjectById(id:number):Observable<Project>{    
    return this._http.get(`${this.appUrl}project/${id}`).map(r => <Project>r);
  }

  getProjectList():Observable<Project[]>{    
    return this._http.get(`${this.appUrl}projects`).map(r => <Project[]>r);
  }

  getStatusList():Observable<Status[]>{    
    return this._http.get(`${this.appUrl}status-list`).map(r => <Status[]>r);
  }

  deleteProject(id) {  
    return this._http.delete(`${this.appUrl}delete/${id}`)  
        .map((response: Response) => response)  
        .catch(this.errorHandler);  
  }

  putProject(project: Project){
    debugger
    return this._http.put<Project>(`${this.appUrl}update/${project.id}`, project);
  }

  postProject(project: Project){
    return this._http.post<Project>(`${this.appUrl}create)`, project);
  }

  errorHandler(error: Response) {  
    console.log(error);  
    return Observable.throw(error);  
  } 
}