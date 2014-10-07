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
var SettingsController = {
    init: function() {
        $(document).ready(function() {
            $('[data-target="#settings"]').click(function() {
                Modal.show('settings');
                if (Settings.saveStatusPossible) {
                    // reset status
                    $('.resetStatus').on('click', function() {
                        Status.reset();
                    });
                    // save status
                    Button.setToggleButton('.saveStatus', Status.get('saveStatus'));
                    $('.saveStatus').on('click', function(e) {
                        var save = Button.switchToggleButton(e.currentTarget);
                        Status.set('saveStatus', save);
                    });
                } else {
                    $('.resetStatus').remove();
                    $('.saveStatus').remove();
                }
                // cluster station option
                Button.setToggleButton('.clusteringStations', Status.get('clusterStations'));
                $('.clusteringStations').on('click', function(e) {
                    var clustering = Button.switchToggleButton(e.currentTarget);
                    Status.set('clusterStations', clustering);
                    EventManager.publish('clusterStations', clustering);
                });
                // generalize data
                Button.setToggleButton('.generalizeData', Status.get('generalizeData'));
                $('.generalizeData').on('click', function(e) {
                    var generalize = Button.switchToggleButton(e.currentTarget);
                    Status.set('generalizeData', generalize);
                    EventManager.publish('timeseries:update:complete');
                });
                // show concentration marker
                Button.setToggleButton('.concentrationMarker', Status.get('concentrationMarker'));
                $('.concentrationMarker').on('click', function(e) {
                    var concentMarker = Button.switchToggleButton(e.currentTarget);
                    Status.set('concentrationMarker', concentMarker);
                });
                // permalink
                $('.permalink .link').on('click', function() {
                    window.open(PermalinkController.createPermalink(), '_blank');
                }).show();
                $('.permalink .mail').on('click', function() {
                    window.location.href = 'mailto:?body=' + encodeURIComponent(PermalinkController.createPermalink());
                }).show();
                $('.permalink .clipboard').on('click', function() {
                    window.prompt(_('settings.permalink.clipboardInfo'), PermalinkController.createPermalink());
                }).show();
                $('.permalink .qr').on('click', function() {
                    var img = qr.image({
                        value: PermalinkController.createPermalink(),
                        size: 5
                    });
                    $('.qr-code').find('img').remove();
                    $('.qr-code').append($(img));
                }).show();
                // imprint
                EventManager.publish('settings:opened');
            });
        });
    }

};