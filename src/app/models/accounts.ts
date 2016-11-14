/* * * ./app/models/accounts.ts * * */
export class AccountsModel {
    constructor(
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public password2: string,
        public favteam: string
    ){}
}