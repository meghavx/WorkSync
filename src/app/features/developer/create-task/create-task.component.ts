import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-task.component.html',
//   styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  newTask: Task = { name: '', assignee: '', startDate: new Date(), launchDate: new Date() };

  @Output() taskAdded = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  addTask() {
    this.taskAdded.emit(this.newTask);
    this.newTask = { name: '', assignee: '', startDate: new Date(), launchDate: new Date() }; // Reset form
  }

  onCancel() {
    this.cancel.emit();
  }
}