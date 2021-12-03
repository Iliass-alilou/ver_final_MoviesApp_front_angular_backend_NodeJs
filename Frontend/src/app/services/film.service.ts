import { Film } from './../Models/film';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favoris } from '../Models/favoris';
import { Revue } from '../Models/revue';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  API_TOKEN: any = "5b4da682ac740e8d87f1d175c93df7db";
  films:Array<any> = [];
  filmSubject = new Subject<any>();


  filmsFavoris:Array<any> = [];
  filmFavorisSubject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getAllFilms(page: number) {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.API_TOKEN + '&language=fr&page=' + page
    this.http.get<Array<Film>>(url).subscribe(films=>{
      this.films = films;
      this.emitFilmsSubject()
    })
  }

  emitFilmsSubject(){
    this.filmSubject.next(this.films)
  }

  emitFilmsFavorisSubject(){
    this.filmFavorisSubject.next(this.filmsFavoris)
  }

  getFilmById(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.API_TOKEN + '&language=fr';
    this.http.get<Array<Film>>(url).subscribe(films=>{
      this.films = films;
      this.emitFilmsSubject()
    })
  }

  getVideoById(id){
    const url = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + this.API_TOKEN + '&language=fr';
    return this.http.get(url)
  }

  getFilms(text: String, page: number) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.API_TOKEN + '&language=fr&query=' + text + "&page=" + page

    this.http.get<Array<Film>>(url).subscribe(films=>{
      this.films = films;
      this.emitFilmsSubject()
    })
  }

  getImage(name: String) {
    return 'https://image.tmdb.org/t/p/w300' + name;
  }

  getAllRevues(id:number){
    const url = environment["apiURL"]+"/revues/"+id
    return this.http.get<Array<Revue>>(url)
  }

  addrevue(revue:Revue){
    const url = environment["apiURL"]+"/revues"
    return this.http.post(url,revue)
  }

  getAllFavoris(id) {
    this.http.get<Array<Favoris>>(environment["apiURL"]+"/favoris"+"/"+id).subscribe(rsp=>{
      this.filmsFavoris = rsp;
      this.emitFilmsFavorisSubject();
    })
  }

  addFavoris(favoris:Favoris) {
    console.log(favoris.poster_path);
    this.http.post<Favoris>(environment["apiURL"]+"/favoris",favoris).subscribe(rsp=>console.log(rsp))
  }

  isInFavoris(idUser,idFilm) {
    return this.http.get<Array<Favoris>>(environment["apiURL"]+"/favoris"+"/"+idUser+"/"+idFilm).toPromise()
  }

  
  getDetailFilm(id){
    const url = 'https://api.themoviedb.org/3/movie/' + id +'?api_key=' + this.API_TOKEN  + '&language=fr' 
    return this.http.get(url);
  }


}
