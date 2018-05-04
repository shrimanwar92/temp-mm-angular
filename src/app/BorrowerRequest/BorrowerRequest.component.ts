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
import { BorrowerRequestService } from './BorrowerRequest.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-BorrowerRequest',
	templateUrl: './BorrowerRequest.component.html',
	styleUrls: ['./BorrowerRequest.component.css'],
  providers: [BorrowerRequestService]
})
export class BorrowerRequestComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          requestId = new FormControl("", Validators.required);
        
  
      
          amountRequested = new FormControl("", Validators.required);
        
  
      
          amountFulfilled = new FormControl("", Validators.required);
        
  
      
          amountRepaid = new FormControl("", Validators.required);
        
  
      
          loanRequirementPurpose = new FormControl("", Validators.required);
        
  
      
          durationOfLoanInMonths = new FormControl("", Validators.required);
        
  
      
          isDone = new FormControl("", Validators.required);
        
  
      
          isRepaid = new FormControl("", Validators.required);
        
  
      
          borrower = new FormControl("", Validators.required);
        
  


  constructor(private serviceBorrowerRequest:BorrowerRequestService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          requestId:this.requestId,
        
    
        
          amountRequested:this.amountRequested,
        
    
        
          amountFulfilled:this.amountFulfilled,
        
    
        
          amountRepaid:this.amountRepaid,
        
    
        
          loanRequirementPurpose:this.loanRequirementPurpose,
        
    
        
          durationOfLoanInMonths:this.durationOfLoanInMonths,
        
    
        
          isDone:this.isDone,
        
    
        
          isRepaid:this.isRepaid,
        
    
        
          borrower:this.borrower
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceBorrowerRequest.getAll()
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
      $class: "org.acme.loan.BorrowerRequest",
      
        
          "requestId":this.requestId.value,
        
      
        
          "amountRequested":this.amountRequested.value,
        
      
        
          "amountFulfilled":this.amountFulfilled.value,
        
      
        
          "amountRepaid":this.amountRepaid.value,
        
      
        
          "loanRequirementPurpose":this.loanRequirementPurpose.value,
        
      
        
          "durationOfLoanInMonths":this.durationOfLoanInMonths.value,
        
      
        
          "isDone":this.isDone.value,
        
      
        
          "isRepaid":this.isRepaid.value,
        
      
        
          "borrower":this.borrower.value
        
      
    };

    this.myForm.setValue({
      
        
          "requestId":null,
        
      
        
          "amountRequested":null,
        
      
        
          "amountFulfilled":null,
        
      
        
          "amountRepaid":null,
        
      
        
          "loanRequirementPurpose":null,
        
      
        
          "durationOfLoanInMonths":null,
        
      
        
          "isDone":null,
        
      
        
          "isRepaid":null,
        
      
        
          "borrower":null
        
      
    });

    return this.serviceBorrowerRequest.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "requestId":null,
        
      
        
          "amountRequested":null,
        
      
        
          "amountFulfilled":null,
        
      
        
          "amountRepaid":null,
        
      
        
          "loanRequirementPurpose":null,
        
      
        
          "durationOfLoanInMonths":null,
        
      
        
          "isDone":null,
        
      
        
          "isRepaid":null,
        
      
        
          "borrower":null 
        
      
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
      $class: "org.acme.loan.BorrowerRequest",
      
        
          
        
    
        
          
            "amountRequested":this.amountRequested.value,
          
        
    
        
          
            "amountFulfilled":this.amountFulfilled.value,
          
        
    
        
          
            "amountRepaid":this.amountRepaid.value,
          
        
    
        
          
            "loanRequirementPurpose":this.loanRequirementPurpose.value,
          
        
    
        
          
            "durationOfLoanInMonths":this.durationOfLoanInMonths.value,
          
        
    
        
          
            "isDone":this.isDone.value,
          
        
    
        
          
            "isRepaid":this.isRepaid.value,
          
        
    
        
          
            "borrower":this.borrower.value
          
        
    
    };

    return this.serviceBorrowerRequest.updateParticipant(form.get("requestId").value,this.participant)
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

    return this.serviceBorrowerRequest.deleteParticipant(this.currentId)
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

    return this.serviceBorrowerRequest.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "requestId":null,
          
        
          
            "amountRequested":null,
          
        
          
            "amountFulfilled":null,
          
        
          
            "amountRepaid":null,
          
        
          
            "loanRequirementPurpose":null,
          
        
          
            "durationOfLoanInMonths":null,
          
        
          
            "isDone":null,
          
        
          
            "isRepaid":null,
          
        
          
            "borrower":null 
          
        
      };



      
        if(result.requestId){
          
            formObject.requestId = result.requestId;
          
        }else{
          formObject.requestId = null;
        }
      
        if(result.amountRequested){
          
            formObject.amountRequested = result.amountRequested;
          
        }else{
          formObject.amountRequested = null;
        }
      
        if(result.amountFulfilled){
          
            formObject.amountFulfilled = result.amountFulfilled;
          
        }else{
          formObject.amountFulfilled = null;
        }
      
        if(result.amountRepaid){
          
            formObject.amountRepaid = result.amountRepaid;
          
        }else{
          formObject.amountRepaid = null;
        }
      
        if(result.loanRequirementPurpose){
          
            formObject.loanRequirementPurpose = result.loanRequirementPurpose;
          
        }else{
          formObject.loanRequirementPurpose = null;
        }
      
        if(result.durationOfLoanInMonths){
          
            formObject.durationOfLoanInMonths = result.durationOfLoanInMonths;
          
        }else{
          formObject.durationOfLoanInMonths = null;
        }
      
        if(result.isDone){
          
            formObject.isDone = result.isDone;
          
        }else{
          formObject.isDone = null;
        }
      
        if(result.isRepaid){
          
            formObject.isRepaid = result.isRepaid;
          
        }else{
          formObject.isRepaid = null;
        }
      
        if(result.borrower){
          
            formObject.borrower = result.borrower;
          
        }else{
          formObject.borrower = null;
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
      
        
          "requestId":null,
        
      
        
          "amountRequested":null,
        
      
        
          "amountFulfilled":null,
        
      
        
          "amountRepaid":null,
        
      
        
          "loanRequirementPurpose":null,
        
      
        
          "durationOfLoanInMonths":null,
        
      
        
          "isDone":null,
        
      
        
          "isRepaid":null,
        
      
        
          "borrower":null 
        
      
      });
  }

}
