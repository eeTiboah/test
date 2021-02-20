import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: 'AIzaSyDXMchBW8zxbs1kQdwXXNBYKGYO73nksU4',
    authDomain: 'techaqua.firebaseapp.com',
    projectId: 'techaqua',
    storageBucket: 'techaqua.appspot.com',
    messagingSenderId: '709835234283',
    appId: '1:709835234283:web:689e936abe61d1422e97ae'
}

firebase.initializeApp(config);
export default firebase