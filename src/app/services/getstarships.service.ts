import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, observable } from "rxjs";
import { SpaceShip } from '../interfaces/ships.component';


@Injectable({
  providedIn: 'root'
})
export class GetstarshipsService {
  
  private url = 'https://swapi.py4e.com/api/starships/';
  imageUrl: string = '';

  constructor(private httpClient: HttpClient) { }


  getStarShips(page: number): Observable<SpaceShip[]> {
    return this.httpClient.get(this.url) as Observable<SpaceShip[]>;
  }

  getShipImg(shipId:number){

    this.imageUrl = `https://starwars-visualguide.com/assets/img/starships/${shipId}.jpg`;
    
    return this.httpClient.get(this.imageUrl)
  }




}
