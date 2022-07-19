import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  @Input() target:any;
  @Input() reportData:any;
  @Input() months:any;
  @Input() reportSaldo:any;
  constructor() { }

  ngOnInit(): void {
  }

}
