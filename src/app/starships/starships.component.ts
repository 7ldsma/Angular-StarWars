import { Component, OnInit } from '@angular/core';
import { GetstarshipsService } from '../services/getstarships.service';
import { SpaceShip } from '../interfaces/ships.component';
import { Pilot } from '../interfaces/pilot.component';


@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  starships: any;
  ships: SpaceShip[] = [];
  nave: any;
  shipImage: any;
  urlWSwapi: string[] = [];
  shipId: number = 0;

  showCard: boolean = false;
  hideList: boolean = true;

  totalShips: number = 0;
  throttle = 0;
  distance = 2;
  page = 1;
  
  pilotsId: string[] = [];
  pilotNumber: string = '';
  pilots: Pilot[] = [];
  pilotList: any;
  totalPilots: number = 0;

  filmsId: string[] = [];
  filmNumber: string = '';
  filmNames: any;

constructor(public getstarshipsservice: GetstarshipsService) {}


ngOnInit(): void {
    this.getstarshipsservice.getStarShips(this.page)
    .subscribe(response => {
      this.starships = response;
      this.totalShips = this.starships.count;
      this.ships = this.starships.results;
      console.log(this.ships)
      
  })


}


onScroll(): void {

  if(this.ships.length < this.totalShips){
    
    this.getstarshipsservice.getStarShips(++this.page)
    .subscribe((response: any) => {
      const newShips = response.results;
      this.ships.push(...newShips);
    })
  }
}


getShipCard( ship: any){
  this.nave = ship;
  this.urlWSwapi = this.nave.url.split('/')
  this.shipId = parseInt(this.urlWSwapi[this.urlWSwapi.length - 2])
  console.log(this.shipId, this.nave)
  this.getstarshipsservice.getShipImg(this.shipId)
  this.getPilots()
  this.getFilms()
}



getPilots(){
  this.pilotsId = this.nave.pilots.map((url:string) => {
    const parts = url.split('/');
    this.pilotNumber = parts[parts.length - 2]
    console.log(this.pilotNumber)
    return this.pilotNumber
  })
  this.getstarshipsservice.getPilotsImg(this.pilotsId)

  this.getPilotNames();  
}
 


getPilotNames(): void {

    this.getstarshipsservice.getPilotNames(this.pilotsId)
    .subscribe((res:any) => {
      this.pilotList = res;
    })

  }


getFilms(){
  this.filmsId = this.nave.films.map((url:string) => {
    const movies = url.split('/');
    this.filmNumber = movies[movies.length - 2]
    return this.filmNumber
  })
  this.getstarshipsservice.getFilms(this.filmsId)
  this.getFilmName();

}


getFilmName(){
  this.getstarshipsservice.getFilmNames(this.filmsId)
  .subscribe((res:any) => {
    this.filmNames = res;
  })

}


}
