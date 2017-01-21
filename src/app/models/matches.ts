/* * * ./app/models/matches.ts * * */
export class MatchesModel {
    constructor(
        public team1: string,
        public team2: string,
        public category: string,
        public matchlocation: string,
        public matchstart: string,
        public matchstarttime: string,
        public deadline: string,
        public deadlinetime: string,
        public multiplier: string,
    ){}
}

export class MatchesModelAll {
    constructor(
        public team1: string,
        public team2: string,
        public category: string,
        public matchlocation: string,
        public matchstart: number,
        public deadline: number,
        public multiplier: number,
        public result1?: number,
        public result2?: number,
    ){}
}

export class MatchesModelTipper {
    constructor(
        public team1: string,
        public team2: string,
        public category: string,
        public matchlocation: string,
        public matchstart: string,
        public deadline: number,
        public multiplier: number,
        public tippkey: string,
        public tipp1: number,
        public tipp2: number,
        public background: string,
    ){}
}