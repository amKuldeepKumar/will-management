import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldAppearance, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textinput',
  standalone: true,
  imports: [MatLabel, CommonModule, MatFormField, MatInputModule, MatFormFieldModule, MatError, FormsModule, ReactiveFormsModule],
  templateUrl: './textinput.component.html',
  styleUrls: ['./textinput.component.scss']
})
export class TextinputComponent {

  // Input properties
  @Input() label: string = ''; // For dynamic label
  @Input() name: string = ''; // For dynamic name
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() placeholder: string = ''; // For dynamic placeholder
  @Input() type: string = 'text'; // For dynamic input type
  @Input() value: string = ''; // For dynamic initial value
  @Input() class: string = ''; // For adding dynamic CSS class
  @Input() style: object = {}; // For dynamic inline styles
  @Input() disabled: boolean = false; // For handling disabled state
  @Input() readonly: boolean = false; // For handling readonly state
  @Input() required: boolean = false; // For handling readonly state

  @Input() validationMessages: { [key: string]: string } = {};

  // Output event to emit value changes
  @Output() valueChanged = new EventEmitter<any>();

  formControl = new FormControl('',);

  ngOnInit() {
    if (this.value) {
      this.formControl.setValue(this.value);
    }

    if (this.required) {
      this.formControl.addValidators(Validators.required);
      if (this.type === 'email') {
        this.formControl.addValidators(Validators.email);
      }
    }

    this.formControl.updateValueAndValidity();
  }

  onInputChange(event: any): void {
    this.valueChanged.emit(event);
  }

  getErrorMessage(errorKey: string): string {
    return this.validationMessages[errorKey] || '';
  }

  getValidationKeys(): string[] {
    return Object.keys(this.formControl.errors || {});
  }
}
