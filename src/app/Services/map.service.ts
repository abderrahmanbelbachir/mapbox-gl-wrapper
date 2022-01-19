import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';
import {LngLatLike} from "mapbox-gl";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // @ts-ignore
  public map: mapboxgl.Map;


  constructor() {
    // @ts-ignore
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  buildMap(zoom: number , center: any , pins: any[]) {
    console.log('mapbox gl token : ', mapboxgl.accessToken);

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh',
      zoom: zoom,
      center: center
    })
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('click', (e) => {
      console.log('mouse move event : ', e.point, e.lngLat.wrap());
    });
    return this.drawMarkers(pins);
  }

  public drawMarkers(pins: any[]) {
    const markers: any[] = [];
    for (const pin of pins) {
      let marker_1: any = new mapboxgl.Marker({
        draggable: true
      }).setLngLat([pin.lng, pin.lat])
        .addTo(this.map);

      markers.push(marker_1);

      marker_1.getElement().addEventListener('click', () => {
        this.markerClicked(marker_1, markers , pins)
      });

      marker_1.on('dragend', (e: any) => {
        console.log('cursor dragged : ', e.target._lngLat);
        marker_1.setLngLat(e.target._lngLat);
      });
    }
    return markers;
  }

  showAllPins(markers: any[]) {
    let mincoordinates: any = [];
    let maxcoordinate: any = [];
    for (const marker of markers) {
      console.log('marker parsed : ', marker._lngLat);
      // @ts-ignore
      if (!mincoordinates[0]) {
        mincoordinates[0] = marker._lngLat.lng;
        mincoordinates[1] = marker._lngLat.lat;
      } else {
        if (marker._lngLat.lng < mincoordinates[0]) {
          mincoordinates[0] = marker._lngLat.lng;
        }
        if (marker._lngLat.lat < mincoordinates[1]) {
          mincoordinates[1] = marker._lngLat.lat;
        }
      }

      if (!maxcoordinate[0]) {
        maxcoordinate[0] = marker._lngLat.lng;
        maxcoordinate[1] = marker._lngLat.lat;
      } else {
        if (marker._lngLat.lng > maxcoordinate[0]) {
          maxcoordinate[0] = marker._lngLat.lng;
        }
        if (marker._lngLat.lat > maxcoordinate[1]) {
          maxcoordinate[1] = marker._lngLat.lat;
        }
      }
    }

    console.log('got boundries : ', mincoordinates, maxcoordinate);

    const bounds = new mapboxgl.LngLatBounds(
      new mapboxgl.LngLat(mincoordinates[0], mincoordinates[1]),
      new mapboxgl.LngLat(maxcoordinate[0], maxcoordinate[1])
    );
    this.map.fitBounds(bounds,{ padding: 200 });
  }

  initView(markers: any , pins: any) {
    for (const marker of markers) {
      let m: any = marker;
      console.log('marker parsed init view : ', m._lngLat);
      marker.remove();
      m = new mapboxgl.Marker({
        draggable: true
      }).setLngLat(m._lngLat)
        .addTo(this.map);

      const markerIndex = markers.indexOf(marker);
      markers[markerIndex] = m;

      m.getElement().addEventListener('click', () => {
        this.markerClicked(m , markers , pins);
      });

      m.on('dragend', (e: any) => {
        console.log('cursor dragged : ', e.target._lngLat);
        m.setLngLat(e.target._lngLat);
      });

    }

    this.showAllPins(markers);
  }

  cancelMarkerDrag(markers: any , pins: any) {
    for (let marker_1 of markers) {
      const markerIndex = markers.indexOf(marker_1);
      marker_1.remove();
      marker_1 = new mapboxgl.Marker({
        draggable: true
      }).setLngLat([pins[markerIndex].initialLng, pins[markerIndex].initialLat])
        .addTo(this.map);

      markers[markerIndex] = marker_1;
      marker_1.getElement().addEventListener('click', () => {
        this.markerClicked(marker_1 , markers , pins);
      });

      marker_1.on('dragend', (e: any) => {
        console.log('cursor dragged : ', e.target._lngLat);
        marker_1.setLngLat(e.target._lngLat);
      });
    }

    return markers;
  }

  resetMap(zoom: number , center: any , pins: any[]) {
    this.map.remove();
    this.buildMap(zoom , center , pins);
  }

  markerClicked(marker: any , markers: any[] , pins: any[]) {
    const markerIndex = markers.indexOf(marker);
    console.log("Clicked marker 1 : ", marker._color, marker._lngLat);
    this.map.flyTo({
      center: marker._lngLat,
      zoom: 17,
      speed: 1.5,
      curve: 1,
      easing(t) {
        return t;
      }
    });
    marker.remove();
    marker = new mapboxgl.Marker({
      color: '#ff1a23',
      draggable: true
    }).setLngLat(marker._lngLat)
      .addTo(this.map);
    markers[markerIndex] = marker;

    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;
    const popupOffsets = {
      'top': [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      'bottom': [0, -markerHeight],
      'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'left': [markerRadius, (markerHeight - markerRadius) * -1],
      'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };

    // @ts-ignore
    const popup = new mapboxgl.Popup({ offset: popupOffsets , closeOnClick: false })
      .setLngLat(marker._lngLat)
      .setHTML('<h1>'+ pins[markerIndex].title +'</h1>')
      .addTo(this.map);
  }

}
