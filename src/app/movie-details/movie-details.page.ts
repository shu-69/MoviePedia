import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IMDBService } from '../services/imdb.service';
import { OMDBService } from '../services/omdb.service';
import { GeneralService } from '../services/general.service';
import { SetOverlaysWebViewOptions, StatusBar } from '@capacitor/status-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MovieDetailsPage implements OnInit {

  movieId: string = 'tt1270797';

  movieDetails: any = undefined;

  constructor(private activatedRoute: ActivatedRoute, private location: Location, private IMDBServices: IMDBService, private OMDBServices: OMDBService, public generalServices: GeneralService) {

    this.activatedRoute.queryParams.subscribe((data: any) => {

      this.movieId = data.imdbId;

      this.fetchMovieDetails();

      console.log(data)

    })

  }

  async ngOnInit() {

    

  }

  ionViewWillEnter() {

    // StatusBar.hide();

    let options: SetOverlaysWebViewOptions = {
      overlay: true
    }

    StatusBar.setOverlaysWebView(options)
    // StatusBar.setBackgroundColor({ 'color': Params.COLORS.PRIMARY_BACKGROUND })

    // let style: StyleOptions = {
    //   style: Style.Dark
    // }

    // StatusBar.setStyle(style)

  }

  async fetchMovieDetails() {

    // Fetch movie details

    (await this.OMDBServices.getMovieDetails(this.movieId)).subscribe({

      next : (result) => {

        this.movieDetails = result;

        this.movieDetails.Runtime = this.generalServices.formatDuration(this.movieDetails.Runtime)

        this.movieDetails.Language = this.generalServices.splitString(this.movieDetails.Language);

        console.log(result)
          
      },error : (err) => {
        
        console.log(err)

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

  goBack() {

    this.location.back()

  }

}
