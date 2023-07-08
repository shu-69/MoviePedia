import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import ApiSecrets from '../ApiSecrets.json';

export enum List {
  MostPopularMovies = 'most_pop_movies',
  MostPopularSeries = 'most_pop_series',
  TopBoxOffice200 = 'top_boxoffice_200',
  TopBoxOfficeLastWeekend10 = 'top_boxoffice_last_weekend_10',
  TopRated250 = 'top_rated_250',
  TopRatedEnglish250 = 'top_rated_english_250',
  TopRatedLowest100 = 'top_rated_lowest_100',
  TopRatedSeries250 = 'top_rated_series_250',
  Titles = 'titles'
}

@Injectable({
  providedIn: 'root'
})
export class IMDBService {

  RapidApi = ApiSecrets.rapidapi;

  constructor(private http: HttpClient) { }

  async getUpcoming(limit?: number) {

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
    const options = {
      headers: {
        'X-RapidAPI-Key': '61631fd008msh31430e1aa47f61cp1fe7dajsn062be728c5a9',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      },
      params: {
        limit: limit ? limit : 10
      }
    };

    return this.http.get(url, options);

  }

  async getMoviesByTitle(list?: List, limit? : number) {

    const url = 'https://moviesdatabase.p.rapidapi.com/titles';
    const options = {
      headers: {
        'X-RapidAPI-Key': '61631fd008msh31430e1aa47f61cp1fe7dajsn062be728c5a9',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      },
      params: {
        list: list ? list : '',
        limit: limit ? limit : ''
      }
    };

    return await this.http.get(url, options);

  }

  async search(prompt: string, pageNo? : string) {

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/search/keyword/' + prompt;
    const options = {
      headers: {
        'X-RapidAPI-Key': '61631fd008msh31430e1aa47f61cp1fe7dajsn062be728c5a9',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      },
      params: {
        page : pageNo? pageNo : ''
      }
    };

    return await this.http.get(url, options);

  }

}
