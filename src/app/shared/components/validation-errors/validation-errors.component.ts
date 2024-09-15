import { KeyValuePipe } from '@angular/common';
import {
  Component,
  effect,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'validation-errors',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.scss',
})
export class ValidationErrorsComponent implements OnChanges {
  @Input() errors: Record<string, ValidationErrors> | null = {};
  @Input() customErrorMessages: Record<string, string> = {};
  errorMessages: Record<string, string> = {
    required: 'This field is required',
  };
  // constructor() {
  //   effect(() => {
  //     console.log(this.customErrorMessages);
  //   });
  // }
  ngOnChanges(changes: SimpleChanges): void {
    const { customErrorMessages } = changes;
    if (customErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...customErrorMessages.currentValue,
      };
    }
  }
}
