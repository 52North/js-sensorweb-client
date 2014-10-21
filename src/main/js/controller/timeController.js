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
var TimeController = {
    currentTimespan: {},
    timeRangeData: Settings.timeRangeData,
    init: function() {
        // get last save timespan
        this.currentTimespan = Status.get('timespan');
        this.updateTimeExtent();
        $(document).ready(function() {
            $('[data-action=before]').click($.proxy(function() {
                TimeController.prevPeriode();
            }, this));
            $('[data-action=after]').click($.proxy(function() {
                TimeController.nextPeriode();
            }, this));
            $('[data-action=timeextent]').click($.proxy(function() {
                Modal.show("time-range-settings", TimeController.timeRangeData);
                var from = moment(TimeController.currentTimespan.from);
                var till = moment(TimeController.currentTimespan.till);
                $('#startPicker').text(from.format(Settings.dateformat));
                $('#endPicker').text(till.format(Settings.dateformat));
                $('#startPicker').data('date', from.format("YYYY-MM-DD"));
                $('#endPicker').data('date', till.format("YYYY-MM-DD"));
                $('#alertTimeExtent').hide();

                $('#startPicker').datepicker({position: 'above'}).on('changeDate', TimeController.evaluateDate);
                $('#endPicker').datepicker({position: 'above'}).on('changeDate', TimeController.evaluateDate);

                $('#confirmTimeExtent').click(function(event) {
                    var from = moment($('#startPicker').data('date')).startOf('day');
                    var till = moment($('#endPicker').data('date')).endOf('day');
                    TimeController.currentTimespan = {
                        from: from,
                        till: till,
                        mode: "range"
                    };
                    TimeController.updateTimeExtent();
                });

                $('.preset-btn').click(function(event) {
                    var btn = $(event.currentTarget);
                    TimeController.setPreset(btn.data('preset-value'));
                });

            }, this));
        });
        this.setLabel();
        EventManager.subscribe("timeseries:data:load", $.proxy(this.disableButtons, this));
        EventManager.subscribe("timeseries:synced", $.proxy(this.enableButtons, this));
        EventManager.subscribe("time:start:change", $.proxy(this.startChanged, this));
        EventManager.subscribe("time:end:change", $.proxy(this.endChanged, this));
        EventManager.subscribe("timeseries:update:complete", $.proxy(this.updateTimeExtent, this));
    },
    startChanged: function(event, start) {
        var diff = this.getCurrentDiff();
        this.currentTimespan.from = moment(start).startOf('day');
        this.currentTimespan.till = moment(start).add(diff).add('s', 1).startOf('day').subtract('ms', 1);
        this.updateTimeExtent();
    },
    endChanged: function(event, end) {
        var diff = this.getCurrentDiff();
        this.currentTimespan.from = moment(end).subtract(diff).endOf('day').add('ms', 1);
        this.currentTimespan.till = moment(end).endOf('day');
        this.updateTimeExtent();
    },
    getCurrentDiff: function() {
        var from = moment(this.currentTimespan.from);
        var till = moment(this.currentTimespan.till);
        return till.diff(from);
    },
    getCurrentStartAsMillis: function() {
        return moment(this.currentTimespan.from).unix() * 1000;
    },
    getCurrentEndAsMillis: function() {
        return moment(this.currentTimespan.till).unix() * 1000;
    },
    updateTimeExtent: function() {
        var maxExtent = TimeSeriesController.getMaxTimeExtent();

        var insideDataInterval = true;
        if (maxExtent.from && maxExtent.till) {
            var earliestStart = moment(maxExtent.from);
            var latestEnd = moment(maxExtent.till);
            var beforeEaliestStart = this.currentTimespan.till.isBefore(earliestStart);
            var afterLatestEnd = this.currentTimespan.from.isAfter(latestEnd);
            insideDataInterval = !(beforeEaliestStart || afterLatestEnd);
        }

        if ( !insideDataInterval) {
            // reset current timespan
            NotifyController.notify(_('chart.outsideOfDataRange'));
            this.currentTimespan = Status.get('timespan');
        }
        EventManager.publish("timeextent:change", {
            from: this.currentTimespan.from,
            till: this.currentTimespan.till
        });
        Status.set('timespan', this.currentTimespan);
        this.setLabel();
    },
    disableButtons: function() {
        $('[data-action="before"]').addClass('disabled');
        $('[data-action="after"]').addClass('disabled');
        $('[data-action="timeextent"]').addClass('disabled');
    },
    enableButtons: function() {
        $('[data-action="before"]').removeClass('disabled');
        $('[data-action="after"]').removeClass('disabled');
        $('[data-action="timeextent"]').removeClass('disabled');
    },
    setLabel: function() {
        var label = moment(this.currentTimespan.from).format(Settings.shortDateformat) + " - " + moment(this.currentTimespan.till).format(Settings.shortDateformat);
        $('[data-action=timeextent]').text(label);
    },
    prevPeriode: function() {
        this.getNearbyPeriode('subtract');
        this.updateTimeExtent();
    },
    nextPeriode: function() {
        this.getNearbyPeriode('add');
        this.updateTimeExtent();
    },
    setPreset: function(name) {
        var interval;
        $.each(this.timeRangeData.presets, function(idx,elem) {
            if (elem.name === name) {
                interval = this.interval;
                return false;
            }
        });
        this.currentTimespan = Time.isoTimespan(interval);
        this.updateTimeExtent();
        Modal.hide();
    },
    setFlexibleTimeExtent: function(from, till) {
        this.currentTimespan = {
            'from': from,
            'till': till,
            'mode': 'range'
        };
        this.updateTimeExtent();
    },
    evaluateDate: function(ev) {
        if (ev.viewMode == "days") {
            var id = "#" + ev.currentTarget.id;
            if (moment($('#startPicker').data('date')).isAfter($('#endPicker').data('date'))) {
                $('#alertTimeExtent').show();
                $('#confirmTimeExtent').addClass('disabled');
                $('#alertTimeExtent').text(_('timeSelection.warning.startBeforeEnd'));
            } else if (Math.abs(moment($('#startPicker').data('date')).diff($('#endPicker').data('date'), 'years', true)) > 1) {
                $('#alertTimeExtent').show();
                $('#confirmTimeExtent').addClass('disabled');
                $('#alertTimeExtent').text(_('timeSelection.warning.maxTimeRange'));
            } else {
                $('#alertTimeExtent').hide();
                $('#confirmTimeExtent').removeClass('disabled');
                startDate = new Date(ev.date);
            }
            $(id).text(moment($(id).data('date')).format(Settings.dateformat));
            $(id).datepicker('hide');
        }
    },
    getNearbyPeriode: function(method) {
        var mode = this.currentTimespan.mode;
        var from = moment(this.currentTimespan.from);
        var till = moment(this.currentTimespan.till);

        var newFrom, newTill;

        switch (mode) {
            case 'range':
                var diff = till.diff(from);
                newFrom = from[method](diff);
                newTill = till[method](diff);
                break;
            case 'day':
                newFrom = from[method]('days', 1).startOf('day');
                newTill = till[method]('days', 1).endOf('day');
                break;
            case 'month':
                newFrom = from[method]('months', 1).startOf('month');
                newTill = till[method]('months', 1).endOf('month');
                break;
            case 'week':
                newFrom = from[method]('weeks', 1).startOf('week');
                newTill = till[method]('weeks', 1).endOf('week');
                break;
            case 'year':
                newFrom = from[method]('years', 1).startOf('year');
                newTill = till[method]('years', 1).endOf('year');
                break;
            default:
                newFrom = from;
                newTill = till;
                break;
        }
        this.currentTimespan = {
            'from': newFrom,
            'till': newTill,
            'mode': mode
        };
    }
};
