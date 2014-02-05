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
var ChartController = {

	options : {
		series : {
			lines : {
				show : true,
//				lineWidth: 1,
				fill : false
			},
			shadowSize : 1
		},
		selection : {
			mode : "xy"
		},
		xaxis : {
			mode : "time",
			// timeformat: "%Y/%m/%d",
			tickLength : 5
		},
		yaxis : {
			show : true
		},
		legend : {
		// show: false
		}
	},
	visible : true,
	
	data : [],
	
	init : function() {
		EventManager.subscribe("timeseries:data:load", $.proxy(this.loadDataForChart, this));
		EventManager.subscribe("timeseries:data:loadfinished", $.proxy(this.loadDataFinished, this));
		EventManager.subscribe("timeseries:synced", $.proxy(this.plotChart, this));
		EventManager.subscribe("timeseries:add:referenceValue", $.proxy(this.showReferenceValue, this));
		EventManager.subscribe("timeseries:remove:referenceValue", $.proxy(this.removeReferenceValue, this));
		EventManager.subscribe("timeseries:remove", $.proxy(this.removeTS, this));
		EventManager.subscribe("timeseries:removeAll", $.proxy(this.clearChart, this));
		EventManager.subscribe("timeseries:hide", $.proxy(this.hideData, this));
		EventManager.subscribe("timeseries:show", $.proxy(this.showData, this));
		EventManager.subscribe("navigation:open", $.proxy(this.hideChart, this));
		EventManager.subscribe("navigation:close", $.proxy(this.showChart, this));
		
		$(window).resize($.proxy(function() {
			var newRatio = $(document).width() / $(document).height();
			if (newRatio != window.ratio) {
				window.ratio = newRatio;
				this.plotChart();
			}
		}, this));
		$('[data-action=selection]').hide();
		$('[data-action=selection]').on('click', $.proxy(function(){
			EventManager.publish("timeseries:unselectAll");
			this.renderChart();
			$('[data-action=selection]').hide();
		}, this));
	},
	
	hideChart : function(event, view) {
		this.visible = false;
		$('#placeholder').hide();
	},
	
	showChart : function(event, view) {
		this.visible = true;
		$('#placeholder').show();
		this.plotChart();
	},
	
	hideData : function(event, id) {
		this.removeData(id);
		this.plotChart();
	},
	
	showData : function(event, id) {
		var ts = TimeSeriesController.getTimeseriesCollection()[id];
		this.loadDataFinished(null, ts);
		this.plotChart();
	},
	
	loadDataForChart : function(event, ts) {
		if(this.visible) {
			$('#placeholder').hide();
			var label = ts.getMetadata().label;
			var html = Template.createHtml("data-loading-entry", {
				id : ts.getId(),
				color : ts.getColor(),
				label : label
			});
			$('#loadingDiagram').append(html);
		}
	},
	
	loadDataFinished : function(event, ts) {
		$('#loadingDiagram').find('[data-id=' + ts.getId() + ']').remove();
		$.each(ts.getRefValues(), $.proxy(function(id, elem) {
			var refVal = this.dataAlreadyIn(elem.getId());
			if (refVal != null) {
				refVal.data = elem.getValues();
			}
		}, this));
		if(ts.hasData()) {
			var temp = this.dataAlreadyIn(ts.getId());
			if(temp != null) {
				temp.data = ts.getValues();
			} else {
				this.data.push({
					data : ts.getValues(),
					id : ts.getId(),
					color : "#" + ts.getColor(),
					uom : ts.getMetadata().uom
				});
			};
		} else {
			this.removeData(ts.getId());
		}
	},
	
	removeTS : function(event, ts) {
		$('#loadingDiagram').find('[data-id=' + ts.getId() + ']').remove();
		this.removeData(ts.getId());
		// remove ref values
		$.each(ts.getRefValues(), $.proxy(function(index, elem) {
			this.removeData(elem.getId());
		}, this));
		this.plotChart();
	},
	
	showReferenceValue : function(event, data) {
		var ts = TimeSeriesController.getTimeseriesCollection()[data.tsId];
		var refVal = ts.getRefValuesForId(data.refId);
		this.data.push({
			data : refVal.getValues(),
			id : refVal.getId(),
			color : refVal.getColor(),
			uom : ts.getMetadata().uom
		});
		this.plotChart();
	},
	
	removeReferenceValue : function(event, data) {
		this.removeData(data.refId);
		this.plotChart();
	},
	
	clearChart : function() {
		this.data = [];
		this.plotChart();
	},
	
	plotChart : function() {
		if(this.visible){
			$('#placeholder').show();
			this.createAxis();
			if (this.data.length > 0) {
				this.plot = $.plot("#placeholder", this.data, this.options);
				$.each(this.plot.getAxes(), $.proxy(function(i, axis){
					if(!axis.show) return;
					var box = axis.box;
					var start;
					if(axis.direction == "y") {
						$("<div class='axisTarget' style='position:absolute; left:" + box.left + "px; top:" + box.top + "px; width:" + box.width +  "px; height:" + box.height + "px'></div>")
						.data("axis.direction", axis.direction)
						.data("axis.n", axis.n)
						.appendTo(this.plot.getPlaceholder())
						.click($.proxy(function (event) {
							var target = $(event.currentTarget);
							EventManager.publish("timeseries:unselectAll");
							$.each($('.axisTarget'), function(index, elem){
								elem = $(elem);
								if(target.data('axis.n') == elem.data('axis.n')) {
									elem.toggleClass("selected");
								} else {
									elem.removeClass("selected");
								}
							});
							$.each(this.plot.getData(), function(index, elem) {
								if(elem.yaxis.n == axis.n && target.hasClass("selected")) {
									elem.lines.lineWidth = 5;
									EventManager.publish("timeseries:selected", elem.id);
								} else {
									elem.lines.lineWidth = 2;
								}
							});
							this.plot.draw();
						},this));
					}
				}, this));
			} else {
				$("#placeholder").empty();
			}
		}
	},
	
	createAxis : function() {
		var axis = {};
		$.each(this.data, function(index, elem){
			if(!axis.hasOwnProperty(elem.uom)) {
				axis[elem.uom] = ++Object.keys(axis).length;
			};
			elem.yaxis = axis[elem.uom];
		});
	},
	
	dataAlreadyIn : function(id) {
		var elem = null;
		elem = $.map(this.data, function(elem) {
			if(id == elem.id) {
				return elem;
			}
		});
		return elem[0];
	},
	
	removeData : function(id) {
		var idx = null;
		$.each(this.data, function(i, elem) {
			if(id == elem.id) {
				idx = i;
				return;
			}
		});
		if (idx != null) {
			this.data.splice(idx, 1);
		}
	}
};