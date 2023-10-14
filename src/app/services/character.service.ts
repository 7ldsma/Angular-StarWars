import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.component';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'https://swapi.py4e.com/api/';

  vsUrl = 'https://starwars-visualguide.com/assets/img/';

  imageUrl: string = '';

  filmsUrl: string[] = [];
  fNames: any;
  filmNames: any;





  getCharacters(page: number): Observable<Character[]> {
    return this.httpClient.get(this.baseUrl + 'people/') as Observable<Character[]>;
  }

  getCharImg(characterId:number){

    this.imageUrl = this.vsUrl + `characters/${characterId}.jpg`;
    return this.httpClient.get(this.imageUrl)
  }


  getFilms(filmsId: string[]){

    this.filmsUrl = filmsId.map((id: string) => {

      return this.vsUrl + `films/${id}.jpg`;
    })

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
