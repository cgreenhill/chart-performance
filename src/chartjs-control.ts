import {IChart} from "./ichart";
import {Chart} from "chart.js";

export class ChartJSControl implements IChart{
    
    private lastLabel:number = 0;
    private chart:Chart;
    private values:number[];
    
    constructor() {
        Chart.defaults.scale.ticks.autoSkipPadding = 40;
    }
    
    init(elementId:string):void {
        var element = document.getElementById(elementId);
        var canvas = document.createElement("canvas");
        element.appendChild(canvas);
        
        this.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: [1,2,3,4,5,6],
                datasets: [{
                    label: 'Values',
                    data: [0, 3, 8, 15, 30, 40],
                    fill: false,
                    pointRadius: 0,
                    lineTension: 0
                }]
            },
            options: {
                animation: false
            }
        });
        this.values = this.chart.data.datasets[0].data;
    }
    
    addPoint(value:number):void {
        this.values.push(value);
        this.chart.data.labels.push(++this.lastLabel);
    }
    
    addPoints(values:number[]):void {
        for(var i=0; i<values.length; i++) {
            this.values.push(values[i]);
            this.chart.data.labels.push(++this.lastLabel);
        }
    }
    
    update():void {
        this.chart.update();
    }
    
    getDataCount():number {
        return this.chart.data.datasets[0].data.length;
    }
}