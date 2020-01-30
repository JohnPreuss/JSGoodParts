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
bus(3, 2)  //-1

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



log(composeb(add,mul)(2,3,7))
