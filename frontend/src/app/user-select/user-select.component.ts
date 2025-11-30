import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {IUser} from "../model/user.interface";
import {RoleEnum} from "../model/role.enum";
import {CurrentSurveyService} from "../services/current-survey.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.css'
})
export class UserSelectComponent implements OnInit {

  users: IUser[] = [];
  searchTerm: string = "";
  sortColumn: keyof IUser = "firstname";
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private userService: UserService,
    protected currentSurveyService: CurrentSurveyService,
    private router: Router,
  ) { }

  ngOnInit() {
    // ToDo: Switch back to use of API
    // this.userService.getAllClients().subscribe(res => {
    //   this.users = res.data;
    // })

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

  selectUser(user :IUser) {
    this.currentSurveyService.setCurrentUser(user);
  }

  isActive(user :IUser) : boolean {
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
        const aValue = (a[this.sortColumn]);
        const bValue = (b[this.sortColumn]);

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
    this.router.navigate(['/questions-select']);
  }

}
