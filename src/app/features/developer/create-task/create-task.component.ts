import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../../project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-task.component.html',
//   styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskStatusOptions = Object.values(TaskStatus);

  newTask: Task = { 
    jira_ticket: '', 
    title: '', 
    status: TaskStatus.YetToStart,
    assignee: '', 
    assignedDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10)
  };

  showModal = true;

  @Input() task: Task | undefined;
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.task) {
      this.newTask = { ...this.task }; // Populate the form with existing values
    }
  }

  addTask() {
    this.taskAdded.emit(this.newTask);
    // Reset form
    this.newTask = { 
      jira_ticket: '', 
      title: '', 
      status: TaskStatus.YetToStart,
      assignee: '', 
      assignedDate: new Date().toLocaleDateString(),
      dueDate: new Date().toLocaleDateString()
    };
    this.showModal = false;
  }

  onCancel() {
    this.cancel.emit();
    this.showModal = false;
  }

  onSubmit() {
    if (!this.newTask.title || !this.newTask.jira_ticket) {
      alert('Jira Ticket # and Title must be present.');
      return;
    }

    if (this.newTask.jira_ticket && !/^\d+$/.test(this.newTask.jira_ticket.toString())) {
      alert('Jira Ticket # must contain only numeric characters.');
      return;
    }
    
    this.taskAdded.emit(this.newTask);
    this.newTask = {
      jira_ticket: '',
      title: '',
      status: TaskStatus.YetToStart,
      assignee: '',
      assignedDate: '',
      dueDate: '',
    };
    this.showModal = false;
  }
}