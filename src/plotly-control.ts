import {IChart} from "./ichart";

declare var Plotly:any;

export class PlotlyControl implements IChart{
    
    private lastLabel:number = 0;
    private chart:Chart;
    private data:{x:number[], y:number[], type?:string, mode:string};
    private layout:Object;
    private chartId:string;
    
    constructor() {
        this.data = {
            x: [0, 1, 2, 3, 4, 5],
            y: [0, 1, 2, 4, 8, 16]
          , 'mode':'lines'
        }
        
        this.lastLabel = this.data.x.length - 1;
        
        var layout = {
          xaxis: {title: 'Values'},
          yaxis: {title: 'Time', type: 'log'},
          margin: {t: 20},
          hovermode: 'closest'
        };
    }
    
    init(elementId:string):void {
        this.chartId = elementId;
        this.chart = Plotly.plot( elementId, [this.data], {
    margin: { t: 0 } 
});
    }
    
    addPoint(value:number):void {
        Plotly.extendTraces(this.chartId, {
            x: [[++this.lastLabel]],
            y: [[value]]
          }, [0]);
    }
    
    addPoints(values:number[]):void {
        var newLabels = [];
        for(var i=0; i<values.length; i++) {
            newLabels.push(++this.lastLabel);
        }
        Plotly.extendTraces(this.chartId, {
            x: [newLabels],
            y: [values]
          }, [0]);   
    }
    
    update():void {
        //this.chart.update();
    }
    
    getDataCount():number {
        //return this.chart.data.datasets[0].data.length;
        return this.lastLabel;
    }
}