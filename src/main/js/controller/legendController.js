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
var LegendController = {
    init: function() {
        EventManager.subscribe("timeseries:add", $.proxy(this.addTS, this));
        EventManager.subscribe("timeseries:remove", $.proxy(this.removeTS, this));
        EventManager.subscribe("timeseries:removeAll", $.proxy(this.removeAll, this));
        EventManager.subscribe("timeseries:selected", $.proxy(this.selectTS, this));
        EventManager.subscribe("timeseries:unselectAll", $.proxy(this.deselectAllTS, this));
        EventManager.subscribe("timeseries:data:loadfinished", $.proxy(this.checkNoData, this));
        EventManager.subscribe("timeseries:changeStyle", $.proxy(this.changeStyle, this));
        EventManager.subscribe("timeseries:synced", $.proxy(this.syncedTS, this));
    },
    addTS: function(event, ts) {
        var html = this.createEntry(ts);
        this.removeEntry(ts.getInternalId());
        $('.legend-entry').append(html);
        this.addClickEvents(ts);
    },
    addClickEvents: function(ts) {
        $('[data-id=' + ts.getInternalId() + '] .firstLastEntry').on('click', function(event) {
            event.stopPropagation();
            var time = $(event.currentTarget).data('firsttime');
            if (time) {
                EventManager.publish("time:start:change", time);
            }
            time = $(event.currentTarget).data('lasttime');
            if (time) {
                EventManager.publish("time:end:change", time);
            }
        });
        $('[data-id=' + ts.getInternalId() + '] .legendItemheader').click($.proxy(function(event) {
            if (!$('[data-id=' + ts.getInternalId() + ']').hasClass('selected')) {
                EventManager.publish("timeseries:unselectAll");
                EventManager.publish("timeseries:selected", ts.getInternalId());
            } else {
                EventManager.publish("timeseries:unselectAll");
            }
        }, this));
        $('[data-id=' + ts.getInternalId() + '] .hideDiagram').click($.proxy(function(event) {
            target = $(event.currentTarget);
            if (target.hasClass('glyphicon-eye-close')) {
                EventManager.publish("timeseries:hide", ts.getInternalId());
            } else {
                EventManager.publish("timeseries:show", ts.getInternalId());
            }
            target.toggleClass('glyphicon-eye-close');
            target.toggleClass('glyphicon-eye-open');
        }, this));
        $('[data-id=' + ts.getInternalId() + '] .delete').click($.proxy(function(event) {
            TimeSeriesController.removeTS(ts);
        }, this));
        $('[data-id=' + ts.getInternalId() + '] .inMap').click($.proxy(function(event) {
            EventManager.publish("timeseries:showInMap", ts);
        }, this));
        $('[data-id=' + ts.getInternalId() + '] .changeStyle').click($.proxy(function(event) {
            StyleChangeController.open(ts);
        }, this));
        $('[data-id=' + ts.getInternalId() + '] .showInfo').click($.proxy(function(event) {
            $('[data-id=' + ts.getInternalId() + ']').find('.collapseLegendEntry').toggle();
        }, this));
        $('[data-id=' + ts.getInternalId() + '] .refEntry').on('click', function(event) {
            var target = $(event.currentTarget);
            target.toggleClass('selected');
            var ev;
            if (target.hasClass('selected')) {
                ev = "timeseries:add:referenceValue";
            } else {
                ev = "timeseries:remove:referenceValue";
            }
            EventManager.publish(ev, {
                "tsId": ts.getInternalId(),
                "refId": target.data('refid')
            });
        });
    },
    checkNoData: function(event, ts) {
        var warn = $('.legend-entry').find('[data-id=' + ts.getInternalId() + '] .noDataWarning');
        if (!ts.hasData()) {
            warn.show();
        } else {
            warn.hide();
        }
    },
    selectTS: function(event, id) {
        $('.legend-entry').find('[data-id=' + id + ']').addClass('selected');
    },
    changeStyle: function(event, ts) {
        this.updateEntry(ts);
    },
    deselectAllTS: function(event) {
        $('.legend-entry').find('.legendItem.selected').removeClass('selected');
    },
    removeTS: function(event, ts) {
        this.removeEntry(ts.getInternalId());
    },
    removeAll: function(event) {
        $('.legend-entry').empty();
    },
    removeEntry: function(id) {
        $('.legend-entry').find('[data-id=' + id + ']').remove();
    },
    updateEntry: function(ts) {
        var html = this.createEntry(ts);
        $(html).replaceAll('.legend-entry [data-id=' + ts.getInternalId() + ']');
        this.addClickEvents(ts);
    },
    syncedTS: function() {
        var noData = true;
        $.each(TimeSeriesController.timeseries, function(idx, elem){
            if (elem.hasData()) {
                noData = false;
            }
        });
        if (noData) {
            Pages.toggleLegend(true);
        }
    },
    createEntry: function(ts) {
        var firstValue = ts.getFirstValue();
        var lastValue = ts.getLastValue();
        var refValues = $.map(ts.getRefValues(), function(elem, id) {
            return {
                id: elem.getId(),
                label: elem.getLabel(),
                color: elem.getColor()
            };
        });
        var html = Template.createHtml("legend-entry", {
            id: ts.getInternalId(),
            color: ts.getStyle().getColor(),
            synced: ts.isSynced(),
            uom: this.createText(ts.getUom),
            phenomenon: this.createText(ts.getPhenomenonLabel()),
            procedure: this.createText(ts.getProcedureLabel()),
            station: this.createText(ts.getStationLabel()),
            category: this.createText(ts.getCategoryLabel()),
            firstValueTime: firstValue ? firstValue.timestamp : "",
            firstValueTimeFormatted: firstValue ? moment(firstValue.timestamp).format(Settings.dateformat) : "",
            firstValue: firstValue ? firstValue.value : "",
            lastValueTime: lastValue ? lastValue.timestamp : "",
            lastValueTimeFormatted: lastValue ? moment(lastValue.timestamp).format(Settings.dateformat) : "",
            lastValue: lastValue ? lastValue.value : "",
            referenceValues: refValues
        });
        return html;
    },
    createText: function(text) {
        return text ? text : "";
    }
};