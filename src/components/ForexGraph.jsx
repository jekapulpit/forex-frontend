import React from 'react';
import CanvasJSReact from '../lib/canvasjs.react';

const ForexGraph = (stats) => {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    // console.log(stats.stats)
    const canvasProps = {
        theme: "light2",
        title: {
            text: ""
        },
        subtitles: [{
            text: ""
        }],
        axisY: {
            includeZero: false,
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                type: "area",
                name: "",
                showInLegend: true,
                xValueFormatString: "HH mm ss",
                yValueFormatString: "#.####",
                dataPoints: !!stats ? stats.stats : []
            }
        ]
    };

    return (
        <div className="vallet-graphics">
            <div>
                <CanvasJSChart options={canvasProps} />
            </div>
        </div>
    )
};

export default ForexGraph;
