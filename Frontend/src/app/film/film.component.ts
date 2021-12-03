import { FilmService } from './../services/film.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  @Input() filmData: any;

  filmService:FilmService;

  constructor(private service:FilmService) 
  {
    this.filmService = service;
   }

  ngOnInit(): void {
  }

}
