// Add Payment 
export const addPayment = (details, callback) => {
    return (dispatch, getState, { getFirestore }) => {

        dispatch({ type: 'SHOW_BACKDROP' });
        const firestore = getFirestore();

        firestore.collection('Payments').add(
            details
        ).then(() => {
            dispatch({ type: 'HIDE_BACKDROP' });
            callback(
                {
                    status: true,
                }
            )
        }).catch(err => {
            dispatch({ type: 'HIDE_BACKDROP' });
            console.log("Error occurred while FIREBASE DATA UPLOADING", err);
            callback(
                {
                    status: false,
                    error: "Error occurred while FIREBASE DATA UPLOADING"
                }
            )
        });
    }
};

// Delete Payment
export const deletePayment = (id, callback) => {
    return (dispatch, getState, { getFirestore }) => {

        dispatch({ type: 'SHOW_BACKDROP' });
        const firestore = getFirestore();

        firestore.collection("Payments").doc(id).delete()
            .then(res => {
                dispatch({ type: 'HIDE_BACKDROP' });
                callback(
                    {
                        status: true,
                    }
                )
            }).catch(error => {
                console.log(error)
                dispatch({ type: 'HIDE_BACKDROP' });
                callback(
                    {
                        status: false,
                        error: error
                    }
                )
            })
    }
};

