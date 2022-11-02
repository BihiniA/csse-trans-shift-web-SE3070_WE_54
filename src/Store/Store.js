import { applyMiddleware, compose, createStore } from "redux";
import firebase from "../Config/FirebaseConfig";
import { getFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import RootReducer from "./Reducers";
import thunk from "redux-thunk";

//singleton pattern
let singletonStoreInstance = null;

class Singleton {
    constructor() {
        if (!singletonStoreInstance) {
            singletonStoreInstance = this;
            singletonStoreInstance = createStore(RootReducer,
                compose(
                    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
                    reduxFirestore(firebase)
                )
            );

        }
        return singletonStoreInstance;
    }
}

const store = new Singleton();
export default store;
