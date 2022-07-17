looker.plugins.visualizations.add({
  create: function(element, config){
    element.innerHTML = "<h1>Ready to render!</h1>";
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering){
    var html = `<h1>Ready to render!</h1>
    <table>
    `;

    for(var row of data) {
      var cell = row[queryResponse.fields.dimensions[0].name];
      html += "<tr><td>" + LookerCharts.Utils.htmlForCell(cell) + "</td></tr>";
    }
    html += "</table>";
    element.innerHTML = html;
    doneRendering()
  }
});
