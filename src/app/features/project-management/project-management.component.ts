import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../project.service';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss'
})
export class ProjectManagementComponent implements OnInit {
  projectForm!: FormGroup;
  teams: string[] = [];
  selectedTeam: string = '';
  inProgressTasks: { desc: string }[] = [];
  doneTasks: { desc: string }[] = [];
  projectStatus: string = '';
  nextWeekFocus: string = '';

  constructor(private fb: FormBuilder, private projectService: ProjectService) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      status: [''],
      nextFocus: ['']
    });

    this.teams = this.projectService.getTeams();

    // Load saved status
    const savedData = this.projectService.getProjectStatus();
    this.projectStatus = savedData.status;
    this.nextWeekFocus = savedData.nextWeekFocus;
  }

  addTask(status: 'in-progress' | 'done', desc: string) {
    if (desc.trim()) {
      if (status === 'in-progress') {
        this.inProgressTasks.push({ desc });
      } else {
        this.doneTasks.push({ desc });
      }
    }
  }

  previewChanges() {
    this.projectStatus = this.projectForm.value.status;
    this.nextWeekFocus = this.projectForm.value.nextFocus;

    // Save to local storage
    this.projectService.saveProjectStatus(this.projectStatus, this.nextWeekFocus);
  }
}
