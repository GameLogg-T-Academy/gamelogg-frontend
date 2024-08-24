export interface Game {
    id: number;
    title: string;
    description: string;
    url: string;
    price: number;
    rating: number;
    releaseDate: Date;
    genre: string;
    favorite?: Boolean;
    status?: String;
    developer?: String;
    publisher?: String;
}