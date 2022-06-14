import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnlacePageRoutingModule } from './enlace-routing.module';

import { EnlacePage } from './enlace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EnlacePageRoutingModule
  ],
  declarations: [EnlacePage]
})
export class EnlacePageModule {}
