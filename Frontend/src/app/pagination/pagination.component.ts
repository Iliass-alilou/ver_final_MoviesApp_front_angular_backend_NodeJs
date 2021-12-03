import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  page = 1;

  @Input() number_pages: any;
  @Input() films: any;

  filmService:FilmService;

  
  constructor(private service:FilmService) {
    this.filmService = service;
   }

   NextPage(){
    this.filmService.getAllFilms(this.page)
    this.filmService.filmSubject.subscribe(response=>{
      this.films = response["results"]; 
    })
   }

  ngOnInit(): void {
  }

}
