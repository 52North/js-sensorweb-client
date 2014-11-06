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
var ChartController = {
    defaultOptions: {
        series: {
            lines: {
                show: true,
                fill: false
            },
//            points : {
//                show: true
//            },
            shadowSize: 1
        },
        selection: {
            mode: "xy"
        },
        xaxis: {
            mode: "time",
            timezone: "browser"
//            timeformat: "%Y/%m/%d",
                    //use these the following two lines to have small ticks at the bottom ob the diagram
//            tickLength: 5,
//            tickColor: "#000"
        },
        yaxis: {
            show: true,
            additionalWidth: 17,
            panRange: false
//			tickFormatter : function(val, axis) {
//				var factor = axis.tickDecimals ? Math.pow(10, axis.tickDecimals) : 1;
//				var formatted = "" + Math.round(val * factor) / factor;
//				return formatted + "<br>" + this.uom;
//			}
        },
        legend: {
            // show: false
        },
        pan: {
            interactive: true,
            frameRate: 10
        }
    },
    visible: true,
    data: [],
    init: function() {
        this.selectedLineWidth = Settings.selectedLineWidth;
        this.commonLineWidth = Settings.commonLineWidth;
        this.options = $.extend(this.defaultOptions, Settings.chartOptions);
        EventManager.subscribe("timeseries:data:load", $.proxy(this.loadDataForChart, this));
        EventManager.subscribe("timeseries:data:loadfinished", $.proxy(this.loadDataFinished, this));
        EventManager.subscribe("timeseries:synced", $.proxy(this.plotChart, this));
        EventManager.subscribe("timeseries:add:referenceValue", $.proxy(this.showReferenceValue, this));
        EventManager.subscribe("timeseries:remove:referenceValue", $.proxy(this.removeReferenceValue, this));
        EventManager.subscribe("timeseries:remove", $.proxy(this.removeTS, this));
        EventManager.subscribe("timeseries:removeAll", $.proxy(this.clearChart, this));
        EventManager.subscribe("timeseries:selected", $.proxy(this.selectTs, this));
        EventManager.subscribe("timeseries:unselectAll", $.proxy(this.unselectAll, this));
        EventManager.subscribe("timeseries:hide", $.proxy(this.hideData, this));
        EventManager.subscribe("timeseries:show", $.proxy(this.showData, this));
        EventManager.subscribe("navigation:open", $.proxy(this.hideChart, this));
        EventManager.subscribe("navigation:close", $.proxy(this.showChart, this));
        EventManager.subscribe("timeseries:changeStyle", $.proxy(this.changeStyle, this));
        EventManager.subscribe("timeseries:zeroScaled", $.proxy(this.zeroScaled, this));
        EventManager.subscribe("timeseries:groupedAxis", $.proxy(this.changeStyle, this));

        $(window).resize($.proxy(function() {
            var newRatio = $(document).width() / $(document).height();
            if (newRatio !== window.ratio) {
                window.ratio = newRatio;
                this.plotChart();
            }
        }, this));
        $('[data-action=selection]').hide();
        $('[data-action=selection]').on('click', $.proxy(function() {
            EventManager.publish("timeseries:unselectAll");
            this.renderChart();
            $('[data-action=selection]').hide();
        }, this));
        this.plotChart();

        $('#placeholder').bind('plotpanEnd', function(event, plot) {
            var xaxis = plot.getXAxes()[0];
            var from = moment(xaxis.min);
            var till = moment(xaxis.max);
            TimeController.setFlexibleTimeExtent(from, till);
        });
    },
    hideChart: function(event, view) {
        this.visible = false;
        $('#placeholder').hide();
    },
    showChart: function(event, view) {
        this.visible = true;
        $('#placeholder').show();
        this.plotChart();
    },
    hideData: function(event, id) {
        this.removeData(id);
        this.plotChart();
    },
    showData: function(event, id) {
        var ts = TimeSeriesController.getTimeseriesCollection()[id];
        this.loadDataFinished(null, ts);
        this.plotChart();
    },
    selectTs: function(event, id) {
        if (this.plot) {
            $.each(this.plot.getData(), function(idx, ts) {
                if (ts.id === id) {
                    ts.lines.lineWidth = ChartController.selectedLineWidth;
                    ts.bars.lineWidth = ChartController.selectedLineWidth;
                    ts.selected = true;
                    $.each($('.axisTarget'), function(idx, axis) {
                        if (ts.yaxis.n === $(axis).data('axis.n')) {
                            $(axis).toggleClass("selected");
                        }
                    });
                }
            });
            this.plot.draw();
            $.each(this.data, function(index, elem) {
                if (elem.id === id) {
                    elem.selected = true;
                }
            });
        }
    },
    unselectAll: function(event) {
        if (this.plot) {
            $.each(this.plot.getData(), function(index, elem) {
                elem.lines.lineWidth = ChartController.commonLineWidth;
                elem.bars.lineWidth = ChartController.commonLineWidth;
                elem.selected = false;
            });
            $.each(this.data, function(index, elem) {
                elem.selected = false;
            });
            $('.axisTarget').removeClass('selected');
            this.plot.draw();
        }
    },
    loadDataForChart: function(event, ts) {
        if (this.visible) {
            var label = ts.getLabel();
            var html = Template.createHtml("data-loading-entry", {
                id: ts.getInternalId(),
                color: ts.getStyle().getColor(),
                label: label
            });
            $('#loadingDiagram').append(html);
        }
    },
    zeroScaled: function(event, ts) {
        // update all timeseries
        $.each(TimeSeriesController.getTimeseriesCollection(), function(idx, elem) {
            if (ts.getUom() === elem.getUom()) {
                elem.setZeroScaled(ts.isZeroScaled());
            }
        });
        // update data of timeseries
        $.each(this.data, function(idx, elem) {
            if (elem.uom === ts.getUom()) {
                elem.zeroScaled = ts.isZeroScaled();
            }
        });
        this.changeStyle(null, ts);
    },
    changeStyle: function(event, ts) {
        this.loadDataFinished(null, ts);
        this.plotChart();
    },
    loadDataFinished: function(event, ts) {
        $('#loadingDiagram').find('[data-id=' + ts.getInternalId() + ']').remove();
        $.each(ts.getRefValues(), $.proxy(function(id, elem) {
            var refVal = this.dataAlreadyIn(elem.getId());
            if (refVal) {
                refVal.data = elem.getValues();
            }
        }, this));
        if (ts.hasData()) {
            var temp = this.dataAlreadyIn(ts.getInternalId());
            if (temp) {
                this.updateData(temp, ts);
            } else {
                this.data.push(this.createData(ts));
            }
        } else {
            this.removeData(ts.getInternalId());
        }
    },
    updateData: function(data, ts) {
        this.addStyleAndValues(data, ts);
    },
    createData: function(ts) {
        var data = {
            id: ts.getInternalId(),
            uom: ts.getUom(),
            phenomenon: ts.getPhenomenonLabel()
        };
        this.addStyleAndValues(data, ts);
        return data;
    },
    addStyleAndValues: function(data, ts) {
        var style = ts.getStyle();
        data.color = style.getColor();
        data.zeroScaled = ts.isZeroScaled();
        data.groupedAxis = ts.isGroupedAxis();
        data.stationLabel = ts.getStationLabel();
        if (style.isBarChart()) {
            data.bars = {
                show: true,
                barWidth: style.getIntervalByHours() * 60 * 60 * 1000
            };
            data.lines = {
                show: false
            };
            var sumvalues = [];
            var idx = 0;
            var values = ts.getValues();
            var entry = values[idx];
            while (entry) {
                var startInterval = entry[0];
                var endInterval = moment(entry[0]).add('hours', style.getIntervalByHours());
                var sum = 0;
                while (entry && moment(entry[0]).isBefore(endInterval)) {
                    idx++;
                    sum = sum + entry[1];
                    entry = values[idx];
                }
                sumvalues.push([startInterval, sum]);
            }
            data.data = sumvalues;
        } else {
            if (style.getLineType().indexOf("dotted") >= 0) {
                data.points = {
                    show: true,
                    fill: true,
                    fillColor: style.getColor(),
                    radius: style.getWidth()
                };
            }
            if (style.getLineType().indexOf("solid") >= 0) {
                data.lines = {
                    show: true,
                    lineWidth: style.getWidth()
                };
            } else {
                data.lines = {
                    show: false
                };
            }
            data.data = ts.getValues();
        }
    },
    removeTS: function(event, ts) {
        $('#loadingDiagram').find('[data-id=' + ts.getInternalId() + ']').remove();
        this.removeData(ts.getInternalId());
        // remove ref values
        $.each(ts.getRefValues(), $.proxy(function(index, elem) {
            this.removeData(elem.getId());
        }, this));
        this.plotChart();
    },
    showReferenceValue: function(event, data) {
        var ts = TimeSeriesController.getTimeseriesCollection()[data.tsId];
        var refVal = ts.getRefValuesForId(data.refId);
        this.data.push({
            data: refVal.getValues(),
            id: refVal.getId(),
            color: refVal.getColor(),
            uom: ts.getUom(),
            lines: {
                lineWidth: Settings.commonLineWidth
            }
        });
        this.plotChart();
    },
    removeReferenceValue: function(event, data) {
        this.removeData(data.refId);
        this.plotChart();
    },
    clearChart: function() {
        this.data = [];
        this.plotChart();
    },
    plotChart: function() {
        if (this.visible) {
            var placeholder = $('#placeholder');
            //placeholder.show();

            if (this.data.length === 0) {
                placeholder.empty();
                placeholder.append(Template.createHtml('chart-empty'));
                return;
            }
            this.updateXAxis();
            this.options.yaxes = this.createYAxis();

            this.plot = $.plot('#placeholder', this.data, this.options);
            placeholder.append("<div class='chart-annotation'>" + Settings.annotation + "</div>");
            $.each(this.plot.getAxes(), $.proxy(function(i, axis) {
                if (!axis.show)
                    return;
                var box = axis.box;
                if (axis.direction === "y") {
                    $("<div class='axisTarget' style='position:absolute; left:" + box.left + "px; top:" + box.top + "px; width:" + box.width + "px; height:" + box.height + "px'></div>")
                        .data("axis.n", axis.n)
                        .appendTo(this.plot.getPlaceholder())
                        .click($.proxy(function(event) {
                            var target = $(event.currentTarget);
                            var selected = false;
                            $.each($('.axisTarget'), function(index, elem) {
                                elem = $(elem);
                                if (target.data('axis.n') === elem.data('axis.n')) {
                                    selected = elem.hasClass("selected");
                                    return false; // break loop
                                }
                            });
                            EventManager.publish("timeseries:unselectAll");
                            $.each(this.plot.getData(), function(index, elem) {
                                if (elem.yaxis.n === axis.n && !selected) {
                                    EventManager.publish("timeseries:selected", elem.id);
                                    target.addClass("selected");
                                    if ( !elem.groupedAxis) {
                                        return false; // break loop
                                    }
                                }
                            });
                            this.plot.draw();
                        }, this));


                    var yaxisLabel = $("<div class='axisLabel yaxisLabel' style=left:" + box.left + "px;></div>").text(axis.options.uom).appendTo('#placeholder');
                    $.each(axis.options.tsColors, function(idx, color) {
                        $('<span>').html('&nbsp;&#x25CF;').css('color', color).addClass('labelColorMarker').appendTo(yaxisLabel);
                    });
                    yaxisLabel.css("margin-left", -(yaxisLabel.width() - yaxisLabel.height()) / 2 - 3);
                }
            }, this));
            var drawNew = false;
            $.each(this.plot.getData(), function(index, elem) {
                if (elem.selected) {
                    elem.lines.lineWidth = ChartController.selectedLineWidth;
                    elem.bars.lineWidth = ChartController.selectedLineWidth;
                    drawNew = true;

                    $.each($('.axisTarget'), function() {
                        if ($(this).data('axis.n') === elem.yaxis.n) {
                            if (!$(this).hasClass('selected')) {
                                $(this).addClass('selected');
                                return false;
                            }
                        }
                    });
                }
            });
            if (drawNew) {
                this.plot.draw();
            }
        }
    },
    updateXAxis: function() {
        this.options.xaxis.min = TimeController.getCurrentStartAsMillis();
        this.options.xaxis.max = TimeController.getCurrentEndAsMillis();
    },
    createYAxis: function() {
        var axesList = {};
        $.each(this.data, function(index, elem) {
            if (elem.groupedAxis === undefined || elem.groupedAxis) {
                if (!axesList.hasOwnProperty(elem.uom)) {
                    axesList[elem.uom] = {
                        id: ++Object.keys(axesList).length,
                        uom: elem.uom,
                        tsColors: [elem.color],
                        zeroScaled: elem.zeroScaled
                    };
                    elem.yaxis = axesList[elem.uom].id;
                } else {
                    axesList[elem.uom].tsColors.push(elem.color);
                    elem.yaxis = axesList[elem.uom].id;
                }
            } else {
                axesList[elem.id] = {
                    id: ++Object.keys(axesList).length,
                    uom: elem.uom + " @ " + elem.stationLabel,
                    tsColors: [elem.color],
                    zeroScaled: elem.zeroScaled
                };
                elem.yaxis = axesList[elem.id].id;
            }
        });
        var axes = [];
        $.each(axesList, function(idx, elem) {
            axes.splice(elem.id - 1, 0, {
                uom: elem.uom,
                tsColors: elem.tsColors,
                min: elem.zeroScaled ? 0 : null
            });
        });
        return axes;
    },
    dataAlreadyIn: function(id) {
        var elem = null;
        elem = $.map(this.data, function(elem) {
            if (id === elem.id) {
                return elem;
            }
        });
        return elem[0];
    },
    removeData: function(id) {
        var idx = -1;
        $.each(this.data, function(i, elem) {
            if (id == elem.id) {
                idx = i;
                return;
            }
        });
        if (idx >= 0) {
            this.data.splice(idx, 1);
        }
    }
};