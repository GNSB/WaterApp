import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { EnlaceService } from '../enlace.service';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  data = [];
  long: any;
  lat: any;
  replace: any;
  @ViewChild('map', { static: false })
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  makerId: string;
  grifolat: any;
  grifolng: any;
  http_replace: any;
  grifo_data: any;
  grifo_data_length = [];
  constructor(
    private enlaceService: EnlaceService,
    public platform: Platform,
    public http: HttpClient
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.setLon();
    this.createMap(this.lat, this.long);
  }

  async setLon() {
    var longitud = this.enlaceService.getItemOfSession('enlace');
    console.log(longitud);
    if (longitud.includes('http://')) {
      this.http_replace = 'http://';
      longitud = longitud.replace(this.http_replace, '');
      this.replace = 'www.google.com/maps?q=';
      longitud = longitud.replace(this.replace, '');
    }
    if (longitud.includes('www.google.com/maps?q=')) {
      this.replace = 'www.google.com/maps?q=';
      longitud = longitud.replace(this.replace, '');
    }
    if (longitud.includes('maps.google.com/maps?q=')) {
      this.replace = 'maps.google.com/maps?q=';
      longitud = longitud.replace(this.replace, '');
    }

    this.data = longitud.split(',');
    this.lat = parseFloat(this.data[0]);
    this.long = parseFloat(this.data[1]);
    console.log(this.long);
    console.log(this.lat);
  }

  async createMap(lat, long) {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: {
          lat: lat,
          lng: long,
        },
        zoom: 18,
      },
    });
    this.getGrifo();
    this.addMarkerEmer(this.lat, this.long);
  }

  async addMarkerEmer(lat, lng) {
    this.makerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      title: 'Emergencia',

      draggable: false,
    });
  }

  async getGrifo() {
    this.http.get('http://api.teamproyecto.cl/grifo').subscribe((data) => {
      if (data) {
        this.grifo_data = data;
        this.grifo_data_length = this.grifo_data;
        for (let item of this.grifo_data_length) {
          console.log(item);
          this.addMarker(
            parseFloat(item.coordenada_y),
            parseFloat(item.coordenada_x),
            item.direccion
          );
        }
      }
    });
  }

  async addMarker(lat, lng, nombre) {
    this.makerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      title: 'marcador',
      snippet: 'holahola',

      draggable: false,
    });
  }
}
