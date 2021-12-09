import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @ViewChild('map') mapView: ElementRef;



  ionViewDidEnter() {
    this.createMap();
  }

  createMap() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    console.log("file: home.page.ts ~ line 20 ~ HomePage ~ createMap ~ boundingRect", boundingRect)

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      latitude: -33.86,
      longitude: 151.20,
      zoom: 12
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

      const coordinates = await Geolocation.getCurrentPosition();
    })
  }

}
