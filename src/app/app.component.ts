import { Component } from '@angular/core';
import { Router } from '@angular/router';
/* import { FormBuilder, FormGroup, Validators } from '@angular/forms'; */
import { CommonApiService } from './services/common.api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logo: string = '../assets/images/agence-logo.png';
  current: any = 1;
  current1: any;
  source: string[] = [];
  target = [];
  consultoresData: any;
  currentConsultor: any;
  reportData: any[][] = [];
  reportSaldo: any[] = [];
  reportSalCon: any;
  userType = 'Consultores';
  /*   dataForm: FormGroup; */
  months: any[] = [
    { name: 'Jan', val: '01', id: 1 },
    { name: 'Fev', val: '02', id: 2 },
    { name: 'Mar', val: '03', id: 3 },
    { name: 'Abr', val: '04', id: 4 },
    { name: 'Mai', val: '05', id: 5 },
    { name: 'Jun', val: '06', id: 6 },
    { name: 'Jul', val: '07', id: 7 },
    { name: 'Ago', val: '08', id: 8 },
    { name: 'Set', val: '09', id: 9 },
    { name: 'Out', val: '10', id: 10 },
    { name: 'Nov', val: '11', id: 11 },
    { name: 'Dez', val: '12', id: 12 },
  ];
  years = ['2003', '2004', '2005', '2006', '2007'];
  selected1: any = this.months[0].val;
  selected2: any = this.years[this.years.length - 1];
  selected3: any = this.months[0].val;
  selected4: any = this.years[this.years.length - 1];
  constructor(
    private commonApiService: CommonApiService,
    public router: Router,
    /*     private fb: FormBuilder, */
  ) { }

  ngOnInit() {
    this.getConsultores();
    /*     this.dataForm = this.fb.group({
          monthStart: [this.config.maxAttempts, Validators.required],
          yearStart: [this.config.maxAttempts, Validators.required],
          monthEnd: [this.config.maxAttempts, Validators.required],
          yearEnd: [this.config.maxAttempts, Validators.required],
        }); */
  }

  setCurrent(value: any) {
    if (value == 1) {
      this.current = 1;
      this.userType = 'Consultores';
    }
    if (value == 2) {
      this.current = 2;
      this.userType = 'Clientes';
    }
  };

  getConsultores() {
    this.commonApiService.getConsultores().subscribe(result => {
      this.consultoresData = result;
      for (var i in result)
        this.source.push(result[i].no_usuario);

      /* console.log("consultoresData", this.consultoresData); */
      console.log('Consultores obtenidos'/* , this.source */);

    }, err => {
      console.log('Erro ao obter os dados Consultores(conexion fail frontend-backend)', err);
    });
  };



  getReport() {
    this.current1 = 1;
    this.reportData =[];
    this.currentConsultor=[];
    this.reportSaldo=[];
    for (let index = 0; index < this.target.length; index++) {
      this.currentConsultor = this.consultoresData.filter((x:any) => x.no_usuario == this.target[index]);
      this.commonApiService.getRelatorioDoConsultor(this.currentConsultor[0].co_usuario, this.selected1, this.selected2, this.selected3,
        this.selected4).subscribe(result => {

          this.reportSalCon = { RECEITA_LIQUIDA: 0, CUSTO_FIJO: 0, COMISSAO: 0, LUCRO: 0 };
          for (let y = 0; y < result.length; y++) {
            this.reportSalCon.RECEITA_LIQUIDA += result[y].RECEITA_LIQUIDA;
            this.reportSalCon.CUSTO_FIJO += result[y].CUSTO_FIJO;
            this.reportSalCon.COMISSAO += result[y].COMISSAO;
            this.reportSalCon.LUCRO += result[y].LUCRO;
          }

          this.reportSaldo.push(this.reportSalCon);
          this.reportData.push(result);
          console.log('Relatorio obtenido'/* , this.reportSaldo */);
        }, err => {
          console.log('Erro ao obter os dados Relatorio(conexion fail frontend-backend)', err);
        });
    };
  };

  getGrafico(){
    this.current1 = 2;
  };

  getPizza(){
    this.current1 = 3;
  };
}
