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
var Button = {
	switchToggleButton : function(target) {
		var button = $(target);
		button.toggleClass('btn-primary');
		if (!button.hasClass('btn-primary')) {
			return false;
		} else {
			return true;
		}
	},

	setToggleButton : function(target, value) {
		var button = $(target);
		if (value) {
			button.addClass('btn-primary');
		} else {
			button.removeClass('btn-primary');
		}
	},
	
	setLoadingButton : function(button, loading) {
		var icon = button.find('span');
		if (loading) {
			icon.hide();
			button.append('<span class="glyphicon glyphicon-refresh icon-spin"></span>');
		} else {
			icon.show();
			button.find('.glyphicon.glyphicon-refresh').remove();
		}
	}
};
