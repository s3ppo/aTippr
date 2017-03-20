//Angular
import { Injectable, Inject }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable, Subject, BehaviorSubject } from 'rxjs';
//Firebase
import { AngularFire, AuthProviders, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable, AuthMethods, FirebaseApp } from 'angularfire2';
//Models
import { LoginModel } from '../models/login';
import { AccountsModel } from '../models/accounts';
import { AdminMembersModel } from '../models/adminmembers';
import { ForgotModel } from '../models/forgot';

@Injectable()
export class LoginService {

    public user: any;
    public firebase: any;
    public userdata: Observable<any>;

    constructor (
        private router: Router,
        public af: AngularFire,
        @Inject(FirebaseApp) firebase: any
    ){
        this.firebase = firebase;
    }

    setUser(user): void {
        this.user = user;
        if(this.user != undefined && this.user != null) {
            //provide userdata as observable
            this.userdata = this.af.database.object(`users/${this.user.uid}`).take(1);
            this.userdata.subscribe(userdata => {
                let memberobj = { 
                    lastactivity: new Date().getTime(), 
                    firstName: userdata.firstName,
                    lastName: userdata.lastName,
                    email: userdata.email
                }
                //Check if photo or social photo exists
                if(userdata.hasOwnProperty('photo')) {
                    memberobj['photo'] = userdata.photo;
                }
                if(userdata.hasOwnProperty('photoSocial')) {
                    memberobj['photoSocial'] = userdata.photoSocial;
                }
                //update user and last activity
                this.af.database.object(userdata.gameid+`/members/${this.user.uid}`).update(memberobj);
            });
        }
    }

    getAuthenticated(): Observable<any> { 
        return this.af.auth; 
    }

    emailLogin(login: LoginModel): Promise<any> {
        let creds: any = { email: login.email, password: login.password };
        let provider: any = { provider: AuthProviders.Password, method: AuthMethods.Password };

        return new Promise((resolve, reject) => {
          this.af.auth.login(creds, provider)
                .then(result => { 
                    resolve(result);
                }).catch(error => { 
                    reject(error.message || error ); 
                });
        });
    }

    loginGoogle(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.af.auth.login({
                provider: AuthProviders.Google,
                method: AuthMethods.Popup
            })
            .then(result => {
                let names = result.auth.displayName.split(' ');
                this.af.database.object(`/users/${result.auth.uid}`).update({
                    firstName: names[0],
                    lastName: names[1],
                    email: result.auth.email,
                    photoSocial: result.auth.photoURL,
                    gameid: '-Kf19Tht26iLL6I6rQnc'      //TODO
                });
                resolve(result); 
            })
            .catch(error => { 
                reject(error.message || error ) 
            });
        });
    }

    loginFacebook(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.af.auth.login({
                provider: AuthProviders.Facebook,
                method: AuthMethods.Popup
            })
            .then(result => {
                let names = result.auth.displayName.split(' ');
                this.af.database.object(`/users/${result.auth.uid}`).update({
                        firstName: names[0],
                        lastName: names[1],
                        email: result.auth.email,
                        photoSocial: result.auth.photoURL,
                        gameid: '-Kf19Tht26iLL6I6rQnc'      //TODO
                });
                resolve(result); 
            })
            .catch(error => { 
                reject(error.message || error ) 
            });
        });
    }

    createUser(account: AccountsModel, newGame: boolean): Promise<any> {
        let creds: any = { email: account.email, password: account.password };

        return new Promise((resolve, reject) => {
            this.af.auth.createUser(creds).then(result => {
                let newUser:any = {
                    firstName: account.firstname,
                    lastName: account.lastname,
                    email: account.email,
                    photo: 'https://firebasestorage.googleapis.com/v0/b/api-project-340883542890.appspot.com/o/avatars%2Fempty-avatar.jpg?alt=media&token=099e930a-fc4b-4506-a2d5-162712a095bd',
                }
                if(newGame) {
                    newUser.gameid = this.setupNewGame(result.auth.uid, newUser);
                } else {
                    newUser.gameid = account.gameid
                }
                this.af.database.object(`/users/${result.auth.uid}`).set(newUser).then( res => {
                    resolve(result);
                }).catch( err => {
                    reject(err.message || err ) 
                });
            })
            .catch(error => {
                reject(error.message || error ) 
            });
        });
    }

    resetUserPW(user: ForgotModel): Promise<any> {
        return this.firebase.auth().sendPasswordResetEmail(user.email);
    }

    setupNewGame(newUserID: String, user: any): Promise<String> {
        return new Promise((resolve, reject) => {
            this.af.database.list(`/games/`).push({public: true}).then( (data) => {
                resolve(data.key);
            })
        })
    }

    logout(): void {
        this.user = {};
        this.af.auth.logout();
        this.router.navigate(['/login']);
    }

}