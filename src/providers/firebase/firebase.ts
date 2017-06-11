import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {

    constructor() {
        let config = {
            apiKey: "AIzaSyDcZ1qYx6jHnJYmzH3F0CwfX_Tcrj35isg",
            authDomain: "taskm-c886f.firebaseapp.com",
            databaseURL: "https://taskm-c886f.firebaseio.com",
            projectId: "taskm-c886f",
            storageBucket: "taskm-c886f.appspot.com",
            messagingSenderId: "118721348329"
        };
        firebase.initializeApp(config);
    }

    database() {
        return firebase.database();
    }

    auth() {
        return firebase.auth();
    }

}
