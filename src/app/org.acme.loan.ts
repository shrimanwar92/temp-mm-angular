import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.loan{
   export class BorrowerRequest extends Participant {
      requestId: string;
      amountRequested: number;
      amountFulfilled: number;
      amountRepaid: number;
      loanRequirementPurpose: string;
      durationOfLoanInMonths: number;
      isDone: boolean;
      isRepaid: boolean;
      borrower: Borrower;
   }
   export abstract class User extends Participant {
      userId: string;
      firstname: string;
      lastName: string;
      email: string;
      aadhar: string;
      isLender: boolean;
   }
   export class Lender extends User {
      accountBalance: number;
   }
   export class LenderDetails {
      lender: Lender;
      amount: number;
      repaid: number;
   }
   export class Borrower extends User {
      accountBalance: number;
      total: number;
      success: number;
      fail: number;
   }
   export class Loan extends Asset {
      loanId: string;
      borrowerRequest: BorrowerRequest;
      lenders: LenderDetails[];
      startDate: Date;
      endDate: Date;
   }
   export class CreditLoan extends Transaction {
      loan: Loan;
      borrowerRequest: BorrowerRequest;
      lender: Lender;
      amount: number;
   }
   export class RepayLoan extends Transaction {
      loan: Loan;
      borrowerRequest: BorrowerRequest;
      lender: Lender;
      amount: number;
   }
   export class RequestLoan extends Transaction {
      amountRequested: number;
      loanRequirementPurpose: string;
      durationOfLoanInMonths: number;
      borrower: Borrower;
   }
// }
