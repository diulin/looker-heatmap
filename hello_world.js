import * as d3 from "https://d3js.org/d3.v7.min.js";
import { handleErrors } from '../common/utils';
var vis = {
    id: 'basic',
    label: 'Basic',
    options: {
        color_range: {
            type: 'array',
            label: 'Color Range',
            display: 'colors',
            default: ['#dd3333', '#80ce5d', '#f78131', '#369dc1', '#c572d3', '#36c1b3', '#b57052', '#ed69af']
        },
        label_type: {
            default: 'name',
            display: 'select',
            label: 'Label Type',
            type: 'string',
            values: [
                { 'Name': 'name' },
                { 'Name (value)': 'name_value' }
            ]
        },
        show_null_points: {
            type: 'boolean',
            label: 'Plot Null Values',
            default: true
        }
    },
    // Set up the initial state of the visualization
    create: function (element, config) {
        element.innerHTML = "\n      <style>\n      .node,\n      .link {\n        transition: 0.5s opacity;\n      }\n      </style>\n    ";
        this.svg = d3.select(element).append('svg');
    },
    // Render in response to the data or settings changing
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        if (!handleErrors(this, queryResponse, {
            min_pivots: 0, max_pivots: undefined,
            min_dimensions: 1, max_dimensions: undefined,
            min_measures: 0, max_measures: undefined
        }))
            return;
        var width = element.clientWidth;
        var height = element.clientHeight;
        var svg = this.svg
            .html('')
            .attr('width', '100%')
            .attr('height', '100%')
            .append('g');
        svg.append('circle')
            .attr('cx', '50')
            .attr('cy', '50')
            .attr('r', '30');
        var dimensions = queryResponse.fields.dimension_like[0];
        svg.append('text')
            .attr('x', '150')
            .attr('y', '150')
            .attr('r', '30')
            .text(dimensions.name);
        doneRendering();
    }
};
looker.plugins.visualizations.add(vis);
