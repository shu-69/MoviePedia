import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const OMDB_API_KEY = '5712087a';

@Injectable({
  providedIn: 'root'
})
export class OMDBService {

  constructor(private http: HttpClient) { }

  async search(prompt: string) {

    const url = `http://www.omdbapi.com/?s=${prompt}&apikey=${OMDB_API_KEY}`;

    return await this.http.get(url);

  }

}
