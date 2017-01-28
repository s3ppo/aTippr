/* * * ./app/models/chat.ts * * */
export class ChatModel {
    constructor(
        public created: number,
        public message: string,
        public user: string,
    ){}
}