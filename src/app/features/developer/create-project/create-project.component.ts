import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project.component.html',
  styles: [], // Bootstrap handles styling
})
export class CreateProjectComponent {
  newProject: Project = {
    id: 0,
    name: '',
    description: ''
  };

  constructor(private projectService: ProjectService, private router: Router) {}

  addProject() {
    this.projectService.addProject({ ...this.newProject });
    this.router.navigate(['/dev-dashboard']);
  }
}
