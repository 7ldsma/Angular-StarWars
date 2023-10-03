import { Component, OnInit } from '@angular/core';
import { GetstarshipsService } from '../services/getstarships.service';
import { SpaceShip } from '../interfaces/ships.component';

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

constructor(public getstarshipsservice: GetstarshipsService) {}


ngOnInit(): void {
    this.getstarshipsservice.getStarShips()
    .subscribe(response => {
      this.starships = response;
      
      this.ships = this.starships.results
  })
}

getShipCard( ship: any){
  this.nave = ship;
  this.urlWSwapi = this.nave.url.split('/')
  this.shipId = parseInt(this.urlWSwapi[this.urlWSwapi.length - 2])

  this.getstarshipsservice.getShipImg(this.shipId)

}


}
