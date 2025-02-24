import { Component, EventEmitter, Output } from '@angular/core';
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
    jira_ticket: 0, 
    title: '', 
    assignee: '', 
    status: '' as TaskStatus 
  };

  @Output() taskAdded = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  addTask() {
    this.taskAdded.emit(this.newTask);
    this.newTask = { jira_ticket: 0, title: '', assignee: '',  status: TaskStatus.InProgress }; // Reset form
  }

  onCancel() {
    this.cancel.emit();
  }
}