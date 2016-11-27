/* * * ./app/models/adminmembers.ts * * */
export class AdminMembersModel {
    constructor(
        public name: string,
        public paid: boolean,
        public admin: boolean,
    ){}
}