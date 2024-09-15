import { NgIf } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ControleValueAccessorDirective } from 'app/shared/directives/controle-value-accessor.directive';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
type InputType = 'text' | 'number' | 'email' | 'password' | 'color';

@Component({
  selector: 'base-input',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    ValidationErrorsComponent,
  ],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInputComponent),
      multi: true,
    },
  ],
})
export class BaseInputComponent<T> extends ControleValueAccessorDirective<T> {
  @Input() inputId = '';
  @Input() required = '';
  @Input() type: InputType = 'text';
  @Input() label = '';
  @Input() customErrorMessages: Record<string, string> = {};
}
