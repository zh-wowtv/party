import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { InjectUser } from 'angular2-meteor-accounts-ui';

import template from './parties-form.component.html';
import { Parties } from '../../../../both/collections/parties.collection';

@Component({
	selector: 'parties-form',
  template
})
@InjectUser('user')
export class PartiesFormComponent implements OnInit {
  addForm : FormGroup;
	user: Meteor.User;
	images: string[] = [];

  constructor(private formBuilder: FormBuilder) {
  }

	ngOnInit() {
		this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      location: ['',Validators.required],
      public: [false]
    })
  }

  addParty() {
    if (!this.user._id) {
			alert('Please login to add party');
      return;
    }

    if (this.addForm.valid) {
      // Parties.insert(Object.assign({},this.addForm.value,{owner:Meteor.userId()}));
      Parties.insert({
				name: this.addForm.value.name,
        description: this.addForm.value.description,
        location: {
          name: this.addForm.value.location
        },
        images: this.images,
        public: this.addForm.value.public,
        owner: this.user._id
      })      
      this.addForm.reset();
    }
  }

  onImage(imageId: string) {
    this.images.push(imageId);
  }
}