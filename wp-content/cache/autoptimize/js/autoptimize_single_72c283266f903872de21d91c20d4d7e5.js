jQuery(function($){var legacyGlobals={marker_pull:"0",marker_array:[],MYMAP:[],infoWindow_poly:[],markerClusterer:[],heatmap:[],WPGM_Path:[],WPGM_Path_Polygon:[],WPGM_PathLine:[],WPGM_PathLineData:[],WPGM_PathData:[],original_iw:null,wpgmza_user_marker:null,wpgmaps_localize_marker_data:[],wpgmaps_localize_polygon_settings:[],wpgmaps_localize_heatmap_settings:[],wpgmaps_localize_polyline_settings:[],wpgmza_cirtcle_data_array:[],wpgmza_rectangle_data_array:[],wpgmzaForceLegacyMarkerClusterer:false};function bindLegacyGlobalProperty(key)
{if(key in window)
{console.warn("Cannot redefine legacy global "+key);return;}
Object.defineProperty(window,key,{"get":function(){console.warn("This property is deprecated and should no longer be used");return legacyGlobals[key];},"set":function(value){console.warn("This property is deprecated and should no longer be used");legacyGlobals[key]=value;}});}
for(var key in legacyGlobals)
bindLegacyGlobalProperty(key);WPGMZA.legacyGlobals=legacyGlobals;window.InitMap=window.resetLocations=window.searchLocations=window.fillInAddress=window.searchLocationsNear=function(){console.warn("This function is deprecated and should no longer be used");}});