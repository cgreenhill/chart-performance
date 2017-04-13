import {Chart} from "chart.js";
import {IChart} from "./ichart";
import {ChartJSControl} from "./chartjs-control";
import {PlotlyControl} from "./plotly-control";
import {DygraphControl} from "./dygraph-control";
import {LabGraphControl} from "./labgraph-control";

// Prevent Typescript from using NodeJS version of setInterval
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;


var testChart:IChart;

var updateTimer:number, 
    metaUpdateTimer:number,
    lastLabel = 6,
    lastValue = 30,
    lastUpdateCount = 0,
    startTime:Date,
    lastUpdateTime:number;

var chartSelect = <HTMLSelectElement>document.getElementById("chartSelect");
if(chartSelect) {
    chartSelect.onchange = selectChart;
}

setBtnClick(document.getElementById("startBtn"), function() {
    startData();
});

setBtnClick(document.getElementById("stopBtn"), function() {
    stopData();
});

setBtnClick(document.getElementById("addDataBtn"), function() {
    var dataAmtInput = <HTMLInputElement>document.getElementById("addDataAmtInput");
    if(dataAmtInput) {
        addData(dataAmtInput.value);
    }
});

function setBtnClick(btn:HTMLElement|null, clickFn:(this:HTMLElement, e:MouseEvent)=>any) {
    if(btn) {
        btn.onclick = clickFn;
    }
}

function selectChart(e:Event) {
    var chartType:string = (e.target as HTMLSelectElement).value;
    switch(chartType) {
        case "ChartJS":
            testChart = new ChartJSControl();
            break;
            
        case "Plotly":
            testChart = new PlotlyControl();
            break;
            
        case "Dygraphs":
            testChart = new DygraphControl();
            break;
            
        case "LabGrapher":
            testChart = new LabGraphControl();
            break;
            
        default:
            return;
    }
    var header = document.getElementById("chartType");
    header.innerText = chartType + " performance test"
    testChart.init("chart");
    chartSelect.style.display = "none";
}

function addData(numPoints) {
    var newValues = [];
    for(var i = 0; i < numPoints; i++) {
        newValues.push(newValue());
    }
    testChart.addPoints(newValues);
    testChart.update();
}

function startData() {
    var rateInput = <HTMLInputElement>document.getElementById("rateInput");
    var rate:number = rateInput ? parseInt(rateInput.value, 10) : 1;
    updateTimer = window.setInterval(onUpdateTick, 1000/rate);
    metaUpdateTimer = setInterval(metaUpdate, 1000);
    lastUpdateTime = +new Date();
    lastUpdateCount = testChart.getDataCount();
    startTime = new Date();
}

function stopData() {
    clearInterval(updateTimer);
    clearInterval(metaUpdateTimer);
}

function newValue():number {
    return lastValue = lastValue + Math.random() * 200000 - 100000;
}

function onUpdateTick() {
    testChart.addPoint(newValue());
    testChart.update();
}

function metaUpdate() {
    var curTime:number = +new Date();
    var timeDelta:number = curTime - lastUpdateTime;
    var dataCountDelta:number = testChart.getDataCount() - lastUpdateCount;
    var actualRate:number = Math.round(100 * 1000 * dataCountDelta / timeDelta) / 100;
    lastUpdateTime = curTime;
    lastUpdateCount = testChart.getDataCount();

    document.getElementById("elapsedTime").innerText = Math.round((curTime - +startTime) / 1000).toString() + " s";
    document.getElementById("updateCount").innerText = lastUpdateCount.toString();
    document.getElementById("actualRate").innerText = actualRate + "/s";
}
       