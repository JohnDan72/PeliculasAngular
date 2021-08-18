import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';
import { StarRatingComponent } from 'ng-starrating';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  pelidata: Movie = null
  reparto: Cast[] = []

  constructor(private _activateRoute: ActivatedRoute,
              private _peliService: PeliculasService,
              private _location: Location,
              private _router: Router) { }

  ngOnInit(): void {
    const { id_peli } = this._activateRoute.snapshot.params
    
    combineLatest([
      this._peliService.getPeliInfo(id_peli),
      this._peliService.getCast(id_peli)
      
    ]).subscribe( ([pelicula, cast]) => {
          console.log(pelicula, cast);
    
          if(!pelicula){
            this._router.navigateByUrl('/home')
            return
          }
          this.pelidata = pelicula
          this.reparto = cast      
    })

    // this._activateRoute.params.subscribe( params => {
    //   this._peliService.getPeliInfo(params.id_peli).subscribe( peli => {
    //     if(!peli){
    //       this._router.navigateByUrl('/home')
    //       return
    //     }
    //     this.pelidata = peli
    //     console.log(this.pelidata);
    //   })
    //   this._peliService.getCast(params.id_peli).subscribe( cast => {
    //     this.reparto = cast
    //     console.log(this.reparto);
    //   })
    // })
    
  }

  onBackClick(){
    this._location.back()
  }

}
