import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, Project } from '../project.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  template: `
    <app-header></app-header>
    <div *ngIf="project">
      <h2>{{ project.name }}</h2>
      <p>Description: {{ project.description }}</p>
    </div>
  `,
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      // this.project = this.projectService.getProject(projectId);
    });
  }
}