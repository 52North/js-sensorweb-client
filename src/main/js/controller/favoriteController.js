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
        this.activateImportExportHandlers();
        EventManager.subscribe('timeseries:add', $.proxy(this.addLegendStar, this));
        EventManager.subscribe('timeseries:changeStyle', $.proxy(this.addLegendStar, this));
        EventManager.subscribe('map:stationLoaded', $.proxy(this.addStationStar, this));
        EventManager.subscribe('settings:opened', $.proxy(function() {
            var permFavButton = $(Template.createHtml('favorite-settings-button'));
            $('#accordionSettings .permalink .panel-body').append(permFavButton);
            permFavButton.on('click', $.proxy(function() {
                if (Object.keys(TimeSeriesController.timeseries).length > 0) {
                    if (!this.isInFavoriteGroup(TimeSeriesController.timeseries)) {
                        var label = this.addFavoriteGroup(TimeSeriesController.timeseries);
                        this.saveFavorites();
                        NotifyController.notify(_('favorite.group.add').replace('{0}', label));
                    } else {
                        NotifyController.notify(_('favorite.group.exists'));
                    }
                } else {
                    NotifyController.notify(_('favorite.group.noTimeseries'));
                }
            }, this));
        }, this));
        this.loadFavorites();
    },
    navigateToFavoritesView: function() {
        Pages.navigateToPage('#favorite-page');
        Pages.toggleLegend(false);
        Pages.togglePhenomenon(false);
    },
    clearFavoritesView: function() {
        $('#favorites-list').empty();
    },
    updateFavoritesView: function() {
        this.clearFavoritesView();
        $.each(this.favorites, $.proxy(function(idx, item) {
            this.drawFavorite(item);
        }, this));
        $.each(this.favoriteGroups, $.proxy(function(idx, item) {
            this.drawFavoriteGroup(item, idx);
        }, this));
    },
    drawFavorite: function(favorite) {
        var ts = favorite.timeseries;
        var lastValue = ts.getLastValue();
        var elem = Template.createHtml('favorite-entry', {
            id: ts.getInternalId(),
            label: favorite.label,
            provider: ts.getServiceLabel(),
            lastValueTimeFormatted: lastValue ? moment(lastValue.timestamp).format(Settings.dateformat) : '',
            lastValue: lastValue.value || '',
            uom: ts.getUom() || ''
        });
        $('#favorites-list').append(elem);
        this.addFavoriteClickEvent(ts.getInternalId());
    },
    drawFavoriteGroup: function(favGroup, idx) {
        var elem = Template.createHtml('favorite-group-entry', {
            id: idx,
            label: favGroup.label,
            collection: $.map(favGroup.collection, function(ts) {
                var lastValue = ts.getLastValue();
                return {
                    label: ts.getLabel(),
                    lastValueTimeFormatted: lastValue ? moment(lastValue.timestamp).format(Settings.dateformat) : '',
                    lastValue: lastValue.value || '',
                    uom: ts.getUom() || ''
                };
            })
        });
        $('#favorites-list').append(elem);
        this.addGroupClickEvents(idx);
    },
    showFavoritesView: function() {
        this.navigateToFavoritesView();
    },
    addFavoriteClickEvent: function(id) {
        // delete
        this.addClickEvents(id, 'single-id', 'delete', $.proxy(function(evt) {
            this.removeFavorite(id);
//            delete this.favorites[id];
//            $('[data-single-id=' + id + ']').remove();
//            var star = $('.star', '[data-id=' + id + ']');
//            if (star) {
//                star.addClass('glyphicon-star-empty').removeClass('glyphicon-star');
//            }
            this.saveFavorites();
        }, this));
        // edit
        this.addClickEvents(id, 'single-id', 'edit', $.proxy(function(evt) {
            this.openEditWindow(this.favorites[id]);
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
            this.openEditWindow(this.favoriteGroups[id]);
        }, this));
        // add to diagram
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
    openEditWindow: function(entry) {
        Modal.show("favorite-edit", {
            label: entry.label
        });
        // add click event for button...
        $('#confirmFavoritEdit').on('click', $.proxy(function(e) {
            entry.label = $('#favoriteLabel')[0].value;
            this.saveFavorites();
            this.updateFavoritesView();
        }, this));
    },
    createFavoritesListView: function() {
        var list = Template.createHtml('favorites-main');
        $('.swc-main').append(list);
        Pages.activateNavButtonsHandler();
    },
    activateImportExportHandlers: function() {
        var fileImport = $('#favorites-file-import');
        var fileExport = $('#favorites-file-export');
        fileImport.change($.proxy(this.importFavorites, this));
        fileExport.click($.proxy(this.exportFavorites, this));
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
                var label = this.removeFavorite(ts);
                NotifyController.notify(_('favorite.single.remove').replace('{0}', label));
            }, this);
        } else {
            star = this.createEmptyStar();
            onClick = $.proxy(function(event) {
                event.stopPropagation();
                var label = this.addFavorite(ts);
                NotifyController.notify(_('favorite.single.add').replace('{0}', label));
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
                onClick = $.proxy(function(event) {
                    event.stopPropagation();
                    var label = this.removeFavorite(internalID);
                    NotifyController.notify(_('favorite.single.remove').replace('{0}', label));
                    this.addStationStar();
                }, this);
            } else {
                star = this.createEmptyStar();
                onClick = $.proxy(function(event) {
                    event.stopPropagation();
                    var promise = Rest.timeseries(item.dataset.id, Status.get('provider').apiUrl);
                    promise.done($.proxy(function(ts) {
                        var label = this.addFavorite(ts);
                        NotifyController.notify(_('favorite.single.add').replace('{0}', label));
                        this.addStationStar();
                    }, this));
                }, this);
            }
            $(item).find('.checkbox label').after(star);
            star.on('click', onClick);
        }, this));
    },
    addFavorite: function(ts, label) {
        label = this.addFavoriteToList(ts, label);
        this.addLegendStar(null, ts);
        return label;
    },
    removeFavorite: function(ts) {
        if (!(ts instanceof TimeSeries)) {
            ts = this.favorites[ts].timeseries;
        }
        var id = ts.getInternalId();
        var label = this.favorites[id].label;
        delete this.favorites[id];
        $('[data-single-id=' + id + ']').remove();
        this.addLegendStar(null, ts);
        return label;
    },
    addFavoriteToList: function(ts, label) {
        label = label || ts.getLabel();
        this.favorites[ts.getInternalId()] = {
            label: label,
            timeseries: ts
        };
        this.saveFavorites();
        this.drawFavorite(this.favorites[ts.getInternalId()]);
        return label;
    },
    hasFavorites: function() {
        return Object.getOwnPropertyNames(this.favorites).length !== 0;
    },
    addFavoriteGroup: function(tsColl, label) {
        label = label || 'Status ' + this.groupIdx;
        this.favoriteGroups[this.groupIdx] = {
            label: label,
            collection: $.map(tsColl, function(elem, idx) {
                return elem;
            })
        };
        this.saveFavorites();
        this.drawFavoriteGroup(this.favoriteGroups[this.groupIdx], this.groupIdx);
        this.groupIdx++;
        return label;
    },
    isInFavoriteGroup: function(tsColl) {
        var isInside = false;
        $.each(this.favoriteGroups, function(idx, elem) {
            var equivalent = true;
            if (elem.collection.length === Object.keys(tsColl).length) {
                $.each(elem.collection, function(idx, elem) {
                    var bool = false;
                    $.each(tsColl, function(idx) {
                        if (idx === elem.getInternalId()) {
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
        var favorites = this.serializeFavorites();
        Storage.saveObject(this.key, favorites);
    },
    loadFavorites: function() {
        var values = Storage.load(this.key);
        this.unserializeFavorites(values);
    },
    unserializeFavorites: function(values) {
        if (values) {
            $.each(values.single, $.proxy(function(idx, elem) {
                var ts = elem.timeseries;
                if (this.isSupported(ts)) {
                    var promise = Rest.timeseries(ts.tsId, ts.apiUrl);
                    var that = this;
                    promise.done(function (ts) {
                        that.addFavorite(ts, elem.label);
                    });
                } else {
                    NotifyController.notify(_('favorite.single.notSupported').replace('{0}', elem.label));
                }
            }, this));
            $.each(values.groups, $.proxy(function(idx, group) {
                var label = group.label;
                var deferreds = $.map(group.collection, $.proxy(function(ts) {
                    if (this.isSupported(ts)) {
                        var promise = Rest.timeseries(ts.tsId, ts.apiUrl);
                        return promise;
                    } else {
                        NotifyController.notify(_('favorite.group.notSupported').replace('{0}', label));
                    }
                }, this));
                $.when.apply(null, deferreds).done($.proxy(function() {
                    debugger
                    this.addFavoriteGroup(arguments, label);
                }, this));
            }, this));
        }
    },
    // checks if the provider of the timeseries is configured in the client
    isSupported: function(ts) {
        var supported = false;
        $.each(Settings.restApiUrls, function(idx,elem) {
            if (ts.apiUrl === idx) supported = true;
        });
        return supported;
    },
    serializeFavorites: function() {
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
        return favorites;
    },
    exportFavorites: function() {
        if (this.isFileAPISupported()) {
            var filename = 'favorites.json';
            var content = JSON.stringify(this.serializeFavorites());
            if (window.navigator.msSaveBlob) {
                // IE version >= 10
                var blob = new Blob([content], {
                    type: 'application/json;charset=utf-8;'
                });
                window.navigator.msSaveBlob(blob, filename);
            } else {
                // FF, Chrome ...
                var a = document.createElement('a');
                a.href = 'data:application/json,' + encodeURI(content);
                a.target = '_blank';
                a.download = filename;
                document.body.appendChild(a);
                a.click();
            }
        } else {
            Inform.warn('The File APIs are not fully supported in this browser.');
        }
    },
    importFavorites: function(event) {
        if (this.isFileAPISupported()) {
            var override = true;
            if (this.hasFavorites()) {
                override = confirm('Override favorites?');
            }
            if (override) {
                this.favorites = {};
                this.clearFavoritesView();
                var files = event.target.files;
                if (files && files.length > 0) {
                    var reader = new FileReader();
                    reader.readAsText(files[0]);
                    reader.onerror = function() {
                        Inform.error('Could not read file!');
                    };
                    var that = this;
                    reader.onload = function(e) {
                        var content = JSON.parse(e.target.result);
                        that.unserializeFavorites(content);
                        that.saveFavorites();
                    };
                }
            }
        } else {
            Inform.warn('The File APIs are not fully supported in this browser.');
        }
    },
    isFileAPISupported: function() {
        return window.File && window.FileReader && window.Blob;
    }

};