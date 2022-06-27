import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export type ContactRequest = {
  readonly personalData: PersonalData;
  readonly requestType: any;
  readonly text: string;
};

export type PersonalData = {
  readonly email: string;
  readonly mobile: string;
  readonly country: string;
};

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public constructor(private readonly formBuilder: FormBuilder) {}

  public contactForm: FormGroup = this.createFormGroup();

  public countries: string[] = ['USA', 'Germany', 'Italy', 'France'];
  public requestTypes: string[] = ['Claim', 'Feedback', 'Help Request'];

  public ngOnInit(): void {}

  public onSubmit() {
    const result: ContactRequest = structuredClone(this.contactForm.value);

    console.log(result);
  }

  public revert() {
    // Resets to blank object
    this.contactForm.reset();

    // Resets to provided model
    this.contactForm.reset({
      personalData: {
        email: '',
        mobile: '',
        country: '',
      },
      requestType: '',
      text: '',
    });
  }

  public createFormGroup(): FormGroup {
    return this.formBuilder.group({
      personalData: this.formBuilder.group({
        email: new FormControl(),
        mobile: new FormControl(),
        country: new FormControl(),
      }),
      requestType: new FormControl(),
      text: new FormControl(),
    });
  }
}
