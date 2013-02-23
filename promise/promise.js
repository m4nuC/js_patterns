function Promise() {
    // Callbacks are stored in object that match the status
    // so 0 for refused and 1 for succes, undefined being the pending state
    this.callbacks = {
        '0'    : [],
        '1'    : [],
        'done' : []
    };
     // Explicitly set state to undefined for the "unresolved"
    this.state = undefined;
}



Promise.prototype.then = function( successCb, errorCb, doneCb ) {
    if ( successCb && typeof successCb === 'function' )  this.callbacks['1'].push(successCb);
    if ( errorCb && typeof rejectCb === 'function' )  this.callbacks['0'].push(errorCb);

    // If state is define them promised is clompleted so if more callbacks are added 
    // execute them right away
    if ( this.state ) {
        for ( var callback in this.callbacks[this.state] ) {
            callback.apply(this, arguments);
        }
        for ( var doneCallback in this.callbacks.done ) {
            doneCallback.apply(this, arguments);
        }
    }
    return this;
};


Promise.prototype.success = function() {
    this.state = 1;
    for ( var callback in this.callbacks[this.state] ) {
         this.callbacks[this.state][callback].apply(this, arguments);
    }
};


Promise.prototype.error = function() {
    this.state = 0;
    for ( var callback in this.callbacks[this.state] ) {
        this.callbacks[this.state][callback].apply(this, arguments);
    }
};




function doAsyncStuff(delay) { 
    var promise = new Promise();
     setTimeout( function() { 
        promise.success(delay);
     }, delay);
     return promise;
}

doAsyncStuff(1000).then( function( delay ) {console.log('This took ' + delay + ' ms to appear');} );
console.log('This will appear before');