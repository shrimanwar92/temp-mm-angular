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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { LoanComponent } from './Loan/Loan.component';


  import { BorrowerRequestComponent } from './BorrowerRequest/BorrowerRequest.component';
  import { BorrowerComponent } from './Borrower/Borrower.component';
  import { LenderComponent } from './Lender/Lender.component';


  import { CreditLoanComponent } from './CreditLoan/CreditLoan.component';
  import { RepayLoanComponent } from './RepayLoan/RepayLoan.component';
  import { RequestLoanComponent } from './RequestLoan/RequestLoan.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Loan', component: LoanComponent},
    
    
      { path: 'BorrowerRequest', component: BorrowerRequestComponent},
      
      { path: 'Borrower', component: BorrowerComponent},
      
      { path: 'Lender', component: LenderComponent},
      
      
        { path: 'CreditLoan', component: CreditLoanComponent},
        
        { path: 'RepayLoan', component: RepayLoanComponent},
        
        { path: 'RequestLoan', component: RequestLoanComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
