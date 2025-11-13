import { Component } from '@angular/core';
import { ApiService, User } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-klanten-lijst',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './klanten-lijst.component.html',
  styleUrl: './klanten-lijst.component.css'
})
export class KlantenLijstComponent {
   users: User[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.users = this.api.getUsers();
  }

}
