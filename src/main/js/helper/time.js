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
    isoTimespan: function(interval) {
        /*
         * a) Start and end, such as "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z"
         * b) Start and duration, such as "2007-03-01T13:00:00Z/P1Y2M10DT2H30M"
         * c) Duration and end, such as "P1Y2M10DT2H30M/2008-05-11T15:30:00Z"
         */
        // return obj: {from, till, mode}
        var from = (interval && interval.from) || moment().startOf('day');
        var till = (interval && interval.till) || moment().endOf('day');
        var mode = (interval && interval.mode) || 'day';

        return {
            'from': from,
            'till': till,
            'mode': mode
        };
    },
    getRequestTimespan: function(from, till) {
        return moment(from).format() + '/' + moment(till).format();
    },
    createTimespan: function(interval) {
        var timespan = interval.split('/');
        if (timespan.length === 2) {
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
        return this.isoTimespan(interval);
    },
    getFormatedTime: function(timestamp) {
        return moment(timestamp).format(Settings.dateformat);
    }
};
