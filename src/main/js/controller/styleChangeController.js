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
var StyleChangeController = {
    defaultColorList: ['#1abc9c', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f',
        '#d35400', '#c0392b', '#7f8c8d'],
    defaultIntervalList: [
        {label: _('styleChange.barChartInterval.hour'), value: 1},
        {label: _('styleChange.barChartInterval.day'), value: 24},
        {label: _('styleChange.barChartInterval.week'), value: 7 * 24},
        {label: _('styleChange.barChartInterval.month'), value: 30 * 24}
    ],
    init: function() {
        this.colorList = Settings.colorList || this.defaultColorList;
        this.intervalList = Settings.intervalList || this.defaultIntervalList;
    },
    open: function(ts) {
        var style = ts.getStyle();
        var data = {
            currentColor: style.getColor(),
            colorList: this.colorList,
            zeroScaled: ts.isZeroScaled(),
            groupedAxis: ts.isGroupedAxis()
        };
        if (style.isBarChart()) {
            data.bar = true;
            data.interval = this.intervalList;
        }
        ;
        Modal.show("style-change", data);
        $('.colorButton').on('click', function(e) {
            var color = $(e.target).data('color');
            if (style.getColor() != color) {
                style.setColor(color);
                EventManager.publish("timeseries:changeStyle", ts);
            }
        });
        $('.intervalButton').on('click', function(e) {
            var interval = $(e.target).data('interval');
            if (style.getIntervalByHours() != interval) {
                style.setIntervalByHours(interval);
                EventManager.publish("timeseries:changeStyle", ts);
            };
        });
        $('.zeroScaled').on('click', function(e) {
            var zeroScaled = Button.switchToggleButton(e.target);
            ts.setZeroScaled(zeroScaled);
            EventManager.publish("timeseries:zeroScaled", ts);
        });
        $('.groupedAxis').on('click', function(e) {
            var groupedAxis = Button.switchToggleButton(e.target);
            ts.setGroupedAxis(groupedAxis);
            EventManager.publish("timeseries:groupedAxis", ts);
        });
    }
};