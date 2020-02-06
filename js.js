function log(arg) {
  document.writeln(arg)
}

//

function identity(x) {
  return x;
}

function add(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

function divide(x, y) {
  return x/y;
}

function mul(x, y) {
  return x * y;
}

function identityf(x) {
  function subfunc() {
    return x;
  }
}

function addf(x) {
  return function (y) {
    return x + y;
  }
}

function liftf(binaryf) {
  return function(a) {
    return function(b) {
//      return function(a,b) {
        return binaryf(a,b)
//      }
    }
  }
}

function curry(binaryf, a) {
  return function(b) {
    return binaryf(a,b)
  }
}


//Another way to write curry, using liftf
//Write a binary function who's two arguments are then separated into single
//arguments that are passed to a function that takes two separate, single
//arguments.
function curry2(binary, first) {
  return liftf(binary)(first);
}
//log(curry2(mul,5)(4))


//Three ways to increment/add 1 to a number

var plus1 = addf(1);
var plus1_v2 = curry(add, 1);
var plus1_v3 = liftf(add)(1);
//log(plus1_v3(17))



//function twice takes a binary and returns a unary that passes its argument
//to the binary twice
//var doubl = twice(add);
//double(11) //22

function twice(bfunc) {
  return function (a) {
    return bfunc(a, a)
  }
}

var doubl = twice(add)
var square = twice(mul)


//Write reverse, a function that reverses the arguments of a binary function
var bus = reverse(sub);
// bus(3, 2) = -1

function reverse(bfunc) {
  return function(a, b) {
    return bfunc(b, a)
  }
}

//Write a function composeu that takes two unary functions and returns a unary function that calls them both.
//composeu(doubl,square)(5) = 100

function composeu(u1, u2) {
  return function(a) {
    return u2(u1(a)) ;
  }
}


//take two binary functions and returns a function that calls them both.
//function composeb(add, mul)(2, 3, 7) returns 35

function composeb(b1, b2) {
  return function(a, b, c) {
    return b2(b1(a,b),c);
  }
}



// limit function that allows a binary function to be called a limited number of times


var add_ltd = limit2(add, 3)
// add_ltd(3,4) = 7
// add_ltd(3,5) = undefined

//My logic (refined after seeing solution)
function limit2(bfunc, a) {
  var numberoftimesrun = 0
  return function(x, y) {
    if (numberoftimesrun < a) {
      numberoftimesrun += 1
    return bfunc(x, y) ;
  }
    else {return undefined}
  }
}


//Caroline's Solution
function limit(fn, limit) {
  var called = 0
  return function(a, b) {
    if (called == limit) return undefined;
    called += 1
    return fn(a, b)
  }
}


//Tom's Solution
function limit(func, limit) {
  return function(x,y) {
    if(limit > 0) {
      limit -= 1;
      return func(x,y);
    } else {
      return undefined;
    }
  }
}


// write a from function that produces a generator that will produce a series of values
var index = from2(11);
// index() = 0
// index() = 1
// index() = 2

//My thinking
function from(a) {
  var current = a
  return function() {
      current += 1
    return current;

  }
}

//JSG Solution
function from2(a) {
  return function() {
      current = a
      a += 1
    return current;
  }
}


//Tom's solution
function form(x) {
  var call = -1;
  return function() {
    return add(x,call += 1);
  }
}




//Questions:
// Why doesn't index() continue starting at from(0)??
// When does the count (i.e. "next" or "current" variable) start over? each session?



log(add_ltd(3,4))
log(add_ltd(3,5))
log(add_ltd(3,4))
log(add_ltd(3,5))
log(index())
