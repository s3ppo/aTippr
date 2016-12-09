/* * * ./app/models/teams.ts * * */
export class TeamsModel {
    constructor(
        public teamname: string,
        public group: string,
        public flag: any,
    ){}
}

export class TeamsModelView {
    constructor(
        public teamname: string,
        public group: string,
        public flag: string,
    ){}
}