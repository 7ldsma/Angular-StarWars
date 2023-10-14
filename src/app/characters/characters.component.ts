import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../interfaces/character.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  characterObj: any;
  character: Character[] = [];
  characters: any;
  shipImage: any;
  urlWSwapi: string[] = [];
  charId: number = 0;


  showCard: boolean = false;
  hideList: boolean = true;

  totalCharacters: number = 0;
  throttle = 0;
  distance = 2;
  page = 1;

  filmsId: string[] = [];
  filmNumber: string = '';
  filmNames: any;

  constructor(public characterService: CharacterService) {}



  ngOnInit(): void {
    this.characterService.getCharacters(this.page)
    .subscribe(response => {
      this.characterObj = response;
      this.totalCharacters = this.characterObj.count;
      this.character = this.characterObj.results;
      console.log(this.character)
      
  })

}


onScroll(): void {

  if(this.character.length < this.totalCharacters){
    
    this.characterService.getCharacters(++this.page)
    .subscribe((response: any) => {
      const newChars = response.results;
      this.character.push(...newChars);
    })

  }
}

getCharacterCard(char: any){
  this.characters = char;
  this.urlWSwapi = this.characters.url.split('/');
  this.charId = parseInt(this.urlWSwapi[this.urlWSwapi.length - 2]);
  this.characterService.getCharImg(this.charId);

  this.getFilms()

}


getFilms(){
  this.filmsId = this.characters.films.map((url:string) => {
    const movies = url.split('/');
    this.filmNumber = movies[movies.length - 2]
    return this.filmNumber
  })
  this.characterService.getFilms(this.filmsId)
  this.getFilmName();

}


getFilmName(){
  this.characterService.getFilmNames(this.filmsId)
  .subscribe((res:any) => {
    this.filmNames = res;
  })

}



}
