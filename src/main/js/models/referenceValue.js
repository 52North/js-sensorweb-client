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
function ReferenceValue(id, label) {

    var color = Color.stringToColor(id);
    var values = [];
    var selected = false;

    this.getId = function() {
        return id;
    };

    this.getLabel = function() {
        return label;
    };

    this.getColor = function() {
        return color;
    };

    this.getValues = function() {
        return values;
    };

    this.setValues = function(v) {
        values = v;
    };

    this.isSelected = function() {
        return selected;
    };

    this.selected = function(s) {
        selected = s;
    };
}