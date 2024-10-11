import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';

interface Item {
  value: string | number;
  label: string;
}
@Component({
  selector: 'app-radioinput',
  standalone: true,
  imports: [CommonModule, MatRadioModule,MatLabel, FormsModule , FormsModule],
  templateUrl: './radioinput.component.html',
  styleUrl: './radioinput.component.scss'
})
export class RadioinputComponent {
  @Input() label: string = '';
  @Input() options: Item[] = []; // Radio button options
  @Input() name: string = '';
  @Input() value: string | number = ''; // To bind with the selected value
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<any>();

  handleRadioChange(event: any): void {
    const selectedValue = event.value;
    this.valueChange.emit({target:{name:this.name , value:this.value}}); 

  }
}
