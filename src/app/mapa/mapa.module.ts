import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapaPageRoutingModule } from './mapa-routing.module';
import { EnlaceService } from '../enlace.service';
import { MapaPage } from './mapa.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule
  ],
  providers:[EnlaceService, MapaPage,NativeGeocoder,Geolocation],
  declarations: [MapaPage]
})
export class MapaPageModule {}
