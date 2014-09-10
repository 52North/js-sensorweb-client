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