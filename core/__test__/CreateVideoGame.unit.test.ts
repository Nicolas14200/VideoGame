import { VideoGame } from "../entities/VideoGame";
import { Category } from "../type/Category";
import { Platform } from "../type/Platform";
import { CreateVideoGame } from "../usecase/CreateVideoGame";
import { InMemoryVideoGameRepository } from "./InMemoryVideoGameRepository"

describe ("Unit - CreateVideoGame", () => {
    it("Doit créé un jv", async () => {
        const videoGamerepo = new InMemoryVideoGameRepository();
        const createVideoGame = new CreateVideoGame(videoGamerepo);
        const videoGame = await createVideoGame.execute({
            title: "string",
            synopsis: "string",
            rating: 10,
            cover: "string",
            preview: "string",
            publisher: "string",
            category: Category.Fps,
        })
        expect(videoGame.properties.title).toEqual("string");
    })
    it ("retourne une exeption si la note est inferieur a 0 ", async () => {
        const videoGamerepo = new InMemoryVideoGameRepository();
        const createVideoGame = new CreateVideoGame(videoGamerepo);
        const videoGame =  createVideoGame.execute({
            title: "string",
            synopsis: "string",
            rating: -1,
            cover: "string",
            preview: "string",
            publisher: "string",
            category: Category.Fps,
        })
        await expect(videoGame).rejects.toThrow(new Error('RATING_NOT_INFERIOR_AT_ZERO'));
    })
    it ("retourne une exeption si la note est superieur a 20 ", async () => {
        const videoGamerepo = new InMemoryVideoGameRepository();
        const createVideoGame = new CreateVideoGame(videoGamerepo);
        const videoGame = createVideoGame.execute({
            title: "string",
            synopsis: "string",
            rating: 21,
            cover: "string",
            preview: "string",
            publisher: "string",
            category: Category.Fps,
        })
        await expect(videoGame).rejects.toThrow(new Error('RATING_NOT_SUPERIOR_AT_TWENTY'));
    })
    it ("enregiste une nouvelle paltform ", async () => {
        const videoGamerepo = new InMemoryVideoGameRepository();
        const createVideoGame = new CreateVideoGame(videoGamerepo);
        const videoGame = await createVideoGame.execute({
            title: "string",
            synopsis: "string",
            rating: 18,
            cover: "string",
            preview: "string",
            publisher: "string",
            category: Category.Fps,
        })
        videoGame.properties.platforms.push(Platform.Pc)
        expect(videoGame.properties.platforms).toEqual([Platform.Pc]);
    })
    it ("retourne une exeption si la date est invalid ", async () => {
        const videoGamerepo = new InMemoryVideoGameRepository();
        const createVideoGame = new CreateVideoGame(videoGamerepo);
        const videoGame = await createVideoGame.execute({
            title: "string",
            synopsis: "string",
            rating: 18,
            cover: "string",
            preview: "string",
            publisher: "string",
            category: Category.Fps,
        })
       
        await expect(videoGame).rejects.toThrow(new Error('DATE_NOT_CONFORM'));
    })
})