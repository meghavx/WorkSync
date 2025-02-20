import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly TEAM_KEY = 'teams';

  constructor() {
    // Initialize teams in local storage if not already set
    if (!localStorage.getItem(this.TEAM_KEY)) {
      localStorage.setItem(this.TEAM_KEY, JSON.stringify(["Frontend Team", "Backend Team", "DevOps Team"]));
    }
  }

  getTeams(): string[] {
    return JSON.parse(localStorage.getItem(this.TEAM_KEY) || '[]');
  }

  saveProjectStatus(status: string, nextWeekFocus: string): void {
    localStorage.setItem('projectStatus', status);
    localStorage.setItem('nextWeekFocus', nextWeekFocus);
  }

  getProjectStatus(): { status: string; nextWeekFocus: string } {
    return {
      status: localStorage.getItem('projectStatus') || '',
      nextWeekFocus: localStorage.getItem('nextWeekFocus') || ''
    };
  }
}
