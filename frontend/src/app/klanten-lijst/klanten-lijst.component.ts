import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { IUser } from "../model/user.interface";
import { RoleEnum } from "../model/role.enum";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-klanten-lijst",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./klanten-lijst.component.html",
  styleUrl: "./klanten-lijst.component.css",
})
export class KlantenLijstComponent implements OnInit {
  users: IUser[] = [];
  isLoading: boolean = true;
  error: string = "";
  showAddForm: boolean = false;

  // Form fields
  firstname: string = "";
  lastname: string = "";
  selectedRole: number = RoleEnum.CLIENT;

  // Loading state for form submission
  isSubmitting: boolean = false;

  // Enum for template access
  RoleEnum = RoleEnum;

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (res) => {
        if (res.status === "ok") {
          if (res.data.length > 0) {
            this.users = res.data;
          } else {
            this.users = this.apiService.getUsers();
          }
          this.isLoading = false;
        } else {
          this.error = "Failed to load users";
          this.isLoading = false;
          this.users = this.apiService.getUsers();
        }
      },
      error: (err) => {
        this.error = "Error loading users from server";
        this.isLoading = false;
        this.users = this.apiService.getUsers();
        console.error("Error fetching users:", err);
      },
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.firstname = "";
    this.lastname = "";
    this.selectedRole = RoleEnum.CLIENT;
    this.error = "";
  }

  addUser(): void {
    if (!this.firstname.trim() || !this.lastname.trim()) {
      this.error = "Please enter both first name and last name";
      return;
    }

    this.isSubmitting = true;

    this.userService
      .addUser(this.firstname.trim(), this.lastname.trim(), this.selectedRole)
      .subscribe({
        next: (res) => {
          if (res.status === "ok" && res.data) {
            this.users.push(res.data);
            this.resetForm();
            this.showAddForm = false;
            this.isSubmitting = false;
          } else {
            this.error = "Failed to create user";
            this.isSubmitting = false;
          }
        },
        error: (err) => {
          this.error = `Error creating user: ${
            err.error?.error || err.message || "Unknown error"
          }`;
          this.isSubmitting = false;
          console.error("Error adding user:", err);
        },
      });
  }

  getRoleName(role: number): string {
    return RoleEnum[role];
  }
}
