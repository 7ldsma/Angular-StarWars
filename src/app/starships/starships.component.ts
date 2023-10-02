import { Component, OnInit } from '@angular/core';
import { GetstarshipsService } from '../services/getstarships.service';
import { SpaceShip } from './ships.component';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  starships: any;
  ships: SpaceShip[] = [];

constructor(private getstarshipsservice: GetstarshipsService) {}
  ngOnInit(): void {
    this.getstarshipsservice.getStarShips()
    .subscribe(response => {
      this.starships = response;
      
      this.ships = this.starships.results
      console.log(this.starships)
  })
}



}
