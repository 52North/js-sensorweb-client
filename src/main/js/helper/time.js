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
var Time = {
    isoTimespan: function(type) {
        /*
         * a) Start and end, such as "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z"
         * b) Start and duration, such as "2007-03-01T13:00:00Z/P1Y2M10DT2H30M"
         * c) Duration and end, such as "P1Y2M10DT2H30M/2008-05-11T15:30:00Z"
         */
        // return obj: {from, till, mode}
        var from = moment().startOf('day');
        var till = moment().endOf('day');
        var mode = null;

        switch (type) {
            case 'today':
                from = from.startOf('day');
                mode = 'day';
                break;
            case 'yesterday':
                from = from.subtract('days', 1).startOf('day');
                till = till.subtract('days', 1).endOf('day');
                mode = 'day';
                break;
            case 'today_yesterday':
                from = from.subtract('days', 1).startOf('day');
                mode = 'day';
                break;
            case 'lastWeek':
                from = from.subtract('weeks', 1).startOf('week');
                till = till.subtract('weeks', 1).endOf('week');
                mode = 'week';
                break;
            case 'thisWeek':
                from = from.startOf('week');
                mode = 'week';
                break;
            case 'lastMonth':
                from = from.subtract('months', 1).startOf('month');
                till = till.subtract('months', 1).endOf('month');
                mode = 'month';
                break;
            case 'thisMonth':
                from = from.startOf('month');
                mode = 'month';
                break;
            case 'thisYear':
                from = from.startOf('year');
                mode = 'year';
                break;
            case 'lastYear':
                from = from.subtract('years', 1).startOf('year');
                till = till.subtract('years', 1).endOf('year');
                mode = 'year';
                break;
        }

        return {
            'from': from,
            'till': till,
            'mode': mode
        };
    },
    getRequestTimespan: function(from, till) {
        return moment(from).format() + '/' + moment(till).format();
    },
    createTimespan: function(string) {
        var timespan = string.split('/');
        if (timespan.length == 2) {
            var start = moment(timespan[0]);
            var end = moment(timespan[1]);
            if (start.isValid() && end.isValid()) {
                return {
                    from: start,
                    till: end,
                    mode: 'day'
                };
            }
        }
        return this.isoTimespan(string);
    },
    getFormatedTime: function(timestamp) {
        return moment(timestamp).format(Settings.dateformat);
    }
};
