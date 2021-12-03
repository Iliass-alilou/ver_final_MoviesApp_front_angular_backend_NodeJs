import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Favoris } from '../Models/favoris';
import { FilmService } from '../services/film.service';
import Cookies from "js-cookie";

@Component({
  selector: 'app-favories',
  templateUrl: './favories.component.html',
  styleUrls: ['./favories.component.scss']
})
export class FavoriesComponent implements OnInit {

  films: Array<Favoris> = [];
  filmsSubscription: Subscription = new Subscription();
  err=""
  constructor(public service: FilmService) { 
    document.title ="Favoris";
    if(Cookies.get("email")!=undefined){
      this.service.getAllFavoris(Cookies.get("email"));
      this.filmsSubscription = this.service.filmFavorisSubject.subscribe((rsp) => {
        this.films=[];
        for(var i in rsp){
          this.films.push(rsp[i] as Favoris)
        }
      })
      this.service.emitFilmsFavorisSubject()
    }else{
      this.err="Merci de se connecter"
    }
  }

  ngOnInit(): void {
  }

}
