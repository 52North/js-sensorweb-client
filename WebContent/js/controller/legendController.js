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
var LegendController = {

	init : function() {
		EventManager.subscribe("timeseries:add", $.proxy(this.addTS, this));
		EventManager.subscribe("timeseries:remove", $.proxy(this.removeTS, this));
		EventManager.subscribe("timeseries:removeAll", $.proxy(this.removeAll, this));
		EventManager.subscribe("timeseries:selected", $.proxy(this.selectTS, this));
		EventManager.subscribe("timeseries:unselectAll", $.proxy(this.deselectAllTS, this));
		EventManager.subscribe("timeseries:data:loadfinished", $.proxy(this.checkNoData, this));
		EventManager.subscribe("timeseries:changeColor", $.proxy(this.changeColor, this));
	},

	addTS : function(event, ts) {
		var html = this.createEntry(ts);
		this.removeEntry(ts.getId());
		$('.legend-entry').append(html);
		this.addClickEvents(ts);
	},
	
	addClickEvents : function(ts) {
		$('[data-id=' + ts.getId() + '] .legendItemheader').click($.proxy(function(event){
			if(!$('[data-id=' + ts.getId() + ']').hasClass('selected')){
				EventManager.publish("timeseries:unselectAll");
				EventManager.publish("timeseries:selected", ts.getId());	
			} else {
				EventManager.publish("timeseries:unselectAll");
			}
		},this));
		$('[data-id=' + ts.getId() + '] .hideDiagram').click($.proxy(function(event){
			target = $(event.currentTarget);
			if(target.hasClass('glyphicon-eye-close')) {
				EventManager.publish("timeseries:hide", ts.getId());
			} else {
				EventManager.publish("timeseries:show", ts.getId());
			}
			target.toggleClass('glyphicon-eye-close');
			target.toggleClass('glyphicon-eye-open');
		},this));
		$('[data-id=' + ts.getId() + '] .delete').click($.proxy(function(event){
			TimeSeriesController.removeTS(ts);
		},this));
		$('[data-id=' + ts.getId() + '] .inMap').click($.proxy(function(event){
			EventManager.publish("timeseries:showInMap", ts);
		},this));
		$('[data-id=' + ts.getId() + '] .changeColor').click($.proxy(function(event){
			ColorChooserController.open(ts);
		},this));
		$('[data-id=' + ts.getId() + '] .showInfo').click($.proxy(function(event){
			$('[data-id=' + ts.getId() + ']').find('.collapseLegendEntry').toggle();
		},this));
		$('[data-id=' + ts.getId() + '] .firstLastEntry').on('click', function(event) {
			var time = $(event.currentTarget).data('firsttime');
			if (time != null) {
				EventManager.publish("time:start:change", time);
			}
			time = $(event.currentTarget).data('lasttime');
			if (time != null) {
				EventManager.publish("time:end:change", time);
			}
		});
		$('[data-id=' + ts.getId() + '] .refEntry').on('click', function(event){
			var target = $(event.currentTarget);
			target.toggleClass('selected');
			var ev;
			if(target.hasClass('selected')) {
				ev = "timeseries:add:referenceValue";
			} else {
				ev = "timeseries:remove:referenceValue";
			}
			EventManager.publish(ev, {
				"tsId" : ts.getId(), 
				"refId" : target.data('refid')
			});
		});
	},
	
	checkNoData : function(event, ts) {
		var warn = $('.legend-entry').find('[data-id=' + ts.getId() + '] .noDataWarning'); 
		if(!ts.hasData()) {
			warn.show();
		} else {
			warn.hide();
		}
	},
	
	selectTS : function(event, id) {
		$('.legend-entry').find('[data-id=' + id + ']').addClass('selected');
	},
	
	changeColor : function(event, ts) {
		this.updateEntry(ts);
	},
	
	deselectAllTS : function (event) {
		$('.legend-entry').find('.legendItem.selected').removeClass('selected');
	},
	
	removeTS : function(event, ts) {
		this.removeEntry(ts.getId());
	},
	
	removeAll : function(event) {
		$('.legend-entry').empty();
	},
	
	removeEntry : function(id) {
		$('.legend-entry').find('[data-id=' + id + ']').remove();
	},
	
	updateEntry : function(ts) {
		var html = this.createEntry(ts);
		$(html).replaceAll('.legend-entry [data-id=' + ts.getId() + ']');
		this.addClickEvents(ts);
	},

	createEntry : function(ts) {
		var meta = ts.getMetadata();
		var firstValue = meta.firstValue;
		var lastValue = meta.lastValue;
		var refValues = $.map(ts.getRefValues(), function(elem, id) {
			return {
				id : elem.getId(),
				label : elem.getLabel(),
				color : elem.getColor()
			};
		});
		var html = Template.createHtml("legend-entry", {
			id : ts.getId(),
			color : ts.getColor(),
			synced : ts.isSynced(),
			uom : (meta.uom != null) ? meta.uom : "",
			phenomenon : (meta.parameters != null) ? meta.parameters.phenomenon.label : "",
			procedure : (meta.parameters != null) ? meta.parameters.procedure.label : "",
			station : (meta.parameters != null) ? meta.station.properties.label : "",
			firstValueTime : (firstValue != null) ? firstValue.timestamp : "",
			firstValueTimeFormatted : (firstValue != null) ? moment(firstValue.timestamp).format(Settings.dateformat) : "",
			firstValue : (firstValue != null) ? firstValue.value : "",
			lastValueTime : (lastValue != null) ? lastValue.timestamp : "",
			lastValueTimeFormatted : (lastValue != null) ? moment(lastValue.timestamp).format(Settings.dateformat) : "",
			lastValue : (lastValue != null) ? lastValue.value : "",
			referenceValues : refValues
		});
		return html;
	}
};