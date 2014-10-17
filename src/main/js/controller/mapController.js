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
var Map = {
    defaultTileLayerUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    defaultTileLayerOptions: {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    },
    timeseriesCache: [],
    init: function() {
        this.tileLayerUrl = Settings.tileLayerUrl || this.defaultTileLayerUrl;
        this.tileLayerOptions = Settings.tileLayerOptions || this.defaultTileLayerOptions;
        $(document).ready(function() {
            $('[data-action="provider"]').click(function() {
                Map.openProviderList();
            });
            $('[data-action="locate"]').click(function() {
                Map.locateUser();
            });
        });
        this.loadStations();
        EventManager.subscribe("resetStatus", $.proxy(this.loadStations, this));
        EventManager.subscribe("clusterStations", $.proxy(this.loadStations, this));
        EventManager.subscribe("timeseries:showInMap", $.proxy(this.showTsInMap, this));
    },
    createMap: function() {
        if ($("#map").length > 0) {
            this.map = L.map('map');
            L.tileLayer(this.tileLayerUrl, this.tileLayerOptions).addTo(this.map);
            var overlayMaps = {};
            $.each(Settings.wmsLayer, $.proxy(function(idx, layer) {
                try {
                    var wms = L.tileLayer.wms(layer.url, layer.options).addTo(this.map);
                    overlayMaps[layer.name] = wms;
                } catch (e) {
                    console.error('Could not add wms.');
                };
            }, this));
            if (!$.isEmptyObject(overlayMaps)) {
                L.control.layers(null, overlayMaps, {
                    position: 'topleft'
                }).addTo(this.map);
            }
            L.Icon.Default.imagePath = 'images';
            this.map.whenReady(function(map) {
                // locate user methods
                this.map.on('locationfound', this.onLocationFound);
                this.map.on('locationerror', this.onLocationError);
            }, this);

            L.control.scale().addTo(this.map);
            if (Settings.enableGeoSearch) {
                new L.Control.GeoSearch({
                    url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
                    jsonpParam: 'json_callback',
                    propertyName: 'display_name',
                    searchLabel: _('map.search.label'),
                    notFoundMessage: _('map.search.noResult'),
                    propertyLoc: ['lat', 'lon'],
                    position: 'topcenter',
                    minLength: 2,
                    showMarker: false,
                    provider: new L.GeoSearch.Provider.OpenStreetMap(),
                    zoomLevel: 13
                }).addTo(this.map);
            }
        }
    },
    /*----- stations -----*/
    loadStations: function() {
        this.loading(true);
        var provider = Status.get('provider');
        Rest.stations(null, provider.apiUrl, {
            service: provider.serviceID
        }).done($.proxy(function(result) {
            this.createStationMarker(result, Status.get('clusterStations'));
            this.loading(false);
        }, this));
        Rest.phenomena(null, provider.apiUrl, {
            service: provider.serviceID
        }).done($.proxy(this.fillPhenomenaList, this));
    },
    createStationMarker: function(results, clustering) {
        if (!this.map) {
            this.createMap();
        }
        if (this.stationMarkers) {
            this.map.removeLayer(this.stationMarkers);
        }
        if (results.length > 0) {
            var firstElemCoord = results[0].geometry.coordinates;
            var topmost = firstElemCoord[1];
            var bottommost = firstElemCoord[1];
            var leftmost = firstElemCoord[0];
            var rightmost = firstElemCoord[0];
            this.stationMarkers = clustering ? new L.MarkerClusterGroup() : new L.LayerGroup();
            that = this;
            $.each(results, $.proxy(function(n, elem) {
                var geom = elem.geometry.coordinates;
                if (!isNaN(geom[0]) || !isNaN(geom[1])) {
                    if (geom[0] > rightmost) {
                        rightmost = geom[0];
                    }
                    if (geom[0] < leftmost) {
                        leftmost = geom[0];
                    }
                    if (geom[1] > topmost) {
                        topmost = geom[1];
                    }
                    if (geom[1] < bottommost) {
                        bottommost = geom[1];
                    }
                    var marker = new L.Marker([geom[1], geom[0]], {
                        id: elem.properties.id
                    });
                    marker.on('click', $.proxy(that.markerClicked, that));
                    this.stationMarkers.addLayer(marker);
                }
            }, this));
            this.map.addLayer(this.stationMarkers);
            this.map.fitBounds([
                [parseFloat(bottommost), parseFloat(leftmost)],
                [parseFloat(topmost), parseFloat(rightmost)]]);
        }
    },
    createColoredMarkers: function(results) {
        if (this.stationMarkers) {
            this.map.removeLayer(this.stationMarkers);
        }
        if (results.length > 0) {
            var firstElemCoord = results[0].getCoordinates();
            var topmost = firstElemCoord[1];
            var bottommost = firstElemCoord[1];
            var leftmost = firstElemCoord[0];
            var rightmost = firstElemCoord[0];
            this.stationMarkers = new L.LayerGroup();
            that = this;
            $.each(results, $.proxy(function(n, elem) {
                var geom = elem.getCoordinates();
                if (!isNaN(geom[0]) || !isNaN(geom[1])) {
                    if (geom[0] > rightmost) {
                        rightmost = geom[0];
                    }
                    if (geom[0] < leftmost) {
                        leftmost = geom[0];
                    }
                    if (geom[1] > topmost) {
                        topmost = geom[1];
                    }
                    if (geom[1] < bottommost) {
                        bottommost = geom[1];
                    }
                    var marker;
                    if (elem.isCurrent()) {
                        var interval = this.getMatchingInterval(elem);
                        var fillcolor = interval && interval.color ? interval.color : Settings.defaultMarkerColor;
                        marker = new L.circleMarker([geom[1], geom[0]], {
                            id: elem.getStationId(),
                            fillColor: fillcolor,
                            color: "#000",
                            opacity: 1,
                            weight: 2,
                            fillOpacity: 0.8
                        });
                    } else {
                        marker = new L.Marker([geom[1], geom[0]], {
                            id: elem.getStationId()
                        });
                    }
                    marker.on('click', $.proxy(that.markerClicked, that));
                    this.stationMarkers.addLayer(marker);
                }
            }, this));
            this.map.addLayer(this.stationMarkers);
            this.map.fitBounds([
                [parseFloat(bottommost), parseFloat(leftmost)],
                [parseFloat(topmost), parseFloat(rightmost)]]);
        }
    },
    getMatchingInterval: function(elem) {
        var matchedInterval = null;
        if (elem.getLastValue() && elem.getStatusIntervals()) {
            var lastValue = elem.getLastValue().value;
            $.each(elem.getStatusIntervals(), function(idx, interval) {
                if (interval.upper == null) {
                    interval.upper = Number.MAX_VALUE;
                }
                if (interval.lower == null) {
                    interval.lower = Number.MIN_VALUE;
                }
                if (!isNaN(interval.upper) && !isNaN(interval.lower) && parseFloat(interval.lower) < lastValue && lastValue < parseFloat(interval.upper)) {
                    matchedInterval = interval;
                    return false;
                }
            });
        }
        return matchedInterval;
    },
    loading: function(loading) {
        Button.setLoadingButton($('[data-action="provider"]'), loading);
    },
    markerClicked: function(marker) {
        this.loading(true);
        var apiUrl = Status.get('provider').apiUrl;
        this.openStationWindow(marker.target.options.id, apiUrl);
    },
    openStationWindow: function(id, url) {
        Rest.stations(id, url).done($.proxy(function(results) {
            var phenomena = {};
            $.each(results.properties.timeseries, function(id, elem) {
                var phenomID = elem.phenomenon.id;
                if (Map.selectedPhenomenon == null || Map.selectedPhenomenon == phenomID) {
                    if (!phenomena.hasOwnProperty(phenomID)) {
                        phenomena[phenomID] = {};
                        phenomena[phenomID].timeseries = [];
                        phenomena[phenomID].label = elem.phenomenon.label;
                        phenomena[phenomID].category = elem.category && elem.category.label ? elem.category.label : "";
                    }
                    phenomena[phenomID].timeseries.push({
                        id: id,
                        internalId: tsHelper.createInternalId(id, url),
                        selected: Status.hasTimeseriesWithId(id),
                        procedure: elem.procedure.label,
                        category: elem.category && elem.category.label ? elem.category.label : ""
                    });
                }
            });
            this.loading(false);
            Modal.show("station", {
                "name": results.properties.label,
                "phenomena": $.map(phenomena, function(elem) {
                    return elem;
                })
            });
            $('#confirmTimeseriesSelection').on('click', function() {
                $.each($('.tsItem').has(':checked'), function(id, elem) {
                    Map.addTimeseries(Map.timeseriesCache[$(this).data('internalid')]);
                });
            });
            if ($('.tsItem').length > 1) {
                $('.selectAllOption').show();
                $('.selectAllOption .checkbox').on('click', function(event) {
                    var checked = $(event.currentTarget).find(':checkbox').is(':checked');
                    $.each($('.tsItem'), function(idx, elem) {
                        $(elem).find(':checkbox').prop('checked', checked);
                    });
                });
            } else {
                $('.tsItem').find(':checkbox').prop('checked', true);
            }
            $.each(phenomena, function(id, elem) {
                $.each(elem.timeseries, function(id, elem) {
                    if (Map.timeseriesCache[elem.internalId] == null) {
                        Rest.timeseries(elem.id, url).done(function(timeseries) {
                            Map.updateTsEntry(timeseries);
                        });
                    } else {
                        Map.updateTsEntry(Map.timeseriesCache[elem.internalId]);
                    }
                });
            });
            EventManager.publish("map:stationLoaded");
        }, this));
    },
    updateTsEntry: function(timeseries) {
        $('[data-id=' + timeseries.getTsId() + ']').addClass('loaded').find(':input').prop('disabled', false);
        var lastValue = timeseries.getLastValueFormatted();
        if (lastValue) {
            $('[data-id=' + timeseries.getTsId() + ']').find('.additionalInfo').text(lastValue).show();
        }
        Map.timeseriesCache[timeseries.getInternalId()] = timeseries;
    },
    addTimeseries: function(timeseries) {
        Pages.navigateToChart();
        Modal.hide();
        TimeSeriesController.addTS(timeseries);
    },
    /*----- stations -----*/
    fillPhenomenaList: function(results) {
        Pages.togglePhenomenon(false);
        $('.phenomena-entry').empty();
        this.createDefaultPhenomenaEntry();
        $.each(results, $.proxy(function(index, elem) {
            var html = this.createPhenomenaEntry(elem);
            $('.phenomena-entry').append(html);
            $('[data-id=' + elem.id + ']').click($.proxy(function(event) {
                $('.phenomena-entry').find('.selected').removeClass('selected');
                $('[data-id=' + elem.id + ']').find('.item').addClass('selected').addClass('loadPhen');
                this.selectedPhenomenon = elem.id;
                var coloredMarkers = Status.get('concentrationMarker');
                var provider = Status.get('provider');
                Rest.abortRequest(this.phenomenonPromise);
                if (coloredMarkers) {
                    this.phenomenonPromise = Rest.timeseries(null, provider.apiUrl, {
                        service: provider.serviceID,
                        phenomenon: elem.id,
                        expanded: true,
                        force_latest_values: true,
                        status_intervals: true
                    }).done($.proxy(function(result) {
                        $.each(result, function(idx, elem) {
                            Map.timeseriesCache[elem.getInternalId()] = elem;
                        });
                        Pages.togglePhenomenon(false, elem.label);
                        this.createColoredMarkers(result);
                    }, this)).always($.proxy(function() {
                        $('[data-id=' + elem.id + ']').find('.item').removeClass('loadPhen');
                    }));
                } else {
                    this.phenomenonPromise = Rest.stations(null, provider.apiUrl, {
                        service: provider.serviceID,
                        phenomenon: elem.id
                    }).done($.proxy(function(result) {
                        Pages.togglePhenomenon(false, elem.label);
                        this.createStationMarker(result, false);
                    }, this)).always($.proxy(function() {
                        $('[data-id=' + elem.id + ']').find('.item').removeClass('loadPhen');
                    }));
                }
            }, this));
        }, this));
    },
    createPhenomenaEntry: function(phenomenon) {
        this.selectedPhenomenon = null;
        var html = Template.createHtml("phenomenon-entry", {
            id: phenomenon.id,
            label: phenomenon.label
        });
        return html;
    },
    createDefaultPhenomenaEntry: function() {
        $('.phenomena-entry').append(this.createPhenomenaEntry({
            id: "all",
            label: _('main.phenomena')
        }));
        $('[data-id=all]').click($.proxy(function(event, bla) {
            $('.phenomena-entry').find('.selected').removeClass('selected');
            $('[data-id=all]').find('.item').addClass('selected');
            Pages.togglePhenomenon(false);
            Map.loadStations();
        }));
        $('[data-id=all]').find('.item').addClass('selected');
    },
    /*----- provider list -----*/
    openProviderList: function() {
        this.loading(true);
        this.apiConnectCounter = Object.keys(Settings.restApiUrls).length;
        this.providerList = [];
        $.each(Settings.restApiUrls, $.proxy(function(url, elem) {
            Rest.services(url).done($.proxy(this.createProviderList, this, url));
        }, this));
    },
    createProviderList: function(apiUrl, results) {
        this.apiConnectCounter--;
        var currProv = Status.get('provider');
        $.each(results, $.proxy(function(idx, elem) {
            var blacklisted = false;
            $.each(Settings.providerBlackList, $.proxy(function(idx, black) {
                if (black.serviceID == elem.id && black.apiUrl == apiUrl) {
                    blacklisted = true;
                    return;
                }
            }, this));
            if (!blacklisted) {
                this.providerList.push({
                    "name": elem.label,
                    "version": elem.version,
                    "stations": elem.quantities.stations,
                    "timeseries": elem.quantities.timeseries,
                    "phenomena": elem.quantities.phenomena,
                    "url": elem.serviceUrl,
                    "apiUrl": apiUrl,
                    "id": elem.id,
                    "selected": currProv.serviceID == elem.id && currProv.apiUrl == apiUrl,
                    "type": elem.type
                });
            }
        }, this));
        if (this.apiConnectCounter === 0) {
            var data = {
                "providers": this.providerList
            };
            this.loading(false);
            Modal.show('providers', data);
            $('.providerItem').on('click', function() {
                var id = $(this).data('id');
                var apiUrl = $(this).data('api');
                Status.set('provider', {
                    serviceID: id,
                    apiUrl: apiUrl
                });
                Map.loadStations();
                Modal.hide();
            });
        }
    },
    /*----- locate user -----*/
    locateUser: function() {
        Button.setLoadingButton($('[data-action="locate"]'), true);
        this.map.locate({
            setView: true,
            maxZoom: Settings.zoom
        });
    },
    onLocationFound: function(e) {
        Button.setLoadingButton($('[data-action="locate"]'), false);
        var popup = L.popup().setLatLng(e.latlng).setContent('<p>' + _('map.userLocation') + '</p>');
        Map.map.openPopup(popup);
    },
    onLocationError: function(e) {
        Button.setLoadingButton($('[data-action="locate"]'), false);
        Inform.error(e.message);
    },
    showTsInMap: function(event, ts) {
        Pages.navigateToMap();
        var coords = ts.getCoordinates(), pos = L.latLng(coords[1], coords[0]);
        Map.map.setView(pos, Settings.zoom);
        var station = null;
        $.each(this.stationMarkers.getLayers(), function(idx, marker) {
            if (marker.options.id == ts.getStationId()) {
                station = marker;
            }
        });
        var popup = L.popup({
            autoPan: false
        });
        popup.setContent(Template.createHtml("station-popup", {
            station: ts.getStationLabel(),
            timeseries: ts.getLabel(),
            service: ts.getServiceLabel()
        }));
        if (station) {
            setTimeout(function() {
                station.bindPopup(popup).openPopup();
            }, 1000);
        } else {
            popup.setLatLng(pos);
            popup.openOn(Map.map);
        }
        popup.on('close', function() {
            if (station) {
                station.unbindPopup();
            }
        });
    }
};
