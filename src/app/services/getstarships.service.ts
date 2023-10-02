import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetstarshipsService {
  
  private url = 'https://swapi.py4e.com/api/starships/';

  constructor(private httpClient: HttpClient) { }


  getStarShips() {
    return this.httpClient.get(this.url);
  }


}
