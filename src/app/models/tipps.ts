/* * * ./app/models/tipps.ts * * */
export class TippsModel {
    constructor(
        public matchid: string,
        public team1: string,
        public team2: string,
        public tipp1: number,
        public tipp2: number,
    ){}
}