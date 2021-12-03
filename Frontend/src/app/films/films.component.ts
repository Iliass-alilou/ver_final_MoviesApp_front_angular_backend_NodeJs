
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from '../Models/film';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})


export class FilmsComponent implements OnInit {

  searchedText:String = "";
  films:Array<Film> = [];
  number_pages = 0;
 
  filmsSubscreption: Subscription = new Subscription();
  
  constructor(public filmService: FilmService, private route: ActivatedRoute) { 
    document.title="Welcome to FilmStream";
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(response=>{
      if(response["name"] != undefined){
        this.searchedText = response["name"]
        console.log(response["name"])
        this.filmService.getFilms(response["name"],1)
        this.filmsSubscreption = this.filmService.filmSubject.subscribe(response=>{
          this.films = response["results"];
          console.log(this.films)
          this.number_pages=response["total_pages"];
        })
        this.filmService.emitFilmsSubject()
      
      }else  this.filmService.getAllFilms(1)
      this.filmsSubscreption = this.filmService.filmSubject.subscribe(response=>{
        this.films = response["results"];
        this.number_pages=response["total_pages"];
      })
      this.filmService.emitFilmsSubject()
    })
  }
}
