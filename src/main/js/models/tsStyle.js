/*
 * Copyright (C) 2014-2014 52°North Initiative for Geospatial Open Source
 * Software GmbH
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published
 * by the Free Software Foundation.
 *
 * If the program is linked with libraries which are licensed under one of
 * the following licenses, the combination of the program with the linked
 * library is not considered a "derivative work" of the program:
 *
 *     - Apache License, version 2.0
 *     - Apache Software License, version 1.0
 *     - GNU Lesser General Public License, version 3
 *     - Mozilla Public License, versions 1.0, 1.1 and 2.0
 *     - Common Development and Distribution License (CDDL), version 1.0
 *
 * Therefore the distribution of the program linked with libraries licensed
 * under the aforementioned licenses, is permitted by the copyright holders
 * if the distribution is compliant with both the GNU General Public
 * License version 2 and the aforementioned licenses.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
 * Public License for more details.
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
    var width = 2;
    var color = Color.stringToColor(id);
    var interval = "byHour";
    var lineType = "solid";
    return new TimeseriesStyle(chartType, width, color, interval, lineType);
};

