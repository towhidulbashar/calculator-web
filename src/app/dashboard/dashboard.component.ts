import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Summation, SummationHistory } from './dashboard.interface';
import { SummationService } from "./dashboard.service";
import { Table } from "primeng/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {  
  userform: FormGroup = this.fb.group({
    'firstNumber': ['', [Validators.required ]],
    'secondNumber': ['', [Validators.required]],
    'userName': ['', [ Validators.minLength(4)]]
  });
  summationResult: Summation[]
  cols: any[] = [
    { field: 'firstNumber', header: 'First Number' },
    { field: 'secondNumber', header: 'Second Number' },
    { field: 'result', header: 'Result' },
    { field: 'userName', header: 'User Name' },
    { field: 'calculationDate', header: 'Calculation Date' }
];

  constructor(private fb: FormBuilder,
    private messageService: MessageService, 
    private summationService: SummationService)
  { }

  ngOnInit() { 
    this.showResult();
  } 
  
  private showResult() {
    this.summationService.GetSummationResult()
      .subscribe(result => {
        this.summationResult = result;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to load summation result.` });
        console.log('saveResult error: ', error);
      });
  }

  saveResult(summation: Summation) {
    this.summationService.SumAndSave(summation)
      .subscribe(result => {
        this.showResult();
        this.userform.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Result saved.` });         
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to save result.` });         
          console.log('saveResult error: ', error);
        });
  }
  
  whiteSpaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
