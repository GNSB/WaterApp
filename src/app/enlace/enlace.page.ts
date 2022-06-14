import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators,ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {EnlaceService} from '../enlace.service';
@Component({
  selector: 'app-enlace',
  templateUrl: './enlace.page.html',
  styleUrls: ['./enlace.page.scss'],
})
export class EnlacePage implements OnInit {
  myForm:FormGroup;
  submitted=false;
  enlace;
  constructor(public formBuilder: FormBuilder,public router:Router, private enlaceService: EnlaceService) { }

  ngOnInit() {
    this.myForm=this.formBuilder.group({
      enlace:['',Validators.required]
    })
  }

  onSubmit() {
    this.enlaceService.setEnlace(this.myForm.value);
    if (this.enlaceService.getItemOfSession("enlace")==""){
      alert("Debe ingresar un enlace...")
    }else if (this.enlaceService.getItemOfSession("enlace").includes("www.google.com/maps?q=") || 
    this.enlaceService.getItemOfSession("enlace").includes("http://www.google.com/maps?q=") || 
    this.enlaceService.getItemOfSession("enlace").includes("maps.google.com/maps?q=") ){
      this.router.navigate(['/mapa'])
    }
    
    else{
      alert("Ingrese un enlace válido. Ej. www.google.com/maps... | http://www.google.com/... | maps.google.com/...")

    }
    console.log(this.enlaceService.getItemOfSession("enlace"))


    
  }

}
