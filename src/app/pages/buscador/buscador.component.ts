import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { SearchMovie } from '../../interfaces/busqueda-response';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  searchedMovies: SearchMovie[] = []
  busqueda: string = ''

  constructor(private _activeRoute: ActivatedRoute,
              private _peliService: PeliculasService) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe( params => {
      this.busqueda = params.texto
      this._peliService.buscarPelis(this.busqueda).subscribe( movies => {
        this.searchedMovies = movies
        console.log(movies);
        
      })
    })
    
      
    // console.log(this.busqueda);
    
  }

}
