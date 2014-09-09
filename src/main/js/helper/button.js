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
var Button = {
    switchToggleButton: function(target) {
        var button = $(target);
        button.toggleClass('btn-primary');
        if (!button.hasClass('btn-primary')) {
            return false;
        } else {
            return true;
        }
    },
    setToggleButton: function(target, value) {
        var button = $(target);
        if (value) {
            button.addClass('btn-primary');
        } else {
            button.removeClass('btn-primary');
        }
    },
    setLoadingButton: function(button, loading) {
        var icon = button.find('span');
        if (loading) {
            icon.hide();
            button.append('<span class="glyphicon glyphicon-refresh icon-spin"></span>');
        } else {
            icon.show();
            button.find('.glyphicon.glyphicon-refresh').remove();
        }
    },
    setNewIcon: function(button, className) {
        button.find('span').hide();
        button.append('<span class="glyphicon ' + className + '"></span>');
    },
    removeNewIcon: function(button, className) {
        button.find('span.' + className).remove();
        button.find('span').show();
    }
};
