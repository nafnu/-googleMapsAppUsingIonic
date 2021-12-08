import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { LatLng } from '@capacitor-community/capacitor-googlemaps-native/dist/esm/types/common/latlng.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapView: ElementRef;

  constructor() { }

  ionViewDidEnter() {
    this.createMap();
  }

  createMap() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    console.log("~ file: home.page.ts ~ line 20 ~ HomePage ~ createMap ~ boundingRect", boundingRect)

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      // latitude: -33.86,
      // longitude: 151.20,
      zoom: 5
    });

    CapacitorGoogleMaps.addListener("onMapReady", async () => {
    CapacitorGoogleMaps.setMapType({
      type:'hybrid'

    })

    this.showCurrentPosition();
    })
  }

  showCurrentPosition(){

    Geolocation.requestPermissions().then(async permission => {
      const coordinates  = await Geolocation.getCurrentPosition();

      CapacitorGoogleMaps.addMarker({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        title: 'My place',
        snippet: 'I am here'
      });

      CapacitorGoogleMaps.setCamera({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        zoom: 12,
        bearing: 0
      });
    });
  }

  draw(){
    const points: LatLng[] = [
      {
        latitude: 51.88,
        longitude: 7.60,
      },
      {
        latitude: 55,
        longitude: 10,
      }
    ];

    CapacitorGoogleMaps.addPolyline({
      points,
      color: '#ff00ff',
      width: 2
    });
  }
}
