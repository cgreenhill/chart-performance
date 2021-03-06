// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/80060c94ef549c077a011977c2b5461bd0fd8947/plotly.js/index.d.ts
interface PlotlyConfig {
    staticPlot?: boolean,
    editable?: boolean,
    autosizable?: boolean,
    fillFrame?: boolean,
    frameMargins?: number,
    scrollZoom?: boolean,
    doubleClick?: string,
    showTips?: boolean,
    showLink?: boolean,
    sendData?: boolean,
    linkText?: string,
    showSources?: boolean,
    displayModeBar?: string|boolean,
    modeBarButtonsToRemove?: any[],
    modeBarButtonsToAdd?: any[],
    modeBarButtons?: boolean,
    displaylogo?: boolean,
    plotGlPixelRatio?: number,
    setBackground?: any,
    topojsonURL?: string,
    mapboxAccessToken?: string,
    logging?: boolean
}

interface PlotlyStatic {
    newPlot(divid:string | HTMLElement, data:any[], layout?:any, config?:PlotlyConfig):void;
}

declare module "lab-grapher" {    
    export = labGrapher;
}

declare var labGrapher:PlotlyStatic;
