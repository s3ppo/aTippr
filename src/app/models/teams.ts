/* * * ./app/models/teams.ts * * */
export class TeamsModel {
    constructor(
        public teamname: string,
        public flag: any,
        public group: string,
    ){}
}

export class TeamsModelView {
    constructor(
        public teamname: string,
        public flag: string,
        public group: string,
    ){}
}