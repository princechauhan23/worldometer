import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const WorldMap = ({ setCountrySelected }) => {
  // useEffect is a hook that takes a function as its first argument and an array of dependencies as its second.
  useEffect(() => {
    // Create root
    var mapRoot = am5.Root.new("chartdiv");
    // Set themes
    mapRoot.setThemes([am5themes_Animated.new(mapRoot)]);

    // Create map chart
    var chart = mapRoot.container.children.push(
      am5map.MapChart.new(mapRoot, {
        panX: "rotateX",
        projection: am5map.geoNaturalEarth1(),
      })
    );
    // map zoom control buttons
    chart.set("zoomControl", am5map.ZoomControl.new(mapRoot, {}));

    // Create polygon series , the polygon series is used to draw the borders of a country
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(mapRoot, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    // hover effect for filling the country area
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),
    });
    polygonSeries.mapPolygons.template.events.on("click", function (ev) {
      polygonSeries.zoomToDataItem(ev.target.dataItem);
      setCountrySelected(ev.target.dataItem.dataContext.name);
    });
  }, []);

  return <div id="chartdiv"></div>;
};

export default WorldMap;
