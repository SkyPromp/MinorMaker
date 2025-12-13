import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { IUser } from "../model/user.interface";
import { RoleEnum } from "../model/role.enum";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

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
  profileImageUrl: string = "";

  // Image upload
  selectedFile: File | null = null;
  isUploadingImage: boolean = false;
  imagePreview: string | null = null;

  // Loading state for form submission
  isSubmitting: boolean = false;

  // Enum for template access
  RoleEnum = RoleEnum;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private http: HttpClient
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
    this.profileImageUrl = "";
    this.editingUserId = null;
    this.error = "";
    this.selectedFile = null;
    this.imagePreview = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.error = "Please select a valid image file";
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.error = "Image size should be less than 5MB";
        return;
      }

      this.selectedFile = file;
      this.error = "";

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadImage(): Promise<string | null> {
    if (!this.selectedFile) {
      return null;
    }

    this.isUploadingImage = true;
    this.error = "";

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    try {
      const response = await firstValueFrom(
        this.http.post<any>('http://localhost:5000/api/upload-image', formData)
      );

      if (response.success) {
        this.isUploadingImage = false;
        console.log('Image uploaded successfully:', response.url);
        return response.url;
      } else {
        this.error = "Failed to upload image";
        this.isUploadingImage = false;
        return null;
      }
    } catch (err: any) {
      this.error = `Error uploading image: ${err.error?.error || err.message || "Unknown error"}`;
      this.isUploadingImage = false;
      console.error("Error uploading image:", err);
      return null;
    }
  }

  removeImage(): void {
    this.profileImageUrl = "";
    this.selectedFile = null;
    this.imagePreview = null;
  }

  editUser(user: IUser): void {
    this.editingUserId = user.id;
    this.firstname = user.firstName;
    this.lastname = user.lastName;
    this.selectedRole = user.role as unknown as number;
    this.profileImageUrl = (user as any).imageUrl || "";
    this.showAddForm = true;
  }

  async saveUser(): Promise<void> {
    if (!this.firstname.trim() || !this.lastname.trim()) {
      this.error = "Please enter both first name and last name";
      return;
    }

    this.isSubmitting = true;
    this.error = "";

    // If there's a new image selected, upload it first
    let imageUrlToSave = this.profileImageUrl;
    if (this.selectedFile) {
      const uploadedUrl = await this.uploadImage();
      if (uploadedUrl) {
        imageUrlToSave = uploadedUrl;
      } else {
        // Upload failed, stop the save process
        this.isSubmitting = false;
        return;
      }
    }

    // Now save the user with the image URL
    if (this.editingUserId !== null) {
      // Update user
      this.userService
        .updateUser(
          this.editingUserId,
          this.firstname.trim(),
          this.lastname.trim(),
          this.selectedRole,
          imageUrlToSave || null
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
        .addUser(
          this.firstname.trim(),
          this.lastname.trim(),
          this.selectedRole,
          imageUrlToSave || null
        )
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
