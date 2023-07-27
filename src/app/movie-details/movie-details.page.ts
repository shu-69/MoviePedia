import { Component, OnInit } from '@angular/core';
import { IMDBService } from '../services/imdb.service';
import { OMDBService } from '../services/omdb.service';
import { GeneralService } from '../services/general.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movieId: string = 'tt1270797';

  movieDetails: any = undefined;

  constructor(private IMDBServices: IMDBService, private OMDBServices: OMDBService, private generalServices: GeneralService) {



  }

  async ngOnInit() {

    // Fetch movie details

    (await this.OMDBServices.getMovieDetails(this.movieId)).subscribe({

      next : (result) => {

        this.movieDetails = result;

        this.movieDetails.Runtime = this.generalServices.formatDuration(this.movieDetails.Runtime)

        this.movieDetails.Language = this.generalServices.splitString(this.movieDetails.Language);

        console.log(result)
          
      },error : (err) => {
          
      },

    })

    // Fetching ratings

    // (await this.IMDBServices.getRatings(this.movieId)).subscribe({

    //   next : (data: any) => {

    //     console.log(data)
    //     this.ratings = data.results.averageRating;
  
    //   },error(err) {
          
    //   },

    // });

  }



}
