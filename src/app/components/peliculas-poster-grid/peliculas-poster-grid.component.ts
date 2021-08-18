import { Component, HostListener, Input, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { Movie } from '../../interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {
  @Input() peliculas: Movie[]

  constructor(private _peliService: PeliculasService,
              private _router: Router) { }

  ngOnInit(): void {
    console.log(this.peliculas)
    
  }

  goToPeliDetal(id: number){
    this._router.navigate(['/pelicula',id])
  }
  

}
