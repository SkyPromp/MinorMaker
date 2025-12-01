import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { IUser } from "../model/user.interface";
import { RoleEnum } from "../model/role.enum";
import { CurrentSurveyService } from "../services/current-survey.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgIf, NgFor } from "@angular/common";
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.css'
})
export class UserSelectComponent implements OnInit {

  users: IUser[] = [];
  searchTerm: string = "";
  sortColumn: keyof IUser = "firstname";
  sortDirection: 'asc' | 'desc' = 'asc';
  isLoading: boolean = true;
  error: string = '';
  showFallbackData: boolean = false;

  constructor(
    private userService: UserService,
    protected currentSurveyService: CurrentSurveyService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.error = '';
    this.showFallbackData = false;

    this.userService.getAll().pipe(
      catchError(err => {
        console.error('Error fetching users from API:', err);
        this.showFallbackData = true;
        this.useFallbackData();
        return of({ data: [], status: 'error', error: err.message });
      })
    ).subscribe({
      next: (res) => {
        if (res.status === 'ok' && res.data && res.data.length > 0) {
          this.users = res.data;
          this.showFallbackData = false;
        } else {
          // If API returns empty or error, use fallback
          console.warn('API returned empty or error response, using fallback data');
          this.useFallbackData();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Subscription error:', err);
        this.useFallbackData();
        this.isLoading = false;
      }
    });
  }

  private useFallbackData() {
    this.showFallbackData = true;
    this.users = [
      {
        id: -1,
        firstname: "John",
        lastname: "Doe",
        role: RoleEnum.CLIENT
      },
      {
        id: -2,
        firstname: "Jane",
        lastname: "Doe",
        role: RoleEnum.CLIENT
      },
      {
        id: -3,
        firstname: "Maximilian",
        lastname: "Fitzpatrick",
        role: RoleEnum.CLIENT
      },
      {
        id: -4,
        firstname: "Albert",
        lastname: "Zorro",
        role: RoleEnum.CLIENT
      },
    ];
  }

  selectUser(user: IUser) {
    this.currentSurveyService.setCurrentUser(user);
  }

  isActive(user: IUser): boolean {
    let selectedUser = this.currentSurveyService.getCurrentUser();
    if (!selectedUser) {
      return false;
    }
    return selectedUser.id == user.id;
  }

  get filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    let users = this.users.filter(user =>
      user.firstname.toLowerCase().includes(term) || user.lastname.toLowerCase().includes(term)
    );

    if (this.sortColumn) {
      users = users.sort((a, b) => {
        const aValue = (a[this.sortColumn] || '').toString().toLowerCase();
        const bValue = (b[this.sortColumn] || '').toString().toLowerCase();

        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return users;
  }

  sortBy(column: keyof IUser) {
    if (this.sortColumn == column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  startSurvey() {
    if (this.currentSurveyService.getCurrentUser()) {
      this.router.navigate(['/questions-select']);
    }
  }

  retryLoadUsers() {
    this.loadUsers();
  }
}