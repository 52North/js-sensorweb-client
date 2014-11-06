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
var GuidedTourController = (function() {

    var timeseriesAdd = function(evt, ts) {
        if (!ts.hasData() && ts.getLastValue().timestamp) {
            EventManager.publish("time:end:change", ts.getLastValue().timestamp);
            return;
        }
        EventManager.unsubscribe("timeseries:data:loadfinished", timeseriesAdd);
        this.showNext();
    };

    var stationLoaded = function() {
        EventManager.unsubscribe("map:stationLoaded", stationLoaded);
        setTimeout($.proxy(function() {
            this.showNext();
        }, this), 200);
    };

    /*
     * every step has the following options:
     *
     * mandatory:
     * 		"anchor" : existing anchor in the document to connect the popup window
     */
    var steps = [
        {
            anchor: '.navbar-header.chart',
            title: _('guide.step1.header'),
            text: _('guide.step1.text'),
            initStep: function() {
                Pages.navigateToChart();
            }
        }, {
            anchor: '[data-target="#map"]',
            title: _('guide.step2.header'),
            text: _('guide.step2.text'),
            arrow: true,
            initStep: function() {
                Pages.navigateToChart();
            }
        }, {
            anchor: '.navbar-header.map',
            title: _('guide.step3.header'),
            text: _('guide.step3.text'),
            initStep: function() {
                Pages.navigateToMap();
            }
        }, {
            anchor: '[data-action="provider"]',
            title: _('guide.step4.header'),
            text: _('guide.step4.text'),
            arrow: true,
            initStep: function() {
            }
        }, {
            anchor: '[data-action="locate"]',
            title: _('guide.step5.header'),
            text: _('guide.step5.text'),
            arrow: true,
            initStep: function() {
            }
        }, {
            anchor: '[data-action="listSelection"]',
            title: _('guide.step6.header'),
            text: _('guide.step6.text'),
            arrow: true,
            initStep: function() {
            }
        }, {
            anchor: '.navbar-header.map',
           title: _('guide.step7.header'),
            text: _('guide.step7.text'),
            next: false,
            initStep: function(context) {
                EventManager.subscribe("map:stationLoaded", $.proxy(stationLoaded, context));
            }
        }, {
            anchor: '.tsItem input',
            title: _('guide.step8.header'),
            text: _('guide.step8.text'),
            previous: false,
            next: false,
            arrow: true,
            initStep: function(context) {
                EventManager.subscribe("timeseries:data:loadfinished", $.proxy(timeseriesAdd, context));
            }
        }, {
            anchor: '.legend-entry',
            title: _('guide.step9.header'),
            text: _('guide.step9.text'),
            arrow: true,
            previous: false,
            initStep: function() {
                Pages.toggleLegend(true);
            }
        }, {
            anchor: '.navbar-header.chart',
            title: _('guide.step10.header'),
            text: _('guide.step10.text'),
            initStep: function() {
                Pages.toggleLegend(false);
            }
        }, {
            anchor: '.btn-group.timeSelection',
            title: _('guide.step11.header'),
            text: _('guide.step11.text'),
            arrow: true,
            initStep: function() {
            }
        }, {
            anchor: '[data-action="dataTable"]',
            title: _('guide.step12.header'),
            text: _('guide.step12.text'),
            arrow: true,
            initStep: function() {
            }
        }, {
            anchor: '[data-target="#favorites"]',
            title: _('guide.step13.header'),
            text: _('guide.step13.text'),
            arrow: true,
            initStep: function() {
            }
        }, {
            anchor: '.navbar-header.chart',
            title: _('guide.step14.header'),
            text: _('guide.step14.text'),
            initStep: function() {
            }
        }];

    var template = '<div class="popover guidedtour"><div class="popover-content"></div></div>';
    var arrowtemplate = '<div class="popover guidedtour"><div class="arrow"></div><div class="popover-content"></div></div>';

    return {
        init: function() {
            // initialize button
            $(document).ready(function() {
                $('[data-target="#tour"]').click(function() {
                    GuidedTourController.start();
                });
            });
            // start by permalink
            if (Permalink.getUrlParameter('tour') === "true") {
                GuidedTourController.start();
            }
            // TODO check if the client is loaded the first time, then start the
            // guidedtour
        },
        start: function() {
            this.closeLast();
            this.show(1);
            Status.reset();
        },
        showNext: function() {
            this.closeLast();
            this.show(this.idx + 1);
        },
        closeLast: function() {
            if (this.gtWindow) {
                this.gtWindow.popover('destroy');
            }
        },
        show: function(idx) {
            this.idx = idx;
            var step = steps[idx - 1];
            step.initStep(this);
            this.gtWindow = $(step.anchor + ':first').popover({
                html: true,
                template: step.arrow ? arrowtemplate : template,
                trigger: 'manual',
                content: Template.createHtml('guidedtour', {
                    title: step.title,
                    text: step.text,
                    previous: idx - 1 >= 1 && step.previous != false ? idx - 1 : null,
                    step: idx,
                    next: idx + 1 <= steps.length && step.next != false ? idx + 1 : null,
                    steps: steps.length
                }),
                placement: 'auto'
            });
            $(step.anchor).popover('show');
            $('.paging.guidedtour li a').on('click', $.proxy(function(target) {
                var idx = parseInt(target.currentTarget.dataset.step);
                if (!isNaN(idx)) {
                    this.closeLast();
                    this.show(idx);
                }
            }, this));
            $('.guidedtour .close').on('click', $.proxy(function() {
                this.closeLast();
            }, this));
            this.gtWindow.on('hidden.bs.popover', $.proxy(function() {
                this.closeLast();
            }, this));
        }
    };
})();