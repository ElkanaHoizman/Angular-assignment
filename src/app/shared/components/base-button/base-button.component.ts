import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'base-btn',
  standalone: true,
  imports: [MatButtonModule, NgIf],
  templateUrl: './base-button.component.html',
  styleUrl: './base-button.component.scss',
})
export class BaseButtonComponent implements OnInit {
  @Input() buttonText?: string;
  @Input() buttonSubmit = false;
  @Input() color?: string = '#007AF9';

  buttonType?: string;

  @Input() isDisabled?: boolean;
  @Output() buttonEmit: EventEmitter<any>;
  constructor() {
    this.buttonEmit = new EventEmitter<any>();
    this.buttonType = this.buttonSubmit ? `submit` : `button`;
  }
  ngOnInit() {
    this.buttonText = this.buttonText ? this.buttonText : `No buttonText`;
  }

  onClick(): any {
    if (this.isDisabled) {
      return;
    } else {
      this?.buttonEmit.emit(true);
    }
  }
}
