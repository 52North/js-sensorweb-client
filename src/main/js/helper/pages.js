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
var Pages = {
    navigateToPage: function(toPage) {
        $(".swc-page-current").removeClass('swc-page-current');
        $(toPage).addClass('swc-page-current');
    },
    navigateToMap: function() {
        Pages.navigateToPage("#map-page");
        location.href = "#map";
        Pages.toggleLegend(false);
    },
    navigateToChart: function() {
        Pages.navigateToPage("#chart-page");
        location.href = "#chart";
        Pages.togglePhenomenon(false);
    },
    toggleLegend: function(active) {
        if (active) {
            $('.legend').toggleClass('active');
            if ($('.legend').hasClass('active')) {
                $('[data-toggle="legend"]').text("X");
            } else {
                $('[data-toggle="legend"]').text(_('main.legend'));
            }
        } else {
            $('.legend').removeClass('active');
            $('[data-toggle="legend"]').text(_('main.legend'));
        }
    },
    togglePhenomenon: function(active, label) {
        var name = !label ? _('main.phenomena') : label;
        if (active) {
            $('.phenomena').toggleClass('active');
            if ($('.phenomena').hasClass('active')) {
                $('[data-toggle="phenomena"]').text("X");
            } else {
                $('[data-toggle="phenomena"]').text(name);
            }
        } else {
            $('.phenomena').removeClass('active');
            $('[data-toggle="phenomena"]').text(name);
        }
    },
    activateNavButtonsHandler: function() {
        $('[data-target="#map"]').click(function() {
            Pages.navigateToMap();
        });
        $('[data-target="#chart"]').click(function() {
            Pages.navigateToChart();
        });
    },
    activateToggleButtonsHandler: function() {
        $('[data-toggle=legend]').click(function() {
            Pages.toggleLegend(true);
        });
        $('[data-toggle=phenomena]').click(function() {
            var label = $('.phenomena-entry').find('.selected').text();
            Pages.togglePhenomenon(true, label);
        });
    },
    init: function() {
        $(document).ready($.proxy(function() {
            this.activateNavButtonsHandler();
            this.activateToggleButtonsHandler();
        }, this));
        // navigation
        Pages.routeToPage();
    },
    routeToPage: function() {
        var hash = window.location.hash;
        if (hash.indexOf('?') != -1) {
            hash = hash.substring(hash.indexOf('#'), hash.indexOf('?'));
        }

        Pages._routeToPage(hash);
    },
    _routeToPage: function(hash) {
        switch (hash) {
            case "#map":
                Pages.navigateToPage("#map-page");
                break;
            case "#chart":
                Pages.navigateToPage("#chart-page");
                break;
            default:
                if (Status.hasTimeseries()) {
                    $('.swc-main div.swc-page:first').addClass('swc-page-current');
                } else {
                    Pages.navigateToMap();
                }
                break;
        }
    }
};
