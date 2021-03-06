/* * * ./app/models/members.ts * * */
export class MembersModel {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public photo: string,
        public photoSocial: string,
        public lastactivity?: number,
        public chatactivity?: number,
    ){}
}