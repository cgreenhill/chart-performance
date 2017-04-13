import {IChart} from "./ichart";
import Dygraph from "dygraphs";

export class DygraphControl implements IChart{
    
    private lastLabel:number = 0;
    private chart:Dygraph;
    private data:number[][];
    
    constructor() {
        
    }
    
    init(elementId:string):void {
        var element = document.getElementById(elementId);
        
        this.data = [
            [0,0],
            [1,1],
            [2,3],
            [3,7],
            [4,5]
        ];
        this.lastLabel = this.data.length-1;
        
        this.chart = new Dygraph(element, this.data, {});
    }
    
    addPoint(value:number):void {
        this.data.push([++this.lastLabel, value]);
    }
    
    addPoints(values:number[]):void {
        for(var i=0; i<values.length; i++) {
            this.data.push([++this.lastLabel,values[i]]);;
        }
    }
    
    update():void {
        this.chart.updateOptions({'file':this.data});
    }
    
    getDataCount():number {
        return this.data.length;
    }
}