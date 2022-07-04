import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router: Router, private androidPermissions: AndroidPermissions) { }

  ngOnInit() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE).then(
      result => alert('Tiene el permiso requerido'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE)
    );
  }
  login(){
    this.router.navigate(['enlace']);

  }

}
