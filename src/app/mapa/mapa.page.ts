import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { EnlaceService } from '../enlace.service';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { SphericalUtil } from 'node-geometry-library';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import imageToBase64 from 'image-to-base64/browser';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  data = [];
  long: any;
  lat: any;
  address: string;
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
  userLocationFromLatLng;

  userLocation;
  userCity;
  latLngResult: string;


  base64Grifo: string;
  constructor(
    private enlaceService: EnlaceService,
    public platform: Platform,
    public http: HttpClient,
    private nativeGeocoder: NativeGeocoder,
    public geolocation: Geolocation,
    public zone: NgZone,

  ) {}


  ngOnInit() {}

  ionViewDidEnter() {
    this.setLon();
    imageToBase64('../../assets/icon/fire-hydrant.png').then((response) => {console.log(response);});
    this.createMap(this.lat, this.long);
  }

  async setLon() {
    let longitud = this.enlaceService.getItemOfSession('enlace');
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

  dataAsync(){
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
    this.nativeGeocoder.reverseGeocode(this.long, this.lat, options)
    .then((result: NativeGeocoderResult[]) => this.address= JSON.stringify(result[0]))
    .catch((error: any) => console.log(error));
  }


  imageToBs64(image){
    imageToBase64(image).then((response)=>{
       console.log(response);
    });
  }



  async createMap(lati, longo) {
    this.newMap = await GoogleMap.create({

      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: {
          lat: lati,
          lng: longo,
        },
        zoom: 18,

      },
    });
    this.getGrifo();
    this.addMarkerEmer(this.lat, this.long);
    this.dataAsync();
  }

  async addMarkerEmer(lat, lng, ) {
    this.makerId = await this.newMap.addMarker({
      coordinate: {
        lat,
        lng,
      },
      title: 'Emergencia',
      draggable: false,
      iconUrl: `${location.href.includes('android') ? 'file:///android_asset/www/' : 'www/'}${'fire-hydrant.png'}`
    });
  }

  async getGrifo() {
    this.http.get('http://api.teamproyecto.cl/grifo').subscribe((data) => {
      if (data) {
        this.grifo_data = data;
        this.grifo_data_length = this.grifo_data;
        for (let item of this.grifo_data_length) {
          let estado = '';
          if (item.estado===0 || item.estado==='0' ? estado='Disponible' : estado='Inhabilitado'){}
          if (SphericalUtil.computeDistanceBetween({lat: item.coordenada_y, lng: item.coordenada_x},{lat:this.lat,lng:this.long})<300){
          this.addMarkerGrifo(
            parseFloat(item.coordenada_y),
            parseFloat(item.coordenada_x),
            estado,
            item.direccion
          );
        }
        }
      }
    });
  }

  async addMarkerGrifo(lati, long, nombre,direccion) {
    this.makerId = await this.newMap.addMarker({

      coordinate: {
        lat: lati,
        lng: long,
      },
      title: nombre,
      snippet: direccion,
      draggable: false
    });
  }
}
