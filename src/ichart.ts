export interface IChart {
    init(elementId:string):void;
    addPoint(value:number):void;
    addPoints(values:number[]):void;
    update():void;
    getDataCount():number;
}