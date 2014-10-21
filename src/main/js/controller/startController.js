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
var StartController = {
    init: function(settings) {
        jQuery.support.cors = true;
        this.loadMainPage();
        // merge settings
        $.extend(Settings, settings);
        NotifyController.init();
        Status.init();
        // Call all controller
        PermalinkController.init();
        Pages.init();
        Map.init();
        ListSelectionController.init();
        LegendController.init();
        TableController.init();
        TimeController.init();
        ChartController.init();
        TimeSeriesController.init();
        GuidedTourController.init();
        ExportController.init();
        StyleChangeController.init();
        FavoriteController.init();
        SettingsController.init();
    },
    loadMainPage: function(){
        var main = Template.createHtml("main");
        $('.jsc-main').append(main);
    }
};