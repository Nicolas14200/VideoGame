import { VideoGame } from "../entities/VideoGame";
import { VideoGameRepository } from "../repository/VideoGameRepository";
import { Category } from "../type/Category";
import { Platform } from "../type/Platform";

export interface CreateVideoGamePayload {
    title: string;
    synopsis: string;
    rating: number;
    cover: string;
    preview: string;
    publisher: string;
    category: Category;
}

export class CreateVideoGame {
    videoGameRepository: VideoGameRepository;
    constructor(videoGameRepository: VideoGameRepository){
        this.videoGameRepository = videoGameRepository;
    }
    async execute(payload: CreateVideoGamePayload){
        const videoGame = await VideoGame.create({
            title: payload.title,
            synopsis: payload.synopsis,
            rating: payload.rating,
            cover: payload.cover,
            preview: payload.preview,
            publisher: payload.publisher,
            category: Category.Fps, 
        })
        await this.videoGameRepository.save(videoGame);
        return videoGame ;
    }
}