function Promise(promise) {
    if (promise instanceof Promise) {
        return promise;
    } else {
        // this is a new promise chain
        this.callbacks = {
            '0'    : [],
            '1'    : [],
            'done' : []
        };
        this.state = undefined; // Explicitly set state to undefined for the "unresolved"
    }
}

Promise.prototype.then = function( successCb, errorCb, doneCb ) {
    if ( successCb && typeof successCb === 'function' )  this.callbacks['1'].push(successCb);
    if ( errorCb && typeof rejectCb === 'function' )  this.callbacks['0'].push(errorCb);

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
    console.log(this.callbacks);
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