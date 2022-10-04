'use strict';var polyline={};function py2_round(value){return Math.floor(Math.abs(value)+0.5)*(value>=0?1:-1);}
function encode(current,previous,factor){current=py2_round(current*factor);previous=py2_round(previous*factor);var coordinate=current-previous;coordinate<<=1;if(current-previous<0){coordinate=~coordinate;}
var output='';while(coordinate>=0x20){output+=String.fromCharCode((0x20|(coordinate&0x1f))+63);coordinate>>=5;}
output+=String.fromCharCode(coordinate+63);return output;}
polyline.decode=function(str,precision){var index=0,lat=0,lng=0,coordinates=[],shift=0,result=0,byte=null,latitude_change,longitude_change,factor=Math.pow(10,Number.isInteger(precision)?precision:5);while(index<str.length){byte=null;shift=0;result=0;do{byte=str.charCodeAt(index++)-63;result|=(byte&0x1f)<<shift;shift+=5;}while(byte>=0x20);latitude_change=((result&1)?~(result>>1):(result>>1));shift=result=0;do{byte=str.charCodeAt(index++)-63;result|=(byte&0x1f)<<shift;shift+=5;}while(byte>=0x20);longitude_change=((result&1)?~(result>>1):(result>>1));lat+=latitude_change;lng+=longitude_change;coordinates.push([lat/factor,lng/factor]);}
return coordinates;};polyline.encode=function(coordinates,precision){if(!coordinates.length){return'';}
var factor=Math.pow(10,Number.isInteger(precision)?precision:5),output=encode(coordinates[0][0],0,factor)+encode(coordinates[0][1],0,factor);for(var i=1;i<coordinates.length;i++){var a=coordinates[i],b=coordinates[i-1];output+=encode(a[0],b[0],factor);output+=encode(a[1],b[1],factor);}
return output;};function flipped(coords){var flipped=[];for(var i=0;i<coords.length;i++){flipped.push(coords[i].slice().reverse());}
return flipped;}
polyline.fromGeoJSON=function(geojson,precision){if(geojson&&geojson.type==='Feature'){geojson=geojson.geometry;}
if(!geojson||geojson.type!=='LineString'){throw new Error('Input must be a GeoJSON LineString');}
return polyline.encode(flipped(geojson.coordinates),precision);};polyline.toGeoJSON=function(str,precision){var coords=polyline.decode(str,precision);return{type:'LineString',coordinates:flipped(coords)};};if(typeof module==='object'&&module.exports){module.exports=polyline;}