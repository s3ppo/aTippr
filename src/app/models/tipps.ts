/* * * ./app/models/tipps.ts * * */
export class TippsModel {
    constructor(
        public tippkey: string,
        public category: string,
        public match: string,
        public tipp1: number,
        public tipp2: number,
    ){}
}