import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      identificationType: [null, Validators.required],
      identificationNumber: [null, Validators.required],
      kindPerson: [null, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      businessName: ['', Validators.required],
      email: ['', Validators.email],
      address: ['', Validators.required]
    });

    this.formControlValueChanged();
  }

  formControlValueChanged() {
    const firstNameControl = this.form.get('firstName');
    const lastNameControl = this.form.get('lastName');
    const businessNameControl = this.form.get('businessName');
    const identificationType = this.form.get('identificationType');

    identificationType.valueChanges.subscribe(
        (value: string) => {
          if(value === 'NIT') {
            firstNameControl.clearValidators();
            lastNameControl.clearValidators();
            businessNameControl.setValidators([Validators.required]);
          }
          else {
            firstNameControl.setValidators([Validators.required]);
            lastNameControl.setValidators([Validators.required]);
            businessNameControl.clearValidators();
          }

          firstNameControl.updateValueAndValidity();
          lastNameControl.updateValueAndValidity();
          businessNameControl.updateValueAndValidity();
        });
  }

  get f() {
    return this.form.controls;
  }

  setKindPerson() {
    if(this.f.identificationType.value === 'NIT') {
      this.f.kindPerson.setValue('PJ');
    }
    else {
      this.f.kindPerson.setValue('PN');
    }
  }

  onSubmit() {
    this.submitted = true;

    if(!this.form.valid) {
      return;
    }

    alert("Formulario enviado exitosamente");
    this.form.reset();
  }
}
