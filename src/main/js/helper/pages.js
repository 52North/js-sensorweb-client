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
        var name = label == null ? _('main.phenomena') : label;
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
    init: function() {
        $(document).ready(function() {
            $('[data-toggle=legend]').click(function() {
                Pages.toggleLegend(true);
            });
            $('[data-toggle=phenomena]').click(function() {
                var label = $('.phenomena-entry').find('.selected').text();
                Pages.togglePhenomenon(true, label);
            });
            $('[data-target="#map"]').click(function() {
                Pages.navigateToMap();
            });
            $('[data-target="#chart"]').click(function() {
                Pages.navigateToChart();
            });
        });
        // navigation
        Pages.routeToPage();
    },
    routeToPage: function() {
        var hash = window.location.hash;
        if (hash.indexOf('?') != -1) {
            hash = hash.substring(hash.indexOf('#'), hash.indexOf('?'));
        }
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
