import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface RegisterCredentials {
  name: string,
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  // id: string,
  name: string,
  email: string;
  password: string;
}

@Component({
  selector: 'app-register-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-login.component.html',
  styleUrl: './register-login.component.scss'
})

export class RegisterLoginComponent implements OnInit {
  // Inject Router using the inject() function
  private router = inject(Router);

  users: User[] = [];

  registerObj: RegisterCredentials = {
    name: '',
    email: '',
    password: ''
  };

  loginObj: LoginCredentials = {
    email: '',
    password: ''
  };

  ngOnInit(): void { 
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
    }
  }

  onRegister() {
    this.users.push(this.registerObj);
    localStorage.setItem('users', JSON.stringify(this.users));
    alert('Registration successful!');

    this.registerObj = {
      name: '',
      email: '',
      password: ''
    };
  }

  onLogin() {
    const user = this.users.find(user => user.email === this.loginObj.email);
    if (user) {
      if (user.password === this.loginObj.password) {
        this.router.navigate(['/home']);
      } else {
        alert('Incorrect password');
      }
    }
    else {
      alert(`Looks like you've either entered the wrong credentials or you don't have an account with us.`);
    }
  }
}
