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
var FavoriteController = {
    favorites: {},
    init: function() {
        this.favoriteButton = $('.favoriteButton');
        this.favoriteButton.show();
        this.favoriteButton.on('click', $.proxy(function(event) {
            this.showFavoritesView();
        }, this));
        this.createFavoritesListView();
        EventManager.subscribe('timeseries:add', $.proxy(this.addLegendStar, this));
        EventManager.subscribe('map:stationLoaded', $.proxy(this.addStationStar, this));
    },
    showFavoritesView: function() {
        Pages.navigateToPage("#favorite-page");
        $('.favoriteslist').empty();
        $.each(this.favorites, function(idx, item) {
            debugger;
            var lastValue = item.getLastValue();
            var elem = Template.createHtml("favorite-entry", {
                id: item.getInternalId(),
                label: item.getLabel(),
                lastValueTimeFormatted: (lastValue != null) ? moment(lastValue.timestamp).format(Settings.dateformat) : "",
                lastValue: lastValue.value || "",
                uom: item.getUom() || ""
            });
            $('.favoriteslist').append(elem);
        });
    },
    createFavoritesListView: function() {
        var list = Template.createHtml("favorites-main");
        $('.swc-main').append(list);
        Pages.activatedClickHandler();
    },
    createEmptyStar: function() {
        return $('<span class="glyphicon glyphicon-star-empty star"></span>');
    },
    createFilledStar: function() {
        return $('<span class="glyphicon glyphicon-star star"></span>');
    },
    addLegendStar: function(evt, ts) {
        debugger;
        var tsId = ts.getInternalId();
        $('.legendItem[data-id="' + tsId + '"]').find('.legendItemLabel .star').remove();
        var star;
        var onClick;
        if (this.favorites.hasOwnProperty(tsId)) {
            star = this.createFilledStar();
            onClick = $.proxy(function(event) {
                event.stopPropagation();
                this.removeFavorite(ts);
//                this.addLegendStar(null, ts);
            }, this);
        } else {
            star = this.createEmptyStar();
            onClick = $.proxy(function(event) {
                event.stopPropagation();
                this.addFavorite(ts);
//                this.addLegendStar(null, ts);
            }, this);
        }
        $('.legendItem[data-id="' + tsId + '"]').find('.legendItemLabel').append(star);
        star.on('click', onClick);
    },
    addStationStar: function(evt) {
        $.each($('.stationContent .tsItem'), $.proxy(function(idx, item) {
            var star;
            var onClick;
            var internalID = item.dataset.internalid;
            $(item).find('.checkbox .star').remove();
            if (this.favorites.hasOwnProperty(internalID)) {
                star = this.createFilledStar();
                onClick = $.proxy(function(evt) {
                    event.stopPropagation();
                    this.removeFavorite(internalID);
                    this.addStationStar();
                }, this);
            } else {
                star = this.createEmptyStar();
                onClick = $.proxy(function(evt) {
                    event.stopPropagation();
                    this.addFavorite(internalID);
                    this.addStationStar();
                }, this);
            }
            $(item).find('.checkbox label').after(star);
            star.on('click', onClick);
        }, this));
    },
    addFavorite: function(ts) {
        if (ts instanceof TimeSeries) {
            this.addFavoriteToList(ts);
            this.addLegendStar(null, ts);
        } else {
            this.favorites[ts] = ts;
            // TODO get metadata...
        }
    },
    removeFavorite: function(ts) {
        if (ts instanceof TimeSeries) {
            delete this.favorites[ts.getInternalId()];
            this.addLegendStar(null, ts);
        } else {
            delete this.favorites[ts];
        }

    },
    addFavoriteToList: function(ts) {
        this.favorites[ts.getInternalId()] = ts;
        // TODO save list to local storage
    }
};