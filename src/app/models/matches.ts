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
        public matchstart: string,
        public deadline: string,
        public multiplier: number,
    ){}
}