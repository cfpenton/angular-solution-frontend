import { Component, ViewChild } from '@angular/core';
import { CommonService } from './services/common.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { firstValueFrom, lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public pieChartType: ChartType = 'pie';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  public barChartData: any = {
    labels: [],
    datasets: []
  };
  arrayRL: any = []
  average: number = 0;
  aveArray: any = [];
  logo: string = '../assets/images/agence-logo.png';
  current: any = 1;
  current1: any = 1;
  source: string[] = [];
  target = [];
  consultoresData: any;
  salariosData: any;
  currentConsultor: any;
  reportData: any = [];
  userType = 'Consultores';
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
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getConsultores();
    this.getSalarios();
  }

  setCurrent(value: any) {
    if (value == 1) {
      this.current = 1;
      this.userType = 'Consultores';
      this.getConsultores();
    }
    if (value == 2) {
      this.current = 2;
      this.userType = 'Clientes';
      this.source = [];
      this.target = [];
      this.reportData = [];
    }
  };

  getConsultores() {
    this.commonService.getConsultores().subscribe({
      next: (result) => {
        this.consultoresData = result;
        for (var i in result)
          this.source.push(result[i].no_usuario);
      },
      error: (err) => {
        console.log('Erro ao obter os dados Consultores(conexion fail frontend-backend)', err);
      },
      complete: () => { }
    });
  };

  getSalarios() {
    this.commonService.getSalarios().subscribe({
      next: (result) => {
        this.salariosData = result;
      },
      error: (err) => {
        console.log('Erro ao obter os Salarios(conexion fail frontend-backend)', err);
      },
      complete: () => { }
    });
  };

  getAveSalario() {
    let sum = 0;
    let count = 0;
    for (var i of this.salariosData) {
      if (this.target.find((x: any) => x == i.no_usuario)) {
        sum += i.brut_salario;
        count++;
      }
    }
    return sum / count;
  };
  prueba: any;

  async getReportData() {
    this.average = this.getAveSalario();
    this.aveArray = [];
    this.reportData = [];
    this.barChartData.datasets = [];
    this.pieChartData.labels = [];
    this.pieChartData.datasets = [];
    this.arrayRL = [];
    this.currentConsultor = [];
    for (let tar of this.target) {
      this.currentConsultor = this.consultoresData.find((x: any) => x.no_usuario == tar);
      //subscribe
      /*       this.commonService.getRelatorioDoConsultor(this.currentConsultor.co_usuario, this.selected1, this.selected2, this.selected3,
              this.selected4).subscribe({
                next: (result) => {
      
                  if (tar == this.target[0]) {
                    this.barChartData.labels = result.dateArray;
                    for (let { } of this.barChartData.labels) {
                      this.aveArray.push(this.average)
                    }
                  }
      
                  this.reportData.push(result);
                  this.barChartData.datasets.push({ data: result.rlArray, label: result.no_consultor });
                  this.pieChartData.labels?.push(result.no_consultor);
                  this.arrayRL.push(result.saldo.RECEITA_LIQUIDA);
                  this.chart?.update();
                },
                error: (err) => {
                  console.log('Erro ao obter os dados Relatorio(conexion fail frontend-backend)', err);
                },
                complete: () => { }
              }); */
      //

      //toPromise
      await firstValueFrom(this.commonService.getRelatorioDoConsultor(this.currentConsultor.co_usuario, this.selected1, this.selected2, this.selected3,
        this.selected4)).then((result) => {
          if (tar == this.target[0]) {
            this.barChartData.labels = result.dateArray;
          }
          this.reportData.push(result);
          this.barChartData.datasets.push({ data: result.rlArray, label: result.no_consultor });
          this.pieChartData.labels?.push(result.no_consultor);
          this.arrayRL.push(result.saldo.RECEITA_LIQUIDA);
          this.chart?.update();
        }).catch((err) => {
          console.log('Erro ao obter os dados Relatorio(conexion fail frontend-backend)', err);
        });
    };
    for (let { } of this.barChartData.labels) {
      this.aveArray.push(this.average)
    }
    //
    this.barChartData.datasets.push({ data: this.aveArray, label: 'Custo Fixo Medio', type: 'line' });
    this.pieChartData.datasets.push({ data: this.arrayRL });
    this.chart?.update();
  };

  getReport() {
    if (this.current1 != 1) {
      this.current1 = 1;
      this.chart?.update();
    }
  };

  getGrafico() {
    if (this.current1 != 2) {
      this.current1 = 2;
      this.chart?.update();
    }
  };

  getPizza() {
    if (this.current1 != 3) {
      this.current1 = 3;
      this.chart?.update();
    }
  };

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    /* console.log(event, active); */
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    /* console.log(event, active); */
  }
}