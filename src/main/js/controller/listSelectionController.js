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
var ListSelectionController = {
    category: {
        type: "category",
        heading: _('listSelection.headers.category'),
        call: Rest.categories
    },
    station: {
        type: "feature",
        heading: _('listSelection.headers.station'),
        call: Rest.features
    },
    phenomenon: {
        type: "phenomenon",
        heading: _('listSelection.headers.phenomenon'),
        call: Rest.phenomena
    },
    procedure: {
        type: "procedure",
        heading: _('listSelection.headers.procedure'),
        call: Rest.procedures
    },
    init: function() {
        this.entries = {
            category: [this.category, this.station, this.phenomenon, this.procedure],
            sensor: [this.procedure, this.station, this.category, this.phenomenon],
            station: [this.station, this.category, this.phenomenon, this.procedure],
            phenomenon: [this.phenomenon, this.category, this.station, this.procedure]
        };
        // show button to start list selection
        $('[data-action="listSelection"]').show();
        $('[data-action="listSelection"]').click(function() {
            ListSelectionController.open();
        });
    },
    open: function() {
        Modal.show("list-selection");
        $('a[data-toggle="tab"]').on('shown.bs.tab', $.proxy(function(e) {
            var tab = $(e.target).data('tab');
            var accordionId = $('#' + tab + ' .panel-group')[0].id;
            $('#' + tab + ' .panel-group').empty();
            // send request
            this.startRequest(tab, 0, {
                service: Status.get('provider').serviceID
            });
            // build html elements
            $.each(this.entries[tab], function(idx, elem) {
                elem.accordion = accordionId;
                elem.collapse = accordionId + elem.type;
                $('#' + tab + ' .panel-group').append(Template.createHtml("list-selection-skeleton", elem));
            });
        }, this));
        $('#selectionList a:first').tab('show');
    },
    startRequest: function(tab, index, data) {
        var entry = this.entries[tab][index];
        var apiUrl = Status.get('provider').apiUrl;
        if (entry) {
            var promise = entry.call(null, apiUrl, data);
            promise.done($.proxy(function(result) {
                $('#' + tab + ' #' + entry.collapse + ' .panel-body').empty();
                $.each(result, function(idx, e) {
                    var elem = e.id ? e : e.properties;
                    var html = Template.createHtml("list-selection-entry", {
                        id: elem.id,
                        label: elem.label
                    });
                    $('#' + tab + ' #' + entry.collapse + ' .panel-body').append(html);
                });
                // close other collapse
                $('#' + tab + ' .collapse.in').collapse('hide');
                // open collapse
                $('#' + tab + ' #' + entry.collapse + '.collapse').collapse('show');
                // onclick
                $('#' + tab + ' #' + entry.collapse + ' .panel-body div').on('click', $.proxy(function(e) {
                    var label = $.trim(e.target.innerHTML);
                    $('#' + tab + ' [href=#' + entry.collapse + ']').text(entry.heading + ' - ' + label);
                    $('#' + tab + ' #' + entry.collapse).collapse('hide');
                    data[entry.type] = e.target.dataset.id;
                    this.startRequest(tab, index + 1, data);
                }, this));
            }, this));
        } else {
            // load ts
            Rest.timeseries(null, apiUrl, data).done(function(result) {
                if (result.length == 1) {
                    TimeSeriesController.addTS(result[0]);
                    Modal.hide();
                    Pages.navigateToChart();
                } else {
                    Inform.warn(_('listSelection.warning.moreThanOneTimeseries'));
                }
            });
        }
    }
};