import {IChart} from "./ichart";

import * as d3 from "d3";
import {$} from "jquery";
import Graph from "@concord-consortium/lab-grapher";

export class LabGraphControl implements IChart{
    
    private lastLabel:number = 0;
    private chart:any;
    private data:Array<[number,number]>;
    private options:{title:string,xlabel:string,ylabel:string,dataType:string,
                     fontScaleRelativeToParent:boolean,
                     markAllDataPoints:boolean,
                     dataChange:boolean,
                     addData:boolean,
                     strokeWidth:number,
                     dataPoints:Array<[number,number]>,
                     ymin:number,ymax:number,xmin:number,xmax:number};
    private chartId:string;
    
    constructor() {
        
    }
    
    init(elementId:string):void {
        this.chartId = '#' + elementId;
        var element = document.getElementById(elementId);
        this.chart = Graph(element);
        this.data = [
            [0,0]
        ];
        this.lastLabel = 0;
        

        this.options = {
          title:  "Lab Grapher Performance Test",
          xlabel: "Time",
          ylabel: "Values",
          xmax:   1000,
          xmin:   0,
          ymax:   100,
          ymin:   -100,

          fontScaleRelativeToParent: false,
          dataType: 'points',
          dataPoints: this.data,

          markAllDataPoints: false,
          strokeWidth: 1,
          dataChange: false,
          addData: false
        }
        this.chart.reset(this.chartId, this.options);
    }
    
    addPoint(value:number):void {
        this.addValue(value);
        this.update();
    }
    
    addPoints(values:number[]):void {
        for(var i=0; i<values.length; i++) {
            this.addValue(values[i]);
        }
        this.update();
    }
    
    private addValue(value:number):void {
        if(value > this.options.ymax) this.options.ymax = value;
        if(value < this.options.ymin) this.options.ymin = value;
        this.options.xmax = ++this.lastLabel;
        this.options.dataChange = true;
        this.options.addData = true;
        
        this.data.push([this.lastLabel, value]);
    }
    
    update():void {
        this.chart.reset(this.chartId, this.options);
    }
    
    getDataCount():number {
        return this.lastLabel;
    }
}