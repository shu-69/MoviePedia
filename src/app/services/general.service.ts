import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastController, ToastOptions, } from '@ionic/angular';
import { NavController, NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { Storage } from '@ionic/storage-angular';
import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private storage: Storage, private http: HttpClient, private youtube: YoutubeVideoPlayer, private sanitizer: DomSanitizer, private toastCtrl: ToastController) { }

  async showToast(message: string, position: 'top' | 'bottom' | 'middle' = 'bottom', mode : 'ios' | 'md' = 'ios') {

    let options : ToastOptions = {

      message: message,
      position: position,
      mode: mode,
      duration: 3000

    }

    const toast = await this.toastCtrl.create(options);

    toast.present()

  }
  
  saveLoginDetails(username: string, password: string) {

    this.storage.set('username', username);
    this.storage.set('password', password);

  }

  removeLoginDetails() {

    this.storage.remove('username');
    this.storage.remove('password');

  }

  openMovieDetails(imdbId: string, navCtrl: NavController) {

    const options : NavigationOptions = {

      queryParams: {

        'imdbId': imdbId

      }

    }

    navCtrl.navigateForward('movie-details', options);

  }

  openYoutubeVideo(videoId: string) {

    this.youtube.openVideo(videoId);

  }

  async shareContent(title: string, text: string, dialogTitle: string, url?: string) {

    await Share.share({
      title: title,
      text: text,
      url: url,
      dialogTitle: dialogTitle,
    });

  }

  getAppDownloadUrl() : string {

    return 'https://ionicframework.com/docs/native/share';

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

  formatDuration(durationStr: string, outputFormat = 'short'): string {
    const durationMinutes: number = parseInt(durationStr.split(" ")[0], 10);
    const hours: number = Math.floor(durationMinutes / 60);
    const minutes: number = durationMinutes % 60;
  
    if (outputFormat === "long") {
      // Long format: "2 hours 30 mins"
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""}`;
    } else if (outputFormat === "short") {
      // Short format: "2:30 hours"
      return `${hours}:${minutes.toString().padStart(2, "0")} hours`;
    } else {
      return ""; // Invalid outputFormat. Use 'long' or 'short'.
    }
  } 

  splitString(inputString: string): string[] {
    // Split the input string using the comma separator
    const resultArray: string[] = inputString.split(',').map(lang => lang.trim());
    return resultArray;
  }

}
