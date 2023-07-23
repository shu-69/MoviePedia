import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar, SetOverlaysWebViewOptions, StyleOptions, Style } from '@capacitor/status-bar';
import { IonInfiniteScroll, ToastController, ToastOptions } from '@ionic/angular';
import { Movie, Params } from 'src/app/Params';
import { GeneralService } from 'src/app/services/general.service';
import { IMDBService } from 'src/app/services/imdb.service';
import { SpeechRecognition, SpeechRecognitionListeningOptions } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { OMDBService } from 'src/app/services/omdb.service';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
  styleUrls: ['./search-tab.page.scss'],
})
export class SearchTabPage implements OnInit {

  @ViewChild('infiniteScroll') infiniteScroll!: IonInfiniteScroll;

  @ViewChild('searchInput') searchInput!: HTMLInputElement;

  imageErrorAlt = 'assets/pichonicons/icons8_image_30px.png';

  resultType: 'top' | 'releated' = 'top';
  isSearching: boolean = false;
  noResult: boolean = false;

  searchResults: Movie[] = []

  searchResultText: string = '';

  nextPage: string | null | undefined = undefined;
  currentPrompt: string = '';

  constructor(private IMDBServices: IMDBService, private OBDBServices: OMDBService, private generalServices: GeneralService, private speechRecognition: SpeechRecognition,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {


  }

  ionViewWillEnter() {

    StatusBar.show();

    let options: SetOverlaysWebViewOptions = {
      overlay: false
    }

    StatusBar.setOverlaysWebView(options)

    StatusBar.setBackgroundColor({ 'color': Params.COLORS.PRIMARY_BACKGROUND })

    let style: StyleOptions = {
      style: Style.Dark
    }

    StatusBar.setStyle(style)

  }

  async doSearch(prompt: string, clearPrevSearch: boolean = false, pageNo: string = '1') {

    console.log('Searching', prompt)

    if (clearPrevSearch)
      this.searchResults = [];

    this.isSearching = true;

    switch(this.resultType) {

      case 'top' : {

        (await this.IMDBServices.search(prompt.toLowerCase(), pageNo)).subscribe({

          next: (data: any) => {
    
            console.log('Got data', data)
    
            this.isSearching = false;
    
            if(data.entries == 0){
    
              this.noResult = true;
    
            }else{
              
              this.noResult = false;
    
            }
    
            this.searchResultText = `Search results for '${prompt}'`;
    
            this.nextPage = data.next ? data.next.split('page=')[1] : undefined;
            this.currentPrompt = prompt;
    
            this.infiniteScroll?.complete();
    
            data.results?.map((element: any) => { this.searchResults.push({ image: element.primaryImage ? element.primaryImage.url : this.imageErrorAlt }) });
            //data.results?.map(async (element: any) =>{ this.searchResults.push({ image: element.primaryImage ? await this.generalServices.getBase64FromUrl(element.primaryImage.url, true, 0.2) : '' }) });
    
            this.changeDetectorRef.detectChanges()
    
          },
    
        })

        break;

      }

      case 'releated' : {

        (await this.OBDBServices.search(prompt.toLowerCase())).subscribe({

          next: (data: any) => {
    
            console.log('Got data', data)
    
            this.isSearching = false;
    
            if(data.entries == 0){
    
              this.noResult = true;
    
            }else{
              
              this.noResult = false;
    
            }
    
            this.searchResultText = `Search results for '${prompt}'`;
    
            this.nextPage = data.next ? data.next.split('page=')[1] : undefined;
            this.currentPrompt = prompt;
    
            this.infiniteScroll?.complete();
    
            data.results?.map((element: any) => { this.searchResults.push({ image: element.primaryImage ? element.primaryImage.url : this.imageErrorAlt }) });
            //data.results?.map(async (element: any) =>{ this.searchResults.push({ image: element.primaryImage ? await this.generalServices.getBase64FromUrl(element.primaryImage.url, true, 0.2) : '' }) });
    
            this.changeDetectorRef.detectChanges()
    
          },

        })

        break;

      }

      default : {

        this.isSearching = false;

        break;

      }

    }   

  }

  handleSearchTypeChange(e: any){

    e.target.checked ? this.resultType = 'releated' : this.resultType = 'top';

    console.log(this.resultType)

  }

  async startSpeechRecognization() {

    try{

      if (await this.speechRecognition.isRecognitionAvailable()) {

        this.speechRecognition.hasPermission()
          .then((hasPermission: boolean) => {
  
            if (hasPermission) {
  
              let options : SpeechRecognitionListeningOptions = { }
  
              this.speechRecognition.startListening(options)
              .subscribe(
                (matches: string[]) => {

                  console.log(matches)
  
                  this.currentPrompt = matches[0];

                  this.doSearch(matches[0], true)

                  this.changeDetectorRef.detectChanges()
  
                },
                (onerror) => this.generalServices.showToast('Please try again!')
              )
  
            } else {
  
              this.speechRecognition.requestPermission()
                .then(
                  () => this.startSpeechRecognization(),
                  () => this.generalServices.showToast('Mic permission required for Speech Recognition')
                )
  
            }
  
          })
  
      } else {
  
        this.generalServices.showToast('Device doesn\'t support Speech Recognition');
  
      }

    }catch(e) {

      this.generalServices.showToast('Device doesn\'t support Speech Recognition');

    }  

  }

  async onIonInfinite() {

    if (!this.nextPage)
      return

    await this.doSearch(this.currentPrompt, false, this.nextPage);

  }

}
