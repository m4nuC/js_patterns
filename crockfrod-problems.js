// Douglas crocford problems from frontendmaster class
// https://frontendmasters.com/courses/javascript-the-good-parts/

// write a function that takes an argument returns that argument
// identity(3) // 3

function identity( arg ) {
	return arg;
}

// Write two birnary function add and mul that take two numbers and return their sum and product

function add( a, b ) {
	return a + b;
}

function mul( a, b) {
	return a * b;
}

// write a function that take an argument and return a function that returns that argument
// var idf = identifyf(3)
// idf() // 3

function identityf( arg ) {
	return function() {
		return arg;
	};
}

// write a function that adds form two invocations
// addf(3)(4) // 7

function addf( a ) {
	return function( b ) {
		return add( a, b );
	};
}

// write a function that takes a binary function that makes it callable with two invocation
// addf = applyf(add);
// addf(3)(4) // 7

function applyf( func ) {
	return function( a ) {
		return function( b ) {
			return func.apply(this, [a, b]);
		};
	};
}

// write a function that takes a function and argument and return a function that can supply a second argument
// add3 = curry(add, 3)
// add3(4) //7

function curry( func, arg) {
	return applyf( func )( arg );
}

// without adding any new functions, show three ways to create the inc function
// inc(5) //6
// inc(inc(5)) // 7

function inc( x ) { 
	return addf(1);
	// return curry( addf, 1);
	// return applyf(addf)(1);
}


// Write methodize, a function that converts a binary function to a method
// Number.prototyp.add = methodize(add);
// (3).add(4) //7

function methodize(func) {
	return function ( x ) {
		return func(this, x);
		};
}

// write demethodize a function that converts a method to a binary function
// demethodize(Number.prototype.add)(5,6) //11

function demethodize( meth ) {
	var that = this;
	return function( that, y) {
		return meth.call(that, x);
	};
}


// Write a function that take a binary function and return a unary function that passes tis argument to the binary function twice.
// var double = twice(add)
// double(11) //22
// var square = twice(mul)
// square(11) //121

function twice( func ) {
	return function( x ) {
		return func(x, x);
	};
}

var square = twice(mul);
var doublef = twice(add);

// write a function composeu that take two unary function and returns a unary function that call them both so :
// composeu(double, square)(3) //36

function composeu( func1, func2) {
	return function( x ) {
		return func2(func1(x));
	};
}

//write a function composeb that takes two binary functions and returns a function that call them both.
//so that 
//composeb(add, mul)(2,3,5) //25
function composeb( func1, func2 ) {
	return function( x, y ,z ) {
		return func2( func1(x,y), z );
	};
}

// Write a function that allows another function to only be called once
// So that: 
// add_once = once(add);
// add_once(3, 4) // 7
// add_once(3, 4) // Throw

function once( func ) {
	return func;
}

function once( func ) {
	var newFunc = func;
	return function() {
        var newFunc2 = newFunc;
        newFunc = null;
		return newFunc2.apply(this, arguments);
	};
}


// Write a factory function that return two functions that implements an up/down counter
// So that: 
// counter = counterf(10);
// counter.inc() // 11
// counter.dec() // 10

function counterf( num ) {
	return {

		inc : function() {
			return ++num;
		},

		dec: function() {
			return --num;
		}
	};
}

function coutnerf2( num ) {
	this.counter = num;

	this.inc = function() {
		return this.counter += 1 ;
	};

	this.dec = function() {
		return this.counter -= 1 ;
	};
}

// Make a revocable function that takes a nice function and returns a revoke function that denies access to the nice function, and an 
// invoke function that can invoke the nice function until it's revoked.
// So that : 
// temp - revocable(alert);
// temp.invoke('7') // alert: 7
// temp.revoke();
// temp.invoke('6') // throw

function revocable( func ) {
	return {
		invoke : function() {
			return func.apply( this, arguments);
		},

		revoke : function() {
			func = undefined;
		}
	};
}