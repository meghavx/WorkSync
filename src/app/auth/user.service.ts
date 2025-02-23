import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum UserRole {
  Developer = 'developer',
  Manager = 'manager',
}

export interface UserContext {
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userContextSubject = new BehaviorSubject<UserContext | null>(null);
  userContext$ = this.userContextSubject.asObservable();

  setUserContext(context: UserContext) {
    this.userContextSubject.next(context);
  }

  clearUserContext() {
    this.userContextSubject.next(null);
  }
}