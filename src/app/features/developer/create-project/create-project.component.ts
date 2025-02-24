import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project, Team } from '../../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../header/header.component";

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './create-project.component.html',
  styles: `
    .card {
      width: 54em;
    }
  ` 
})
export class CreateProjectComponent {
  teamOptions = Object.values(Team);

  newProject: Project = {
    id: 0,
    title: '',
    team: '' as Team,
    description: '',
    tasks: []
  };

  isEditMode = false;

  constructor(
    private projectService: ProjectService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projectId = +params['id']; // Convert to number
      if (projectId) {
        this.isEditMode = true;
        const project = this.projectService.getProject(projectId);
        if (project) {
          this.newProject = { ...project }; // Clone the project
        } else {
          // Handle project not found (e.g., redirect or show an error)
          console.error('Project not found');
          this.router.navigate(['/dev-dashboard']);
        }
      }
    });
  }

  addProject() {
    if (this.isEditMode) {
      this.projectService.updateProject(this.newProject);
    } else {
      this.projectService.addProject({ ...this.newProject });
    }
    this.router.navigate(['/dev-dashboard']);
  }
}
