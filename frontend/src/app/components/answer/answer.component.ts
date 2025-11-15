import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'k':
      case 'K':
        this.registerAnswer('happy')
        break;
      case 'l':
      case 'L':
        this.registerAnswer('neutral')
        break;
      case 'm':
      case 'M':
        this.registerAnswer('angry')
        break;
    }
  }

  registerAnswer(answer :string) {
    console.log(answer);
  }

}
