/* * * ./app/models/accounts.ts * * */
export class AccountsModel {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public password2: string,
    ){}
}