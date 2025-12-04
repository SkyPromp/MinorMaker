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
  editingUserId: number | null = null;

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
    this.editingUserId = null;
    this.error = "";
  }

  editUser(user: IUser): void {
    this.editingUserId = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.selectedRole = user.role as unknown as number;
    this.showAddForm = true;
  }

  saveUser(): void {
    if (!this.firstname.trim() || !this.lastname.trim()) {
      this.error = "Please enter both first name and last name";
      return;
    }

    this.isSubmitting = true;

    if (this.editingUserId !== null) {
      // Update user
      this.userService
        .updateUser(
          this.editingUserId,
          this.firstname.trim(),
          this.lastname.trim(),
          this.selectedRole
        )
        .subscribe({
          next: (res) => {
            if (res.status === "ok" && res.data) {
              const index = this.users.findIndex(
                (u) => u.id === this.editingUserId
              );
              if (index > -1) {
                this.users[index] = res.data;
              }
              this.resetForm();
              this.showAddForm = false;
              this.isSubmitting = false;
            } else {
              this.error = "Failed to update user";
              this.isSubmitting = false;
            }
          },
          error: (err) => {
            this.error = `Error updating user: ${
              err.error?.error || err.message || "Unknown error"
            }`;
            this.isSubmitting = false;
            console.error("Error updating user:", err);
          },
        });
    } else {
      // Add new user
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
  }

  deleteUser(userId: number): void {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    this.isSubmitting = true;

    this.userService.deleteUser(userId).subscribe({
      next: (res) => {
        if (res.status === "ok") {
          this.users = this.users.filter((u) => u.id !== userId);
          this.isSubmitting = false;
        } else {
          this.error = "Failed to delete user";
          this.isSubmitting = false;
        }
      },
      error: (err) => {
        this.error = `Error deleting user: ${
          err.error?.error || err.message || "Unknown error"
        }`;
        this.isSubmitting = false;
        console.error("Error deleting user:", err);
      },
    });
  }

  cancelEdit(): void {
    this.resetForm();
    this.showAddForm = false;
  }

  getRoleName(role: number): string {
    return RoleEnum[role];
  }
}
