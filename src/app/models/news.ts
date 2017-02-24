/* * * ./app/models/news.ts * * */
export class NewsModel {
    constructor(
        public text: string,
        public user: string,
        public created: number,
    ){}
}