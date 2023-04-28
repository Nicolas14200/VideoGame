import { VideoGame } from "../entities/VideoGame";
import { VideoGameRepository } from "../repository/VideoGameRepository";

export class InMemoryVideoGameRepository implements VideoGameRepository {
    listVideoGame : VideoGame[] = []
    async getById(videoGameId: string): Promise<VideoGame> {
        const videoGame = this.listVideoGame.find( videoGame => {
            return videoGame.properties.id === videoGameId
        })
        if (!videoGame){
            throw new Error("VIDEO_GAME_NOT_EXIST");
        }
        return videoGame;
    }
    async save(videoGame: VideoGame): Promise<VideoGame> {
        this.listVideoGame.push(videoGame);
        return videoGame;
    }
    
}