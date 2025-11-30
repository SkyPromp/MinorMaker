import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {IUser} from "../model/user.interface";
import {RoleEnum} from "../model/role.enum";
import {User} from "../services/api.service";
import {CurrentSurveyService} from "../services/current-survey.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.css'
})
export class UserSelectComponent implements OnInit {

  users: IUser[] = [];
  userDemo : IUser[] = [
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
  ];

  constructor(
    private userService: UserService,
    protected currentSurveyService: CurrentSurveyService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getAllClients().subscribe(res => {
      this.users = res.data;
    })
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

  startSurvey() {
    this.router.navigate(['/questions-select']);
  }

}
