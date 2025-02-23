import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Project {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
}

export enum Team {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Fullstack = 'Fullstack',
  QA_Testing = 'QA/Testing'
}

export interface Task {
  jira_ticket: number;
  title: string;
  assignee: string;
  status: TaskStatus;
}

export enum TaskStatus {
  InProgress = 'In-progress',
  Done = 'Done',
  Blocked = 'Blocked'
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];
  private projectsSubject = new BehaviorSubject<Project[]>(this.projects); // Corrected
  projects$ = this.projectsSubject.asObservable();

  constructor() {
    this.loadProjectsFromLocalStorage(); // Load projects on service initialization
  }

  private loadProjectsFromLocalStorage() {
    const projectsData = localStorage.getItem('projects');
    if (projectsData) {
      this.projects = JSON.parse(projectsData);
      this.projectsSubject.next([...this.projects]); // Notify subscribers
    }
  }

  private saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  addProject(project: Project) {
    project.id = Date.now();
    this.projects.push(project);
    this.saveProjectsToLocalStorage();
    this.projectsSubject.next([...this.projects]); // Corrected
  }

  getProject(id: number): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  updateProject(updatedProject: Project) {
    const index = this.projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
      this.saveProjectsToLocalStorage();
      this.projectsSubject.next([...this.projects]);
    }
  }
}