import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Item {
  value: string;
  label: string;
}

@Component({
  selector: 'app-selectinput',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './selectinput.component.html',
  styleUrls: ['./selectinput.component.scss'] // Fixed styleUrl to styleUrls
})
export class SelectinputComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() placeholder: string = '';
  @Input() options: Item[] = [];
  @Input() disabled: boolean = false;
  @Input() value: string | number = '';
  @Input() class: string = '';
  @Input() style: object = {};
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() validationMessages: { [key: string]: string } = {};
  
  @Output() valueChange = new EventEmitter<any>();

  formControl = new FormControl();

  ngOnInit() {   
    this.formControl.setValue(this.value); 
    this.formControl.updateValueAndValidity();
  }


  handleSelectChange(event: any): void {
    const selectedValue = event.value;
    this.value = selectedValue;
    this.valueChange.emit({target:{name:this.name , value:this.value}}); 
  }
}
