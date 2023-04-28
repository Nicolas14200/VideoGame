import { Category } from "../type/Category";
import { Platform } from "../type/Platform";
import { PlayerRating } from "../type/PlayerRating";
import { uuid } from "uuidv4";

export interface VideoGameProperties {
    id : string;
    title: string;
    platforms: Platform[];
    synopsis: string;
    rating: number;
    playerRating: PlayerRating[];
    cover: string;
    preview: string;
    publisher: string;
    releaseDate: Date ;
    category: Category;
}

export class VideoGame {
    properties: VideoGameProperties;
    constructor(properties: VideoGameProperties){
        this.properties = properties;
    }
    static async create (properties:{
        title: string;
        synopsis: string;
        rating: number;
        cover: string;
        preview: string;
        publisher: string;
        category: Category;
    }){
        if ( properties.rating < 0 ){
            throw new Error('RATING_NOT_INFERIOR_AT_ZERO');
        }
        if ( properties.rating > 20  ){
            throw new Error('RATING_NOT_SUPERIOR_AT_TWENTY');
        }
        const releaseDate = new Date();
        if (!releaseDate){
            throw new Error('DATE_NOT_CONFORM');
        }
        return new VideoGame({
            ...properties,
            id : uuid(),
            playerRating : [],
            releaseDate: releaseDate,
            platforms: [],
        })
    }
}
