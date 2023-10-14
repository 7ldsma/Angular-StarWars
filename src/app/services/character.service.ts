import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'https://swapi.py4e.com/api/';

  vsUrl = 'https://starwars-visualguide.com/assets/img/';

  imageUrl: string = '';


  getCharacters(page: number): Observable<Character[]> {
    return this.httpClient.get(this.baseUrl + 'people/') as Observable<Character[]>;
  }

  getCharImg(characterId:number){

    this.imageUrl = this.vsUrl + `characters/${characterId}.jpg`;
    return this.httpClient.get(this.imageUrl)
  }


  
}
