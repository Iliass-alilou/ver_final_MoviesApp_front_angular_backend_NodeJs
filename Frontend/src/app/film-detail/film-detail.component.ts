import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../services/film.service';
import Cookies from "js-cookie";
import { Favoris } from '../Models/favoris';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Revue } from '../Models/revue';
import { Film } from '../Models/film';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  

  film;
  filmsSubscription: Subscription = new Subscription();
  isFavoris = false;
  urlVideo: SafeResourceUrl = "";

  revues;
  rate = 0;
  err="";

  filmDetail : any;

  constructor(public service: FilmService, private route: ActivatedRoute, public sanitizer: DomSanitizer) {
    this.service.getFilmById(this.route.params["_value"]["idmovie"])
    if(Cookies.get("email")!=undefined){
      this.service.isInFavoris(Cookies.get("email"),this.route.params["_value"]["idmovie"])
      .then(rsp=>{
        if(rsp.length!=0) this.isFavoris = true
      })
      .catch(err=>{console.log("=======================")})
    }
    this.filmsSubscription = this.service.filmSubject.subscribe(rsp => {
      this.film = rsp as Film;
      document.title = "" + rsp["title"]
      
      this.getAllRevues();
    })
    this.service.emitFilmsSubject()
  }

  getFilmImage(pathImage:String){
    
    this.service.getImage(pathImage)
    console.log(this.service.getImage(pathImage))
  }
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(res=>{
      const idFilm = res.get("id");
      this.service.getDetailFilm(idFilm).subscribe(data=>{
        this.filmDetail = data;
      });
    })
  }

  addrevue(detail) {
    var d = new Date();
    if(Cookies.get("email")!=undefined){
      if (detail.value.length == 0 ) {
        this.err="il faut ecrire un commentaire "
        alert("please add comment first");
      } else {
        var date = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
        this.service.addrevue(new Revue(this.filmDetail.id, Cookies.get("email"), date, detail.value,this.rate)).subscribe(rsp => {
          detail.value = ""
          this.getAllRevues();
        })
      }
    }else{
      this.err="Merci de se connecter"
    }
  }

  setRating(nbr){
    this.rate=nbr;
  }

  getAllRevues() {
    
    if(this.filmDetail.id!=undefined){
      alert(this.filmDetail.id)
      this.service.getAllRevues(this.filmDetail.id).subscribe(rsp => {
        this.revues = rsp
      })
    }
  }


  addFavoris() {
    if(Cookies.get("email")!=undefined){
      this.isFavoris = true;
      this.service.addFavoris(new Favoris(this.filmDetail.id,Cookies.get("email"),this.filmDetail.poster_path,this.filmDetail.title));
    }else{
      this.err="Merci de se connecter"
      alert("please Login into your account ")
    }
  }

}
