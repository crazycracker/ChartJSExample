import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private dataService:DataServiceService){}

  title = 'Demo of Chart.js';

  myLineChart:any;
  config:any;
  MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  ngOnInit(){
    this.config = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'First dataset',
          backgroundColor: "red",
          borderColor: "red",
          data: [
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor()
          ],
          fill: false,
        }, {
          label: 'Second dataset',
          fill: false,
          backgroundColor: "blue",
          borderColor: "blue",
          data: [
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor(),
            this.dataService.randomScalingFactor()
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    };
    this.generateChart();
  }
  generateChart(){
   
    this.myLineChart = new Chart('canvas', this.config);
  }
}
