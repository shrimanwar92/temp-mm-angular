/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LenderService } from './Lender.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Lender',
	templateUrl: './Lender.component.html',
	styleUrls: ['./Lender.component.css'],
  providers: [LenderService]
})
export class LenderComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  accountBalance = new FormControl("", Validators.required);
  userId = new FormControl("", Validators.required);
  firstname = new FormControl("", Validators.required);
  lastName = new FormControl("", Validators.required);
  email = new FormControl("", Validators.required);
  aadhar = new FormControl("", Validators.required);
  isLender = new FormControl("", Validators.required);
  
  constructor(private serviceLender:LenderService, fb: FormBuilder) {
    this.myForm = fb.group({
      accountBalance:this.accountBalance,
      userId:this.userId,
      firstname:this.firstname,
      lastName:this.lastName,
      email:this.email,
      aadhar:this.aadhar,
      isLender:this.isLender
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLender.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.acme.loan.Lender",
      "accountBalance":this.accountBalance.value,
      "userId":this.userId.value,
      "firstname":this.firstname.value,
      "lastName":this.lastName.value,
      "email":this.email.value,
      "aadhar":this.aadhar.value,
      "isLender":this.isLender.value
    };

    this.myForm.setValue({
      "accountBalance":null,
      "userId":null,
      "firstname":null,
      "lastName":null,
      "email":null,
      "aadhar":null,
      "isLender":null
    });

    return this.serviceLender.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
          "accountBalance":null,
          "userId":null,
          "firstname":null,
          "lastName":null,
          "email":null,
          "aadhar":null,
          "isLender":null
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.acme.loan.Lender",
      "accountBalance":this.accountBalance.value,
      "firstname":this.firstname.value,
      "lastName":this.lastName.value,
      "email":this.email.value,
      "aadhar":this.aadhar.value,
      "isLender":this.isLender.value
    };

    return this.serviceLender.updateParticipant(form.get("userId").value,this.participant)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceLender.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceLender.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        "accountBalance":null,
        "userId":null,
        "firstname":null,
        "lastName":null,
        "email":null,
        "aadhar":null,
        "isLender":null
      };
      
      if(result.accountBalance){
        
          formObject.accountBalance = result.accountBalance;
        
      }else{
        formObject.accountBalance = null;
      }
    
      if(result.userId){
        
          formObject.userId = result.userId;
        
      }else{
        formObject.userId = null;
      }
    
      if(result.firstname){
        
          formObject.firstname = result.firstname;
        
      }else{
        formObject.firstname = null;
      }
    
      if(result.lastName){
        
          formObject.lastName = result.lastName;
        
      }else{
        formObject.lastName = null;
      }
    
      if(result.email){
        
          formObject.email = result.email;
        
      }else{
        formObject.email = null;
      }
    
      if(result.aadhar){
        
          formObject.aadhar = result.aadhar;
        
      }else{
        formObject.aadhar = null;
      }
    
      if(result.isLender){
        
          formObject.isLender = result.isLender;
        
      }else{
        formObject.isLender = null;
      }
      
      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
        "accountBalance":null,
        "userId":null,
        "firstname":null,
        "lastName":null,
        "email":null,
        "aadhar":null,        
        "isLender":null
    });
  }

}
