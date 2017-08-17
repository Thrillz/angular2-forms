import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  form: FormGroup;

  formErrors = {
    name: '',
    username: '',
    addresses: [
      { city: '', country: ''}
    ]
  };

  validationMessages = {
    name: {
      required: "Name is required",
      minlength: "Name must be at least 3 characters .",
      maxlength: "Name must not be more than 9 characters ."
    },
    username: {
      required: "Username is required.",
      minlength: "Username must be at least 3 characters long."
    },
    addresses: {
      city: {
        required: "City is required.",
        minlength: "City must be 3 characters long."
      },
      country: {
        required: "Country is required."
      }
    }
  };

  constructor(private fb: FormBuilder) {  }

  ngOnInit() {
    // build the data model for our form
    this.buildForm();
  }

  // build the initial form
  buildForm () {
    // build the form
    this.form = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(9)]],
      username: ['', [Validators.minLength(3)]],
      addresses: this.fb.array([
        this.createAddress()
      ])
    });

    console.log(this.form);

    // watch for changes and validate
    this.form.valueChanges.subscribe(data => this.validateForm());

  }

  // validate the entire form
  validateForm() {

    // loop over the form errors field names
    for (let field in this.formErrors) {

      //clear input field errors
      this.formErrors[field] = '';

      //grab input field by name
      let input = this.form.get(field);

      if (input.invalid && input.dirty) {

        //figure out the type of error
        for (let errors in input.errors) {

          //assign that type of error message to a variable
          this.formErrors[field] = this.validationMessages[field][errors];
        }
      }

    }

    this.validateAddresses();

  }

  // validate addresses description
  validateAddresses() {
    // grab the addresses form array
    let addresses = <FormArray>this.form.get('addresses');

    // clear the formerrors
    this.formErrors.addresses = [];

    // loop through formgroups in array
    let n = 1;
    while (n <= addresses.length) {

      //clear errors again
      this.formErrors.addresses.push({ city: '', country: ''});

      // grab the specific group (address)
      let address = <FormGroup>addresses.at(n-1);

      //validate that specific group
      //loop through the form controls
      for (let field in address.controls) {

        //get the form control
        let input = address.get(field);

        // do validation and save errors to form errors
        if (input.invalid && input.errors) {
          for (let error in input.errors) {
            this.formErrors.addresses[n-1][field] = this.validationMessages.addresses[field][error];
          }
        }
      }

      n++;
    }
  }

  processForm() {
    console.log("processing", this.form.value);
  }

  createAddress() {
    return this.fb.group({
      city: ['', Validators.minLength(3)],
      country: ['']
    })
  }

  // add a new address
  addAddress() {
    let addresses = <FormArray>this.form.get('addresses');
    addresses.push(this.createAddress());
  }

  // remove addresses
  removeAddress(i) {
    let addresses = <FormArray>this.form.get('addresses');
    addresses.removeAt(i);
  }

}
