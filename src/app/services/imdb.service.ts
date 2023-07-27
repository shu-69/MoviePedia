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

  async getRatings(id: string) {

    const url = `https://moviesdatabase.p.rapidapi.com/titles/${id}/ratings`;
    const options = {
      headers: {
        'X-RapidAPI-Key': this.RapidApi['X-RapidAPI-Key'],
        'X-RapidAPI-Host': this.RapidApi['X-RapidAPI-Host']
      },
    };

    return this.http.get(url, options);

  }

  async getUpcoming(limit?: number) {

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
    const options = {
      headers: {
        'X-RapidAPI-Key': this.RapidApi['X-RapidAPI-Key'],
        'X-RapidAPI-Host': this.RapidApi['X-RapidAPI-Host']
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
        'X-RapidAPI-Key': this.RapidApi['X-RapidAPI-Key'],
        'X-RapidAPI-Host': this.RapidApi['X-RapidAPI-Host']
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
        'X-RapidAPI-Key': this.RapidApi['X-RapidAPI-Key'],
        'X-RapidAPI-Host': this.RapidApi['X-RapidAPI-Host']
      },
      params: {
        page : pageNo? pageNo : ''
      }
    };

    return await this.http.get(url, options);

  }

}
