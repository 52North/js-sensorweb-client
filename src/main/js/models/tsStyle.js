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
    this.chartType = chartType || "line";
    this.width = width || Settings.commonLineWidth;
    this.color = color || "#000000";
    this.lineType = lineType || "solid";
    
    this.zeroScaled = Settings.defaultZeroScale;
    this.groupedAxis = Settings.defaultGroupedAxis;
    
    createInterval = function (interval) {
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

    this.interval = createInterval(intervalString);

    this.getColor = function () {
        return this.color;
    };

    this.setColor = function (setcolor) {
        this.color = setcolor;
    };

    this.getChartType = function () {
        return this.chartType;
    };

    this.setChartType = function (ct) {
        this.chartType = ct;
    };

    this.isBarChart = function () {
        return this.chartType === "bar";
    };

    this.isLineChart = function () {
        return this.chartType === "line";
    };

    this.getIntervalByHours = function () {
        return this.interval;
    };

    this.getLineType = function () {
        return this.lineType;
    };

    this.getWidth = function () {
        return this.width;
    };
    
    this.isZeroScaled = function() {
        return this.zeroScaled;
    };

    this.setZeroScaled = function(bool) {
        this.zeroScaled = bool;
    };
    
    this.isGroupedAxis = function(){
        return this.groupedAxis;
    };
    
    this.setGroupedAxis = function(bool) {
        this.groupedAxis = bool;
    };
    
    this.toJSON = function(){
        return {
            width: this.width,
            chartType: this.chartType,
            color: this.color,
            lineType: this.lineType,
            zeroScaled: this.zeroScaled,
            groupedAxis: this.groupedAxis,
            interval: this.interval
        };
    };
    
    this.setIntervalByHours = function (inter) {
        this.interval = inter;
    };

    this.clone = function () {
        return $.extend(new TimeseriesStyle(), this);
    };
}
;
/* create a default timeseries style constructor */
TimeseriesStyle.createDefault = function (id) {
    var chartType = "line";
    var width = Settings.commonLineWidth;
    var color = Color.stringToColor(id);
    var interval = "byHour";
    var lineType = "solid";
    return new TimeseriesStyle(chartType, width, color, interval, lineType);
};

TimeseriesStyle.createStyleOfPersisted = function (style) {
    var tsStyle = $.extend(new TimeseriesStyle(),style);
    return tsStyle;
};
