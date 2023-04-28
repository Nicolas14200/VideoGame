import { VideoGame } from "../entities/VideoGame";

export interface VideoGameRepository {
    getById(videoGameId: string):Promise<VideoGame>;
    save(videoGame: VideoGame):Promise<VideoGame>;
}