/* * * ./app/models/members.ts * * */
export class MembersModel {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public pictureUrl: string,
        public lastactivity?: number,
    ){}
}