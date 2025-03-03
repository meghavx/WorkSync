import { CommonModule } from '@angular/common';
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
  imports: [FormsModule, CommonModule],
  templateUrl: './register-login.component.html',
  styleUrl: './register-login.component.scss'
})

export class RegisterLoginComponent implements OnInit {
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

  passwordType: string = 'password';
  passwordIcon: string = 'fa fa-eye-slash'; // Font Awesome icon

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
  }

  ngOnInit(): void { 
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
    }
  }

  onRegister() {
    // error handling for invalid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerObj.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // error handling for password shorter than 6 chars
    if (this.registerObj.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // error handling for incomplete registration details
    if (!this.registerObj.name || !this.registerObj.email || !this.registerObj.password) {
      alert('Please fill in all fields.');
      return;
    }

    // check for existing user
    const existingUser = this.users.find((user) => user.email === this.registerObj.email);
    if (existingUser) {
      alert('Email already exists.');
      return;
    }

    this.users.push({ ...this.registerObj });
    localStorage.setItem('users', JSON.stringify(this.users));
    alert('Registration successful! Please log in.');

    this.registerObj = {
      name: '',
      email: '',
      password: '',
    };
    this.router.navigate(['/register-login']);
  }

  onLogin() {
    const user = this.users.find(user => user.email === this.loginObj.email);
    if (!user) {
      alert('Invalid email or password.');
      return;
    }
    if (user.password !== this.loginObj.password) {
      alert('Incorrect password');
      return;
    } 

    // Store login session in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // Redirect to dashboard
    this.router.navigate(['/dev-dashboard']);
  }
}
