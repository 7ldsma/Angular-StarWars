import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin, observable } from "rxjs";
import { SpaceShip } from '../interfaces/ships.component';


@Injectable({
  providedIn: 'root'
})
export class GetstarshipsService {
  
  url = 'https://swapi.py4e.com/api/starships/';

  vsUrl = 'https://starwars-visualguide.com/assets/img/';
  
  imageUrl: string = '';
  pilotsNames: string[] = [];
  pilotsUrl: string[] = [];
  pNames: any;

  filmsUrl: string[] = [];
  fNames: string[]=[];

  constructor(private httpClient: HttpClient) { }


  getStarShips(page: number): Observable<SpaceShip[]> {
    return this.httpClient.get(this.url) as Observable<SpaceShip[]>;
  }


  getShipImg(shipId:number){

    this.imageUrl = this.vsUrl + `starships/${shipId}.jpg`;
    return this.httpClient.get(this.imageUrl)
  }



  getPilotsImg(pilots: string[]){

    this.pilotsUrl = pilots.map((id:string) => {
      return this.vsUrl + `characters/${id}.jpg`;
    })
    
    this.pilotsNames = pilots.map((id:string) => {
      return `https://swapi.py4e.com/api/people/${id}`;
    })
    console.log(this.pilotsNames)

    this.pNames = this.pilotsNames.map((url: string) => 

      this.httpClient.get< { name : string }>(url));

      console.log(this.pNames)
    

  }



  getFilms(filmsId: any){

    this.filmsUrl = filmsId.map((id: string) => {

      return this.vsUrl + `films/${id}.jpg`;
    })

  }


}
