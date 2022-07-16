import { Component } from '@angular/core';
import { CommonApiService } from './services/common.api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logo: string ='../assets/images/agence-logo.png';
  title = 'Agence';
  current: any= 1;
  current1: any;
  source : string[] = [];
	target = [];

  constructor(
    private commonApiService: CommonApiService,
  ) { }

  ngOnInit() {
    this.getConsultores();
    }

  setCurrent(value:any){
    if(value ==1){
      this.current = 1;
    }
    if(value ==2){
      this.current = 2;
    }
  }
  setCurrent1(value:any){
    if(value ==1){
      this.current1 = 1;
    }
    if(value ==2){
      this.current1 = 2;
    }
    if(value ==3){
      this.current1 = 3;
    }
  }

  getConsultores() {
    this.commonApiService.getAllConsultores().subscribe(result => {
      for(var i in result)
      this.source.push(result [i].no_usuario);
      console.log('Consultores obtenidos', this.source);
  
    }, err => {
      console.log('Erro ao obter os dados (conexion fail frontend-backend)', err);
    });
  }
}
