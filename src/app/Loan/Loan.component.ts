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
import { LoanService } from './Loan.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Loan',
	templateUrl: './Loan.component.html',
	styleUrls: ['./Loan.component.css'],
  providers: [LoanService]
})
export class LoanComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          loanId = new FormControl("", Validators.required);
        
  
      
          borrowerRequest = new FormControl("", Validators.required);
        
  
      
          lenders = new FormControl("", Validators.required);
        
  
      
          startDate = new FormControl("", Validators.required);
        
  
      
          endDate = new FormControl("", Validators.required);
        
  


  constructor(private serviceLoan:LoanService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          loanId:this.loanId,
        
    
        
          borrowerRequest:this.borrowerRequest,
        
    
        
          lenders:this.lenders,
        
    
        
          startDate:this.startDate,
        
    
        
          endDate:this.endDate
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLoan.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.loan.Loan",
      
        
          "loanId":this.loanId.value,
        
      
        
          "borrowerRequest":this.borrowerRequest.value,
        
      
        
          "lenders":this.lenders.value,
        
      
        
          "startDate":this.startDate.value,
        
      
        
          "endDate":this.endDate.value
        
      
    };

    this.myForm.setValue({
      
        
          "loanId":null,
        
      
        
          "borrowerRequest":null,
        
      
        
          "lenders":null,
        
      
        
          "startDate":null,
        
      
        
          "endDate":null
        
      
    });

    return this.serviceLoan.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "loanId":null,
        
      
        
          "borrowerRequest":null,
        
      
        
          "lenders":null,
        
      
        
          "startDate":null,
        
      
        
          "endDate":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.loan.Loan",
      
        
          
        
    
        
          
            "borrowerRequest":this.borrowerRequest.value,
          
        
    
        
          
            "lenders":this.lenders.value,
          
        
    
        
          
            "startDate":this.startDate.value,
          
        
    
        
          
            "endDate":this.endDate.value
          
        
    
    };

    return this.serviceLoan.updateAsset(form.get("loanId").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceLoan.deleteAsset(this.currentId)
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

    return this.serviceLoan.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "loanId":null,
          
        
          
            "borrowerRequest":null,
          
        
          
            "lenders":null,
          
        
          
            "startDate":null,
          
        
          
            "endDate":null 
          
        
      };



      
        if(result.loanId){
          
            formObject.loanId = result.loanId;
          
        }else{
          formObject.loanId = null;
        }
      
        if(result.borrowerRequest){
          
            formObject.borrowerRequest = result.borrowerRequest;
          
        }else{
          formObject.borrowerRequest = null;
        }
      
        if(result.lenders){
          
            formObject.lenders = result.lenders;
          
        }else{
          formObject.lenders = null;
        }
      
        if(result.startDate){
          
            formObject.startDate = result.startDate;
          
        }else{
          formObject.startDate = null;
        }
      
        if(result.endDate){
          
            formObject.endDate = result.endDate;
          
        }else{
          formObject.endDate = null;
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
      
        
          "loanId":null,
        
      
        
          "borrowerRequest":null,
        
      
        
          "lenders":null,
        
      
        
          "startDate":null,
        
      
        
          "endDate":null 
        
      
      });
  }

}
