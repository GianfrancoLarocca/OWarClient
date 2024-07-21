import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {

  @Input()
  errorMessage: string = '';
  @Input() isVisible: boolean = false;
}
