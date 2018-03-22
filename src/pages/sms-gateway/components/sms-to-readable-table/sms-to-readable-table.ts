import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the SmsToReadableTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sms-to-readable-table',
  templateUrl: 'sms-to-readable-table.html'
})
export class SmsToReadableTableComponent implements OnInit {
  @Input() dataElements;
  @Input() smsCommandMapper;

  constructor() {}
  ngOnInit() {
    console.log(JSON.stringify(this.smsCommandMapper));
  }
}
