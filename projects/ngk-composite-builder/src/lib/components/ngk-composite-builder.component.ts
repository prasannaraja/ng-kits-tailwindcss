import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUI, Group, FIELD_TYPE } from '../models';

@Component({
  selector: 'ngk-composite-builder',
  templateUrl: './ngk-composite-builder.component.html',
  styleUrls: ['./ngk-composite-builder.component.scss'],
})
export class NgkCompositeBuilderComponent implements OnInit {
  @Input()
  formUi!: FormUI;

  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.generateForm();
  }

  addGroup(groupName: string): void {
    const newGroup = new FormGroup({});
    this.form.addControl(groupName, newGroup);
  }

  addField(groupName: string, fieldName: string, validators: []): void {
    const group = this.form.get(groupName) as FormGroup;
    const formControl = this.formBuilder.control(null, validators);
    group.addControl(fieldName, formControl);
  }

  generateForm(): void {
    this.formUi.groups.forEach((group) => {
      this.addGroup(group.name);
      group.fields.forEach((field) => {
        const validators = [];
        if (field.mandatory) {
          validators.push(Validators.required);
        }
        this.addField(group.name, field.name, []);
      });
    });
  }

  get groups(): Group[] {
    return this.formUi.groups;
  }

  get fieldType() {
    return FIELD_TYPE;
  }
}
