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
    position: 'topleft',
    draw: {
      circlemarker: false,
      polyline: true
    },
    featureGroup: this.allDrawnItems
  };
  reset = true;
  flightPlans: any[] = [];

  constructor() {
    this.persistData();
  }
  ngOnInit() {}

  savePlans() {
    this.saveLocalStorage();
  }

  onDrawReady(event) {
    this.flightPlans.push(event.layer._latlngs);
  }

  onMapReady(map: L.Map) {
    this.map = map;
    const flightPolyLines = [];
    console.log(this.flightPlans);
    this.flightPlans.forEach(element => {
      const currentPolyLine = new L.Polyline(element, {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
      });
      currentPolyLine.addTo(this.map);
    });
  }

  saveLocalStorage() {
    localStorage.setItem('flightPlans', JSON.stringify(this.flightPlans));
  }

  persistData() {
    const persistData = localStorage.getItem('flightPlans');
    if (persistData) {
      this.flightPlans = JSON.parse(persistData);
    }
  }

  cleanPlans() {
    localStorage.clear();
    this.flightPlans = [];
    this.map.off();
    this.map.remove();
    this.resetMap();
  }

  resetMap() {
    this.reset = false;
    setTimeout(() => {
      this.reset = true;
    }, 500);
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...'
        })
      ],
      zoom: 5,
      center: latLng(51.9487949, 7.6237527)
    };
    this.drawOptions = {
      position: 'topleft',
      draw: {
        circlemarker: false,
        polyline: true
      },
      featureGroup: this.allDrawnItems
    };
  }
}
