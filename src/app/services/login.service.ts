//Angular
import { Injectable, Inject }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
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

    constructor (
        private router: Router,
        public af: AngularFire,
        @Inject(FirebaseApp) firebase: any
    ){
        this.firebase = firebase;
    }

    setUser(user): void { 
        this.user = user;
        //update last activity
        if(this.user != undefined && this.user != null){
            console.log('updated')
            this.af.database.object(`users/${this.user.uid}`).update({lastactivity: new Date().getTime()});
        }
    }

    getAuthenticated(): Observable<any> { 
        return this.af.auth; 
    }

    getAdmin(): Observable<boolean> {
        return new Observable<boolean>( observer => {
            if(this.user){
                this.af.database.object(`users/${this.user.uid}`)
                    .subscribe( data => {   if(data.hasOwnProperty('admin')){
                                                observer.next(true);
                                            } else {
                                                observer.next(false);
                                            }
                                        },
                                err  => {   observer.next(false); });
            }
        })
    }

    emailLogin(login: LoginModel): Promise<any> {
        let creds: any = { email: login.email, password: login.password };
        let provider: any = { provider: AuthProviders.Password, method: AuthMethods.Password };

        return new Promise((resolve, reject) => {
          this.af.auth.login(creds, provider)
                .then(result => { resolve(result); })
                .catch(error => { reject(error.message || error ); });
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
                    photo: result.auth.photoURL,
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
                        photo: result.auth.photoURL,
                });
                resolve(result); 
            })
            .catch(error => { 
                reject(error.message || error ) 
            });
        });
    }

    createUser(account: AccountsModel): Promise<any> {
        let creds: any = { email: account.email, password: account.password };

        return new Promise((resolve, reject) => {
            this.af.auth.createUser(creds).then(result => {
                this.af.database.object(`/users/${result.auth.uid}`).set({
                    firstName: account.firstname,
                    lastName: account.lastname,
                    email: account.email,
                    photo: 'https://firebasestorage.googleapis.com/v0/b/api-project-340883542890.appspot.com/o/avatars%2Fempty-avatar.jpg?alt=media&token=c263cd0f-59ff-4b87-a5f1-59cb6b3e681d',
                });
                resolve(result);
            })
            .catch(error => {
                console.log(error);reject(error.message || error ) 
            });
        });
    }

    resetUserPW(user: ForgotModel): Promise<any> {
        return this.firebase.auth().sendPasswordResetEmail(user.email);
    }

    setnewMemberPw(adminmember: AdminMembersModel): void {
        
    }

    logout(): void {
        this.user = {};
        this.af.auth.logout();
        this.router.navigate(['/login']);
    }

}