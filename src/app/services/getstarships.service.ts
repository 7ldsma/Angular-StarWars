import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin, observable } from "rxjs";
import { SpaceShip } from '../interfaces/ships.component';
import { Pilot } from '../interfaces/pilot.component';


@Injectable({
  providedIn: 'root'
})
export class GetstarshipsService {
  
  baseUrl = 'https://swapi.py4e.com/api/';

  vsUrl = 'https://starwars-visualguide.com/assets/img/';
  
  imageUrl: string = '';
  pilotsNames: string[] = [];
  pilotsUrl: string[] = [];
  pNames: any;

  filmsUrl: string[] = [];
  fNames: string[]=[];

  constructor(private httpClient: HttpClient) { }

  


  getStarShips(page: number): Observable<SpaceShip[]> {
    return this.httpClient.get(this.baseUrl + 'starships/') as Observable<SpaceShip[]>;
  }


  getShipImg(shipId:number){

    this.imageUrl = this.vsUrl + `starships/${shipId}.jpg`;
    return this.httpClient.get(this.imageUrl)
  }



  getPilotsImg(pilots: string[]){

    this.pilotsUrl = pilots.map((id:string) => {
      return this.vsUrl + `characters/${id}.jpg`;
    })
    
  }

  getPilotNames(pilot: string[]){
    this.pNames = pilot.map((id:string) => {
      return this.httpClient.get(`https://swapi.py4e.com/api/people/${id}`) as Observable<Pilot>;
    })
    console.log(this.pNames)


  

  }

    // this.pNames = this.pilotsNames.map((url: string) => 

    //   this.httpClient.get< { name : string }>(url));

    //   console.log(this.pNames)
    

  





  getFilms(filmsId: any){

    this.filmsUrl = filmsId.map((id: string) => {

      return this.vsUrl + `films/${id}.jpg`;
    })

  }


}
