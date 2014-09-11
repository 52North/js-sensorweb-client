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
    groupIdx: 0,
    favoriteGroups: {},
    init: function() {
        this.key = Storage.generateKey('favorites');
        this.favoriteButton = $('.favoriteButton');
        this.favoriteButton.show();
        this.favoriteButton.on('click', $.proxy(function(event) {
            this.showFavoritesView();
        }, this));
        this.createFavoritesListView();
        EventManager.subscribe('timeseries:add', $.proxy(this.addLegendStar, this));
        EventManager.subscribe('map:stationLoaded', $.proxy(this.addStationStar, this));
        EventManager.subscribe('settings:opened', $.proxy(function() {
            var permFavButton = $(Template.createHtml('favorite-settings-button'));
            $('#accordionSettings .permalink .panel-body').append(permFavButton);
            permFavButton.on('click', $.proxy(function() {
                // TODO check if combiniation still exists
                if (!this.isInFavoriteGroup(TimeSeriesController.timeseries)) {
                    this.addFavoriteGroup(TimeSeriesController.timeseries);
                    this.saveFavorites();
                    this.updateFavoritesView();
                }
                ;
            }, this));
        }, this));
        this.loadFavorties();
    },
    navigateToFavoritesView: function() {
        Pages.navigateToPage('#favorite-page');
        Pages.toggleLegend(false);
        Pages.togglePhenomenon(false);
    },
    updateFavoritesView: function() {
        $('.favoriteslist').empty();
        $.each(this.favorites, $.proxy(function(idx, item) {
            var ts = item.timeseries;
            var lastValue = ts.getLastValue();
            var elem = Template.createHtml('favorite-entry', {
                id: ts.getInternalId(),
                label: ts.getLabel(),
                lastValueTimeFormatted: lastValue ? moment(lastValue.timestamp).format(Settings.dateformat) : '',
                lastValue: lastValue.value || '',
                uom: ts.getUom() || ''
            });
            $('.favoriteslist').append(elem);
            this.addFavoriteClickEvent(ts.getInternalId());
        }, this));
        $.each(this.favoriteGroups, $.proxy(function(idx, item) {
            var elem = Template.createHtml('favorite-group-entry', {
                id: idx,
                label: item.label,
                collection: $.map(item.collection, function(ts) {
                    var lastValue = ts.getLastValue();
                    return {
                        label: ts.getLabel(),
                        lastValueTimeFormatted: lastValue ? moment(lastValue.timestamp).format(Settings.dateformat) : '',
                        lastValue: lastValue.value || '',
                        uom: ts.getUom() || ''
                    };
                })
            });
            $('.favoriteslist').append(elem);
            this.addGroupClickEvents(idx);
        }, this));
    },
    showFavoritesView: function() {
        this.navigateToFavoritesView();
        this.updateFavoritesView();
    },
    addFavoriteClickEvent: function(id) {
        // delete
        this.addClickEvents(id, 'single-id', 'delete', $.proxy(function(evt) {
            delete this.favorites[id];
            $('[data-single-id=' + id + ']').remove();
            this.saveFavorites();
        }, this));
        // edit
        this.addClickEvents(id, 'single-id', 'edit', $.proxy(function(evt) {
            debugger;
        }, this));
        // add to diagram
        this.addClickEvents(id, 'single-id', 'addToDiagram', $.proxy(function(evt) {
            var ts = this.favorites[id];
            Pages.navigateToChart();
            TimeSeriesController.addTS(ts.timeseries);
        }, this));
    },
    addGroupClickEvents: function(id) {
        // delete
        this.addClickEvents(id, 'group-id', 'delete', $.proxy(function(evt) {
            delete this.favoriteGroups[id];
            $('[data-group-id=' + id + ']').remove();
            this.saveFavorites();
        }, this));
        // edit
        this.addClickEvents(id, 'group-id', 'edit', $.proxy(function(evt) {
            debugger;
        }, this));
        // edit
        this.addClickEvents(id, 'group-id', 'addToDiagram', $.proxy(function(evt) {
            var group = this.favoriteGroups[id];
            Pages.navigateToChart();
            $.each(group.collection, function(idx, elem) {
                TimeSeriesController.addTS(elem);
            });
        }, this));
    },
    addClickEvents: function(id, typeId, action, todo) {
        $('[data-' + typeId + '=' + id + '] .' + action).on('click', todo);
    },
    createFavoritesListView: function() {
        var list = Template.createHtml('favorites-main');
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
        var tsId = ts.getInternalId();
        $('.legendItem[data-id="' + tsId + '"]').find('.legendItemLabel .star').remove();
        var star;
        var onClick;
        if (this.favorites.hasOwnProperty(tsId)) {
            star = this.createFilledStar();
            onClick = $.proxy(function(event) {
                event.stopPropagation();
                this.removeFavorite(ts);
            }, this);
        } else {
            star = this.createEmptyStar();
            onClick = $.proxy(function(event) {
                event.stopPropagation();
                this.addFavorite(ts);
            }, this);
        }
        $('.legendItem[data-id="' + tsId + '"]').find('.legendItemLabel').append(star);
        star.on('click', onClick);
    },
    addStationStar: function() {
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
    addFavorite: function(ts, label) {
        if (ts instanceof TimeSeries) {
            this.addFavoriteToList(ts, label);
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
    addFavoriteToList: function(ts, label) {
        this.favorites[ts.getInternalId()] = {
            label: label || ts.getLabel(),
            timeseries: ts
        };
        this.saveFavorites();
    },
    addFavoriteGroup: function(tsColl, label) {
        this.favoriteGroups[this.groupIdx++] = {
            label: label || 'Status ' + this.groupIdx,
            collection: $.map(tsColl, function(elem, idx) {
                return elem;
            })
        };
        this.saveFavorites();
    },
    isInFavoriteGroup: function(tsColl) {
        var isInside = false;
        $.each(this.favoriteGroups, function(idx, elem) {
            var equivalent = true;
            if (elem.collection.length == Object.keys(tsColl).length) {
                $.each(elem.collection, function(idx, elem) {
                    var bool = false;
                    $.each(tsColl, function(idx) {
                        if (idx == elem.getInternalId()) {
                            bool = true;
                        }
                    });
                    if (!bool)
                        equivalent = false;
                });
            } else {
                equivalent = false;
            }
            if (equivalent)
                isInside = true;
        });
        return isInside;
    },
    saveFavorites: function() {
        var favorites = {
            single: $.map(this.favorites, function(elem, idx) {
                return {
                    label: elem.label,
                    timeseries: elem.timeseries.persist()
                };
            }),
            groups: $.map(this.favoriteGroups, function(group, idx) {
                return {
                    label: group.label,
                    collection: $.map(group.collection, function(ts, idx) {
                        return ts.persist();
                    })
                };
            })
        };
        Storage.saveObject(this.key, favorites);
    },
    loadFavorties: function() {
        var values = Storage.load(this.key);
        $.each(values.single, $.proxy(function(idx, elem) {
            var ts = elem.timeseries;
            var promise = Rest.timeseries(ts.tsId, ts.apiUrl);
            var that = this;
            promise.done(function(ts) {
                that.addFavorite(ts, elem.label);
            });
        }, this));
        $.each(values.groups, $.proxy(function(idx, group) {
            var label = group.label;
            var deferreds = $.map(group.collection, function(ts) {
                var promise = Rest.timeseries(ts.tsId, ts.apiUrl);
                return promise;
            });
            $.when.apply(null, deferreds).done($.proxy(function() {
                this.addFavoriteGroup(arguments, label);
            }, this));
        }, this));
    }
};