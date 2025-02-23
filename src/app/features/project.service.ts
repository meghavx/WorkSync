import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  name: string;
  assignee: string;
  startDate: Date;
  launchDate: Date;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];
  private projectsSubject = new BehaviorSubject<Project[]>(this.projects); // Corrected
  projects$ = this.projectsSubject.asObservable();

  addProject(project: Project) {
    project.id = Date.now();
    this.projects.push(project);
    this.projectsSubject.next([...this.projects]); // Corrected
  }

  getProject(id: number): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  updateProject(updatedProject: Project) {
    const index = this.projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
      this.projectsSubject.next([...this.projects]);
    }
  }
}