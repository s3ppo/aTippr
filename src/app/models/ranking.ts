/* * * ./app/models/ranking.ts * * */
export class RankingModel {
    constructor(
        public user: string,
        public points: number, 
    ){}
}

export class RankingModelAll {
    constructor(
        public points: number, 
    ){}
}