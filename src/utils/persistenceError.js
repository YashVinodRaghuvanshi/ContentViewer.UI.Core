let persistenceErrorHandler = null;

export const registerPersistenceErrorHandler = (callback) => {
    persistenceErrorHandler = callback;

    return () => {
        if (persistenceErrorHandler === callback) {
            persistenceErrorHandler = null;
        }
    }
}

export const handlerPersistenceError = (error) => {
    console.log("IndexedDB persistence error : "+error);
    persistenceErrorHandler?.(error);
}