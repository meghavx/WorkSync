import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, Project, Task } from '../../project.service';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { HeaderComponent } from "../../../header/header.component"; // Import CreateTaskComponent

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, HeaderComponent], // Add CreateTaskComponent
  templateUrl: './view-project.component.html',
  // styleUrls: ['./view-project.component.scss'],
})
export class ViewProjectComponent implements OnInit {
  project: Project | undefined;
  showAddTaskForm = false;
  tasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.projectService.getProject(id);

    if (!this.project) {
      this.router.navigate(['/']);
      return;
    }

    this.tasks = this.project.tasks || [];
  }

  toggleAddTaskForm() {
    this.showAddTaskForm = !this.showAddTaskForm;
  }

  addTask(newTask: Task) {
    if (this.project) {
      this.project.tasks = [...this.tasks, newTask];
      this.projectService.updateProject(this.project);
      this.tasks = this.project.tasks;
    }
    this.showAddTaskForm = false;
  }

  cancelAddTask() {
    this.showAddTaskForm = false;
  }
}