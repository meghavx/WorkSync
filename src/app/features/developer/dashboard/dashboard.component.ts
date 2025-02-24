import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../project.service';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {
    this.projectService.projects$.subscribe((projects) => {
      this.projects = projects;
    });
  }

  navigateToProject(projectId: number) {
    this.router.navigate(['/project', projectId]);
  }

  navigateToCreateProject() {
    this.router.navigate(['/create-project']);
  }

  editProject(projectId: number) {
    this.router.navigate(['/create-project', projectId]);
  }
}