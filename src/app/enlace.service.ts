import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnlaceService {

  constructor() { }

  setEnlace(dataOfSesion:Object):void{
    Object.entries(dataOfSesion).forEach(([key,value])=>{
      localStorage.setItem(key,value)
    })
  }


  getItemOfSession(item): string{
    return localStorage.getItem(item)
  }
}
