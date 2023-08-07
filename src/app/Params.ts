export class Params {

    static COLORS = {

        PRIMARY_BACKGROUND : '#000000'

    }

}

export interface TitleMovie {

    id: string, 
    image: string,
    compressedImg: string,
    title: string

}

export interface SearchResultMovie {

    image: string,
    imdbID?: string,
    id?: string,
        
}