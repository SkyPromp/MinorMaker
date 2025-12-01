import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../model/user.interface';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-klanten-lijst',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './klanten-lijst.component.html',
  styleUrl: './klanten-lijst.component.css'
})
export class KlantenLijstComponent implements OnInit {
  users: IUser[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private userService: UserService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          if (res.data.length > 0 ) {
            this.users = res.data;
          } else {
            this.users = this.apiService.getUsers();
          }
          this.isLoading = false;
        } else {
          this.error = 'Failed to load users';
          this.isLoading = false;
          this.users = this.apiService.getUsers();
        }
      },
      error: (err) => {
        this.error = 'Error loading users from server';
        this.isLoading = false;
        this.users = this.apiService.getUsers();
        console.error('Error fetching users:', err);
      }
    });
  }
}