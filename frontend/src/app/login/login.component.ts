import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin(): void {
    if (this.api.login(this.username, this.password)) {
      this.errorMessage = '';
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Ongeldige gebruikersnaam of wachtwoord.';
    }
  }

}
