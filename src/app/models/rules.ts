/* * * ./app/models/rules.ts * * */
export class RulesModel {
    constructor(
        public text: string,
        public points: number,
        public active: boolean,
    ){}
}