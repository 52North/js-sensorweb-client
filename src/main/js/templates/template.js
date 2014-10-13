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
var Template = {
    getTemplate: function(name) {
        var template = "";
        $.ajax({
            url: 'templates/' + name + '.html',
            success: function(data) {
                template = data;
            },
            dataType: "text",
            async: false
        });
        return template;
    },
    createHtml: function(templateID, data) {
        var template = Template.getTemplate(templateID);
        return Mustache.to_html(template, data);
    }
};