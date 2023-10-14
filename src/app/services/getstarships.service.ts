import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin } from "rxjs";
import { SpaceShip } from '../interfaces/ships.component';


@Injectable({
  providedIn: 'root'
})
export class GetstarshipsService {
  
  baseUrl = 'https://swapi.py4e.com/api/';

  vsUrl = 'https://starwars-visualguide.com/assets/img/';
  
  imageUrl: string = '';
  pilotNames: any;
  pilotsUrl: string[] = [];
  pNames: any;

  filmsUrl: string[] = [];
  fNames: any;
  filmNames: any;

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

  getPilotNames(pilots: string[]): Observable<any>{

    this.pNames = pilots.map((url: string) => {
      return this.baseUrl + `people/${url}`;
    })
    console.log(this.pNames)

    this.pilotNames = this.pNames.map( (url:any) => {
      
      return this.httpClient.get<any>(url);
    });

    console.log(this.pilotNames)
    return forkJoin(this.pilotNames);
  }

  getFilms(filmsId: string[]){

    this.filmsUrl = filmsId.map((id: string) => {

      return this.vsUrl + `films/${id}.jpg`;
    })
    console.log(this.filmsUrl)

  }

  getFilmNames(filmIds: string[]): Observable<any>{

    this.fNames = filmIds.map((id:string) => {
      return this.baseUrl + `films/${id}`
    })
    console.log(this.fNames)

    this.filmNames = this.fNames.map((url:any) => {
      return this.httpClient.get<any>(url)
    })

    return forkJoin(this.filmNames);

  }


}
