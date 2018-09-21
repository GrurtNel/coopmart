import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entry-screen',
  templateUrl: './entry-screen.component.html',
  styleUrls: ['./entry-screen.component.css']
})
export class EntryScreenComponent implements OnInit {

  @Output('scanQrcode') scanQrcode = new EventEmitter()
  constructor() { }
  value = '';
  employee: Employee
  onEnter(box: HTMLInputElement) {
    this.value = box.value
    console.log('url ', box.value)
    box.value = ''
  }

  ngOnInit() {
    let value = ''
    document.body.onkeypress = (event) => {
      value += event.key
      if (event.keyCode == 13) {
        this.value = value.replace('Enter', '')
        value = ''
        this.employee = parseQRCode(this.value)
        this.scanQrcode.emit(this.employee)
      }
    }
  }
}

function parseQRCode(qrcode: string) {
  const qrcodeArr = qrcode.split(',')
  var employee = <Employee>{}
  employee.name = qrcodeArr[0].split(':')[1]
  employee.dept = qrcodeArr[1].split(':')[1]
  employee.donvi = qrcodeArr[2].split(':')[1]
  employee.seat = qrcodeArr[3].split(':')[1]
  return employee
}

export interface Employee {
  name: string
  dept: string
  donvi: string
  seat: string
}

