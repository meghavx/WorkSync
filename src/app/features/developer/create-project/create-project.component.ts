import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project, Team } from '../../project.service';
import { Router } from '@angular/router';
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

  constructor(private projectService: ProjectService, private router: Router) {}

  addProject() {
    this.projectService.addProject({ ...this.newProject });
    this.router.navigate(['/dev-dashboard']);
  }
}
