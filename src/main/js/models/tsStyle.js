/*
 * Copyright (C) 2014-2014 52°North Initiative for Geospatial Open Source
 * Software GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function TimeseriesStyle(chartType, width, color, intervalString, lineType) {
    createInterval = function(interval) {
        switch (interval) {
            case "byHour":
                return 1;
            case "byDay":
                return 24;
            case "byWeek":
                return 7 * 24;
            case "byMonth":
                return 30 * 24;
            default:
                return 1;
        }
    };

    var interval = createInterval(intervalString);

    this.getColor = function() {
        return color;
    };

    this.setColor = function(setcolor) {
        color = setcolor;
    };

    this.getChartType = function() {
        return chartType;
    };

    this.setChartType = function(ct) {
        chartType = ct;
    };

    this.isBarChart = function() {
        return chartType == "bar";
    };

    this.isLineChart = function() {
        return chartType == "line";
    };

    this.getIntervalByHours = function() {
        return interval;
    };

    this.getLineType = function() {
        return lineType;
    };

    this.getWidth = function() {
        return width;
    };

    this.persist = function() {
        return {
            chartType: chartType,
            color: color,
            interval: interval,
            lineType: lineType
        };
    };

    this.setIntervalByHours = function(inter) {
        interval = inter;
    };

}
;
/* create a default timeseries style constructor */
TimeseriesStyle.createDefault = function(id) {
    var chartType = "line";
    var width = Settings.commonLineWidth;
    var color = Color.stringToColor(id);
    var interval = "byHour";
    var lineType = "solid";
    return new TimeseriesStyle(chartType, width, color, interval, lineType);
};

