import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Project {
  id: number;
  title: string;
  team: Team;
  description: string;
  tasks: Task[];
}

export enum Team {
  Frontend = 'Frontend',
  Backend = 'Backend',
  FullStack = 'FullStack',
  QA_Testing = 'QA/Testing'
}

export interface Task {
  jira_ticket: string;
  title: string;
  status: TaskStatus;
  assignee: string;
  assignedDate: string;
  dueDate: string; 
}

export enum TaskStatus {
  YetToStart = 'Yet to start',
  InProgress = 'In-progress',
  ReadyForReview = 'Ready for review',
  Done = 'Done',
  Blocked = 'Blocked'
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];
  private projectsSubject = new BehaviorSubject<Project[]>(this.projects);
  projects$ = this.projectsSubject.asObservable();

  constructor() {
    this.loadProjectsFromLocalStorage();
  }

  private loadProjectsFromLocalStorage() {
    const projectsData = localStorage.getItem('projects');
    if (projectsData) {
      this.projects = JSON.parse(projectsData);
      this.projectsSubject.next([...this.projects]);
    }
  }

  private saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  addProject(project: Project) {
    project.id = Date.now();
    this.projects.push(project);
    this.saveProjectsToLocalStorage();
    this.projectsSubject.next([...this.projects]);
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

  deleteProject(projectId: number) {
    if (window.confirm('Are you sure you want to delete this project?')) {
      this.projects = this.projects.filter(project => project.id !== projectId);
      this.projectsSubject.next([...this.projects]);
    }
  }
}