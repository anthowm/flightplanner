import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, polyline } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map;
  allDrawnItems = new L.FeatureGroup();
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 5,
    center: latLng(51.9487949, 7.6237527)
  };
  drawOptions = {
    position: 'bottomright',
    draw: {
      circlemarker: false,
      polyline: true
    },
    featureGroup: this.allDrawnItems
  };

  constructor() {}
  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...'
        })
      ],
      zoom: 12,
      center: latLng(51.9487949, 7.6237527)
    };
    this.drawOptions = {
      position: 'bottomright',
      draw: {
        circlemarker: false,
        polyline: true
      },
      featureGroup: this.allDrawnItems
    };
  }

  btn_drawPolygon() {
    const polylineDrawer = new L.Draw.Polyline(this.map); // <-- throws error
    polylineDrawer.enable();
  }

  onDrawReady(event) {
    console.log(event.layer);
  }

  onMapReady(map: L.Map) {
    console.log('ON MAP READY CALLED');
    console.log(this.map);
    this.map = map;
  }
}
