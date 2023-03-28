const error = store => next => action => {
    if (action.type === 'showError') {
        console.log(action);
        return next(action);
    }
    next(action);
};

export default error;