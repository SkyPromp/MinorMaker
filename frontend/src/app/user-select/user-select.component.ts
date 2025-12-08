import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { IUser } from "../model/user.interface";
import { CurrentSurveyService } from "../services/current-survey.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {AnswerService} from "../services/answer.service";

@Component({
  selector: "app-user-select",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./user-select.component.html",
  styleUrl: "./user-select.component.css",
})
export class UserSelectComponent implements OnInit {
  users: IUser[] = [];
  searchTerm: string = "";
  sortColumn: keyof IUser = "firstName";
  sortDirection: 'asc' | 'desc' = 'asc';

  hasActiveSurvey: boolean = false;
  progress = 30 / 40 * 100;

  constructor(
    private userService: UserService,
    protected currentSurveyService: CurrentSurveyService,
    private router: Router,
    private answerService: AnswerService
  ) { }

  ngOnInit() {
    this.userService.getAllClients().subscribe(res => {
      this.users = res.data;
    })
  }

  selectUser(user: IUser) {
    this.currentSurveyService.setCurrentUser(user);
    this.checkActiveSurvey();
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
      (user.firstName?.toLowerCase() || "").includes(term) ||
      (user.lastName?.toLowerCase() || "").includes(term)
    );

    if (this.sortColumn) {
      users = users.sort((a, b) => {
        const aValue = ((a[this.sortColumn] as any)?.toString().toLowerCase() ?? "");
        const bValue = ((b[this.sortColumn] as any)?.toString().toLowerCase() ?? "");

        if (aValue < bValue) return this.sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return users;
  }

  sortBy(column: keyof IUser) {
    if (this.sortColumn == column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }
  }

  startSurvey() {
    if (this.currentSurveyService.getCurrentUser()) {
      this.router.navigate(["/questions-select"]);
    }
  }

  ditchSurvey() {
    // ToDo
  }

  continueSurvey() {
    this.currentSurveyService.setAnswerPoule().subscribe({
      next: (answers) => {
        console.log("Survey resumes with", answers.length, answers.length);
        this.router.navigate(['/survey']);
      },
      error: (err) => {
        console.error("Error loading survey", err);
        // ToDo: Show error message to user
      }
    })
  }

  checkActiveSurvey(): void {
    let activeUser = this.currentSurveyService.getCurrentUser();

    if (activeUser) {
      this.answerService.getCurrentQuestionMomentByUserId(activeUser.id).subscribe(res => {
        this.hasActiveSurvey = res.data != null;
      })
    } else {
      this.hasActiveSurvey = false;
    }
  }
}
