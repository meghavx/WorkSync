import { Component, OnInit, ViewChild } from '@angular/core';
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
  styles: `
    .view-btn, .edit-btn, .delete-btn {
      min-width: 4em;
      background-color: lightgray;
      border-radius: 1em;
      margin-right: 0.25em;
    }

    @media print {
      :host {
        visibility: hidden;
      }

      #print-section, #print-section * {
        visibility: visible;
      }

      .add-task-btn {
        display: none;
      }

      #print-section {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  `,
})
export class ViewProjectComponent implements OnInit {
  project: Project | undefined;
  showAddTaskForm = false;
  tasks: Task[] = [];
  showEditTaskForm = false;
  editedTask: Task | undefined;

  @ViewChild(CreateTaskComponent) createTaskComponent: CreateTaskComponent | undefined;

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
    if(this.createTaskComponent){
      this.createTaskComponent.showModal = this.showAddTaskForm;
    }
  }

  addTask(newTask: Task) {
    if (!newTask.title || !newTask.jira_ticket) {
      alert('Jira Ticket # and Title must be present.');
      return;
    }

    if (newTask.jira_ticket && !/^\d+$/.test(newTask.jira_ticket.toString())) {
      alert('Jira Ticket # must contain only numeric characters.');
      return;
    }
    
    if (this.project) {
      this.project.tasks = [...this.tasks, newTask];
      this.projectService.updateProject(this.project);
      this.tasks = this.project.tasks;
    }
    this.showAddTaskForm = false;
  }

  editTask(task: Task) {
    this.editedTask = { ...task };
    this.showEditTaskForm = true;
    if(this.createTaskComponent){
      this.createTaskComponent.showModal = this.showEditTaskForm;
    }
  }

  updateTask(updatedTask: Task) {
    if (this.project && this.editedTask) {
      const index = this.project.tasks?.findIndex((t) => t.jira_ticket === this.editedTask?.jira_ticket) ?? -1;
      if (index !== -1 && this.project.tasks) {
        this.project.tasks[index] = updatedTask;
        this.projectService.updateProject(this.project);
        this.tasks = this.project.tasks;
      }
    }
    this.showEditTaskForm = false;
    this.editedTask = undefined;
  }
  
  cancelAddTask() {
    this.showAddTaskForm = false;
  }

  cancelEditTask() {
    this.showEditTaskForm = false;
    this.editedTask = undefined;
  }

  deleteTask(task: Task) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      if (this.project && this.project.tasks) {
        this.project.tasks = this.project.tasks.filter((t) => {
          console.log('Task to delete:', task.jira_ticket, 'Current task:', t.jira_ticket); // Debugging
          return t.jira_ticket !== task.jira_ticket;
        });
        this.projectService.updateProject(this.project);
        this.tasks = this.project.tasks;
      }
    }
  }

  exportProgress() {
    window.print(); // Triggers browser's print dialog (PDF option available)
  }
}