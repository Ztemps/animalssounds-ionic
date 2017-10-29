import { Component } from '@angular/core';

//Import animals data from data.animales.ts, there has been extracted as ANIMALES
//We need to put the relative path to find the file
import { ANIMALES } from "../../data/data.animales";

//Import animal interface
import {Animal} from "../../interfaces/animal.interface";

//import ionic refresher
import {Refresher, reorderArray} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo : any;
  ordenando : boolean = false;

  constructor() {

    //IF we don't put slice  this.animales modify the code in ANIMALES file
    //Slice create a clon of ANIMALES object
    this.animales = ANIMALES.slice(0);

  }

  //Create the function reproducir with animal parameter type of Animal (Interface)
  reproducir ( animal:Animal ){

    this.pausar_audio (animal);

    if(animal.reproduciendo ==true){

      animal.reproduciendo =false;
      return;

    }
    console.log(animal);

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;
    this.audioTiempo = setTimeout (()=> animal.reproduciendo = false, animal.duracion * 1000);
  }

private pausar_audio ( animalSel: Animal ){

  clearTimeout(this.audioTiempo);
  this.audio.pause();
  this.audio.currentTime = 0;

    for (let animal of this.animales ){

      if(animal.nombre != animalSel.nombre){

        animal.reproduciendo = false;
      }

    }
}

borrar_animal( idx: number){

  this.animales.splice(idx, 1);

}

recargar_animales( refresher:Refresher){

  console.log('Begin async operation', refresher);

     setTimeout(() => {
      //console.log('Async operation has ended');
      this.animales = ANIMALES.slice(0);
      refresher.complete();

    }, 2000);

}

reordenar_animales( animalPos:any){

  console.log(animalPos);
  this.animales = reorderArray(this.animales, animalPos);
}

}
