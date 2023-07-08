import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SetOverlaysWebViewOptions, StatusBar, Style, StyleOptions } from '@capacitor/status-bar';
import { Movie, TitleMovie } from 'src/app/Params';
import { IMDBService, List } from 'src/app/services/imdb.service';

import Swiper, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

Swiper.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeTabPage implements OnInit {

  @ViewChild('titleMoviesSwiper') titleMoviesSwiper: SwiperComponent | undefined;

  titleMovies: TitleMovie[] = [];

  topWeekendMovies: TitleMovie[] = [];

  isTitleLoading : boolean = false;

  isContentLoading : boolean = false;

  constructor(private IMDBServices: IMDBService, private http: HttpClient, private sanitizer: DomSanitizer) {



  }

  ngAfterContentChecked() {

    if (this.titleMoviesSwiper) {
      this.titleMoviesSwiper.updateSwiper({})
      this.titleMoviesSwiper.swiperRef.autoplay.start();
    }

  }

  async ngOnInit() {

   this.loadTitleMovies();

   this.loadContents();    

  }

  async loadTitleMovies() {

    (await this.IMDBServices.getUpcoming(3)).subscribe({

      next: async (data: any) => {

        // for (const element of data.results) {
        //   try {
        //     const image = await this.getBase64FromUrl(element.primaryImage.url, true, 0.6);
        //     this.titleMovies.push({ id: element.id, image, title: element.titleText.text });
        //   } catch (e) {
        //   }
        // }

        await data.results?.forEach(async (element: any) => {

          // await this.getBase64FromUrl(element.primaryImage.url, true, 0.6)

          try {
            this.titleMovies.push({
              id: element.id, image: element.primaryImage.url,
              compressedImg: await this.getBase64FromUrl(element.primaryImage.url, true, 0.2), title: element.titleText.text
            })
          } catch (e) { }

        });

        // this.titleMovies.forEach(async element => {
        //   element.image = await this.getBase64FromUrl(element.image, true, 0.6);
        // });

      },

    });


  }

  async loadContents() {

    this.isContentLoading = true;

    ((await this.IMDBServices.getMoviesByTitle(List.TopBoxOfficeLastWeekend10, 10)).subscribe({

      next: async (data: any) => {

        this.isContentLoading = false;

        for (const element of data.results) {
          try {
            this.isContentLoading = true;
            const image = await this.getBase64FromUrl(element.primaryImage.url, true, 0.2);
            this.topWeekendMovies.push({ id: element.id, image: element.primaryImage.url, compressedImg: image, title: element.titleText.text });
            this.isContentLoading = false;
          } catch (e) {
          }
        }

      }, error : (err) => {
        
        console.error(err)
        this.isContentLoading = false;

      }

    }))

  }

  ionViewWillEnter() {

    StatusBar.show();

    let options: SetOverlaysWebViewOptions = {
      overlay: true
    }

    StatusBar.setOverlaysWebView(options)

    // StatusBar.setBackgroundColor({ 'color': Params.COLORS.PRIMARY_BACKGROUND })

    let style: StyleOptions = {
      style: Style.Dark
    }

    StatusBar.setStyle(style)

  }

  getBase64FromUrl(url: string, compress: boolean = false, quality: number = 0.8): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' })
        .subscribe((blob: Blob) => {
          if (compress) {
            this.compressImage(blob, quality)
              .then((compressedBlob: Blob) => {
                this.readImage(compressedBlob, resolve, reject);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            this.readImage(blob, resolve, reject);
          }
        }, (error) => {
          reject(error);
        });
    });
  }

  private compressImage(blob: Blob, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const maxWidth = 800;
          const maxHeight = 800;
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          context?.drawImage(image, 0, 0, width, height);

          canvas.toBlob((compressedBlob) => {
            resolve(compressedBlob!);
          }, 'image/jpeg', quality);
        };
      };
      reader.onerror = () => {
        reject('Error reading image file.');
      };
      reader.readAsDataURL(blob);
    });
  }

  private readImage(blob: Blob, resolve: (value: SafeUrl | PromiseLike<SafeUrl>) => void, reject: (reason?: any) => void) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const base64Image = this.sanitizer.bypassSecurityTrustUrl(base64Data);
      resolve(base64Data);
    };
    reader.onerror = () => {
      reject('Error reading image file.');
    };
    reader.readAsDataURL(blob);
  }

  // async getBase64FromUrl(url: string): Promise<any> {

  //   return new Promise((resolve, reject) => {
  //     this.http.get(url, { responseType: 'blob' })
  //       .subscribe((blob: Blob) => {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           const base64Data = reader.result as string;
  //           const base64Image = this.sanitizer.bypassSecurityTrustUrl(base64Data);
  //           resolve(base64Data);
  //         };
  //         reader.onerror = () => {
  //           reject('Error reading image file.');
  //         };
  //         reader.readAsDataURL(blob);
  //       }, (error) => {
  //         reject(error);
  //       });
  //   });

  // }

}
