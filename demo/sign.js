/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.4.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

				// Support: IE 8 only
				// Exclude object elements
				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 && rdescend.test( selector ) ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								} );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	// Support: IE 9-11 only
	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
	// We use getClientRects() to check for hidden/disconnected.
	// In those cases, the computed value can be trusted to be border-box
	if ( ( !support.boxSizingReliable() && isBorderBox ||
		val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );




// ================================================================================================================================================
// Sign App JS, base on jquery
// ================================================================================================================================================
/**
 * Digital sign service client
 * 1. Request get cert list:  localhost/cert --- GET
 * response model: 
 * 		
 * 	[
     	{
	        "id": 0,
	        "valid": true,
	        "alias": "CÔNG TY TNHH GI?I PHÁP CÔNG NGH? B&T VI?T NAM",
	        "issuer": {
	            "name": "CN=SmartSign,O=Cong ty co phan chu ky so VI NA,C=VN",
	            "encoded": "MEsxCzAJBgNVBAYTAlZOMSgwJgYDVQQKEx9Db25nIHR5IGNvIHBoYW4gY2h1IGt5IHNvIFZJIE5BMRIwEAYDVQQDEwlTbWFydFNpZ24="
	        },
	        "subject": {
	            "name": "C=VN,ST=HÀ NỘI,L=Ba Đình,CN=CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ B&T VIỆT NAM,UID=MST:0106438347",
	            "encoded": "MIGWMR4wHAYKCZImiZPyLGQBAQwOTVNUOjAxMDY0MzgzNDcxPzA9BgNVBAMMNkPDlE5HIFRZIFROSEggR0nhuqJJIFBIw4FQIEPDlE5HIE5HSOG7hiBCJlQgVknhu4ZUIE5BTTESMBAGA1UEBwwJQmEgxJDDrG5oMRIwEAYDVQQIDAlIw4AgTuG7mEkxCzAJBgNVBAYTAlZO"
	        },
	        "algName": "SHA1withRSA",
	        "algOID": "1.2.840.113549.1.1.5",
	        "version": 3,
	        "notAfter": "2021-07-17T04:01:28.000+0000"
     	}
	]
 *	
 */

var G_CHOOSED_CERT_ALIAS;
var G_CERT_MODEL;
var G_LIST_UPLOAD_CONTROL_ID =
	[
		"ds-file-control-1",
		// "ds-file-control-2"
	];
var G_NUMBER_OF_UPLOAD_CONTROL = 2;
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

$(document).ready(function() {
    let controlHtml = `
			<div id="ds-animation"></div>
			<div id="ds-list-cert"></div>
			<div id="ds-relsult"></div>
			<div id="ds-info-control">
				<div class="ds-input-box">
					<div class="ds-input-label">Tên: </div> 
					<input type="text" id="ds-input-name">
				</div>
				<div class="ds-input-box">
					<div class="ds-input-label">Địa điểm: </div>
					<input type="text" id="ds-input-location">	
				</div>
				<div class="ds-input-box">
					<div class="ds-input-label">Lý do: </div>
					<input type="text" id="ds-input-reason">	
				</div>
			</div>
			<div id="ds-cmd-control">
				<button class="ds-btn" id="ds-btn-loadCert" class="btn btn-primary">Load Cert</button>
				<button class="ds-btn" id="ds-btn-sign" class="btn btn-primary">Sign</button>
			</div>
    `;
    $('#ds-wrap').html(controlHtml);
    $('#ds-btn-sign').prop('disabled', false);

    $("#ds-btn-loadCert").click(function(event){
		$("#ds-relsult").text('');
		$('#ds-animation').css('background-image', 'url(load.gif)');
		$(event.target).prop('disabled', true);

	    jQuery.ajax({
		    url: 'http://localhost:58456/cert',
		    method: 'GET',
		    type: 'GET',
		    success: function(data){
		        // console.log(data);

		        for (let i=0;i<data.length;i++) {
		        	$("#ds-list-cert").html('<div class="ds-cert-item" value="' + data[i].alias + '"">' + data[i].subject.name + '</div>');
		        }
		        G_CERT_MODEL = data;
		        $('#ds-animation').css('background-image', 'none');
		        $(event.target).prop('disabled', false);
		    }
		});

	});

	$('body').on('click', '.ds-cert-item', function(event) {
	    $(event.target).css('background-color', '#428bca');
	    G_CHOOSED_CERT_ALIAS = $(event.target).attr('value');
	});

	// $('#ds-file-control').on('change', function(){ 
	// 	console.log(G_CHOOSED_CERT_ALIAS);
	// 	if(G_CHOOSED_CERT_ALIAS) {
	// 		$('#ds-btn-sign').prop('disabled', false);
	// 	}
	// });

	/*
    {    
    	CertModel selectedCert: select cert of user
        String selectedCertAlias: alias of that cert
        MultipartFile inputFile: input file to sign send by client
        String ext: extension of file (must be pdf at this time)
        boolean isUpload: flag is file gonna push to remote server
        String serverUploadEndpoint: endpoint of server file will be uploaded, care when isUpload = true
        String cookieStr: (optional) cookie string of request send file to server
        Map<String, String> token: (optional) token of request send file to server
        String name: info will be sign to document
        String location: info will be sign to document
        String reason: info will be sign to document
	}
	*/
	$("#ds-btn-sign").click(function(){
		$('#ds-animation').css('background-image', 'url(load.gif)');
		let choosedCertModel = G_CERT_MODEL.find((element) => {
		  return element.alias === G_CHOOSED_CERT_ALIAS;
		});

		// let dataJsonArr = [];
		// for (let i = 0; i < G_NUMBER_OF_UPLOAD_CONTROL; i++) {
		let fileWillSign = $('#' + G_LIST_UPLOAD_CONTROL_ID[0])[0].files[0];
		
		toBase64(fileWillSign).then(rel => {
			let fileName = fileWillSign.name;
			let ext = fileWillSign.name.split('.').pop();

			let dataJson = 
			{
				// "selectedCert": choosedCertModel,
				"selectedCertAlias": G_CHOOSED_CERT_ALIAS,
				"inputFile": rel.substring(rel.indexOf(',') + 1),
				"fileName": fileName,
				"ext": ext,
				"isUpload": "true",
				"serverUploadEndpoint": "http://localhost:8896/upload",
				"name": $('#ds-input-name').text(),
				"location": $('#ds-input-location').text(),
				"reason": $('#ds-input-reason').text()
			}
			// dataJsonArr.push(dataJson);
			console.log(JSON.stringify(dataJson));
			// if (i===0) {
				jQuery.ajax({
				    url: 'http://localhost:58456/sign',
				    method: 'POST',
				    contentType: "application/json;charset=utf-8",
				    data: JSON.stringify(dataJson),
				    processData: false,	   
				    success: function(data){
				        alert(data);
				        $('#ds-animation').css('background-image', 'none');
				    }
				});
			// }
		});			
		// }
		
		// console.log(dataJsonArr[0]);
		// let rel = `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MDAwMDQ0NSAwMDAwMCBuDQowMDAwMDAxMTAxIDAwMDAwIG4NCjAwMDAwMDEyNjkgMDAwMDAgbg0KMDAwMDAwMTUwOCAwMDAwMCBuDQowMDAwMDAxNTYxIDAwMDAwIG4NCjAwMDAwMDE2MTQgMDAwMDAgbg0KMDAwMDAwMDAxMSA2NTUzNSBmDQowMDAwMDAwMDEyIDY1NTM1IGYNCjAwMDAwMDAwMTMgNjU1MzUgZg0KMDAwMDAwMDAxNCA2NTUzNSBmDQowMDAwMDAwMDE1IDY1NTM1IGYNCjAwMDAwMDAwMTYgNjU1MzUgZg0KMDAwMDAwMDAxNyA2NTUzNSBmDQowMDAwMDAwMDE4IDY1NTM1IGYNCjAwMDAwMDAwMTkgNjU1MzUgZg0KMDAwMDAwMDAyMCA2NTUzNSBmDQowMDAwMDAwMDIxIDY1NTM1IGYNCjAwMDAwMDAwMjIgNjU1MzUgZg0KMDAwMDAwMDAyMyA2NTUzNSBmDQowMDAwMDAwMDI0IDY1NTM1IGYNCjAwMDAwMDAwMjUgNjU1MzUgZg0KMDAwMDAwMDAyNiA2NTUzNSBmDQowMDAwMDAwMDI3IDY1NTM1IGYNCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAwMjM0MCAwMDAwMCBuDQowMDAwMDAyNjUxIDAwMDAwIG4NCjAwMDAxMTM5MDEgMDAwMDAgbg0KdHJhaWxlcg0KPDwvU2l6ZSAzMS9Sb290IDEgMCBSL0luZm8gOSAwIFIvSURbPDUyQzUwNzAyRkZGMTc5NDk4ODAwOUUzMzUxQjczMEYwPjw1MkM1MDcwMkZGRjE3OTQ5ODgwMDlFMzM1MUI3MzBGMD5dID4+DQpzdGFydHhyZWYNCjExNDIwNQ0KJSVFT0YNCnhyZWYNCjAgMA0KdHJhaWxlcg0KPDwvU2l6ZSAzMS9Sb290IDEgMCBSL0luZm8gOSAwIFIvSURbPDUyQzUwNzAyRkZGMTc5NDk4ODAwOUUzMzUxQjczMEYwPjw1MkM1MDcwMkZGRjE3OTQ5ODgwMDlFMzM1MUI3MzBGMD5dIC9QcmV2IDExNDIwNS9YUmVmU3RtIDExMzkwMT4+DQpzdGFydHhyZWYNCjExNDk4Mg0KJSVFT0Y=`;
		// let dataJson = 
		// {
		// 	// "selectedCert": choosedCertModel,
		// 	"selectedCertAlias": G_CHOOSED_CERT_ALIAS,
		// 	"inputFile": rel,
		// 	"fileName": "dump.pdf",
		// 	"ext": "pdf",
		// 	"isUpload": true,
		// 	"serverUploadEndpoint": "http://localhost:8896/upload",
		// 	"name": $('#ds-input-name').text(),
		// 	"location": $('#ds-input-location').text(),
		// 	"reason": $('#ds-input-reason').text()
		// }
		
		// // console.log(dataJson);
		// jQuery.ajax({
		//     url: 'http://localhost:58456/sign',
		//     method: 'POST',
		//     contentType: "application/json;charset=utf-8",
		//     data: JSON.stringify(dataJson),
		//     processData: false,	   
		//     success: function(data){
		//         alert(data);
		//     }
		// });

		// let fileWillSign = $('#ds-file-control')[0].files[0];
	 //    let ext = fileWillSign.name.split('.').pop();

	 //    let data = new FormData();
		// data.append('selectedCert', choosedCertModel);
		// data.append('selectedCertAlias', G_CHOOSED_CERT_ALIAS);
		// data.append('inputFile', fileWillSign);
		// data.append('ext', ext);
		// data.append('isUpload', true);
		// data.append('serverUploadEndpoint', "http://localhost:8896/upload");
		// // data.append('name', $('#ds-input-name').text());
		// // data.append('location', $('#ds-input-location').text());
		// // data.append('reason', $('#ds-input-reason').text());
		// data.append('name', "wlminus");
		// data.append('location', "B&T HN");
		// data.append('reason', "Testing");

		// console.log(JSON.stringify(data));

		// let dataJson = 
		// {
		// 	"selectedCert": choosedCertModel,
		// 	"selectedCertAlias": G_CHOOSED_CERT_ALIAS,
		// 	"inputFile": fileWillSign,
		// 	"ext": ext,
		// 	"isUpload": "true",
		// 	"serverUploadEndpoint": "http://localhost:8896/upload",
		// 	"name": $('#ds-input-name').text(),
		// 	"location": $('#ds-input-location').text(),
		// 	"reason": $('#ds-input-reason').text()
		// }
		
		// console.log(dataJson);

	 //    jQuery.ajax({
		//     url: 'http://localhost:58456/sign',
		//     method: 'POST',
		//     contentType: "application/json;charset=utf-8",
		//     data: JSON.stringify(dataJson),
		//     processData: false,	   
		//     success: function(data){
		//         alert(data);
		//     }
		// });
	});
});



// $("#btnLoadCert").click(function(event){
// 	$("#rel").text('');
// 	$('#animation').css('background-image', 'url(load.gif)');
// 	$(event.target).prop('disabled', true);

	


//     jQuery.ajax({
// 	    url: 'http://localhost:58456/cert',
// 	    method: 'GET',
// 	    type: 'GET',	   
// 	    success: function(data){
// 	        // console.log(data);
// 	        // console.log(data.length);
// 	        // console.log(typeof(data));
// 	        // console.log(data[0].subject);

// 	        for (let i=0;i<data.length;i++) {
// 	        	$("#list").html('<div class="cert-item" value="' + data[i].alias + '"">' + data[i].subject.name + '</div>');
// 	        }

// 	        $('#animation').css('background-image', 'none');
// 	        $(event.target).prop('disabled', false);      
// 	    }
// 	});

// });		

// $(document).ready(function() {
//     $('body').on('click', '.cert-item', function(event) {
// 	    $(event.target).css('background-color', '#428bca');
// 	    CHOOSED_CERT_ALIAS = $(event.target).attr('value');
// 	    console.log(CHOOSED_CERT);
// 	});
// });

// $("#btnSign").click(function(event){
// 	$("#rel").text('');
	
// 	// if (CHOOSED_CERT === '') {
// 	// 	$("#rel").text('Không có Cert');
// 	// }

// 	// var myFile = $('#fileControl').files;
	

// 	var myFile = $('#fileControl')[0].files[0];
// 	console.log(myFile);
//  //    var data = new FormData();
// 	// data.append('uploadFile', myFile);
// 	// .change(function () {
// 	//     console.log(this.files[0].mozFullPath);
// 	// });
//     if(!myFile) {
//         $("#rel").text('Không có file');
//     } else {
//     	alert($('input[type=file]#fileControl').val())
//     }
// });

// $('input[type=file]#fileControl').change( function(event) {
// 	var tmppath = URL.createObjectURL(event.target.files[0]);
//     alert(tmppath);      
// });

// // $.ajax({url: "https://localhost:44357/api/values", cache: false, success: function(html){
// // 	$("#results").append(html);
// // 	}
// // });
// console.log("hello");
// $.ajax({
//     url: 'https://localhost:44357/api/values',
//     type: "GET",
//     dataType: "jsonp",
//     success: function (data) {
//     	console.log("hello 2");
//         console.log(data);
//     }
// });
// console.log("hello 3");

// $("button").click(function(){
//   $.getJSON("https://localhost:44357/api/values", function(result){
//   	console.log(result);
//     // $.each(result, function(i, field){
//     //   $("div").append(field + " ");
//     // });
//   });
// });

// $("#btnSend").click(function(){
// 	$('#animation').css('background-image', 'url(load.gif)');

// 	var myFile = $('#fileControl')[0].files[0];
//     var data = new FormData();
// 	data.append('uploadFile', myFile);


//     jQuery.ajax({
// 	    url: 'http://localhost:8896/upload',
// 	    method: 'POST',
// 	    type: 'POST',
// 	    data: data,
//         enctype: 'multipart/form-data',
// 	    processData: false,	   
// 	    success: function(data){
// 	        alert(data);
// 	    }
// 	});

// });		

// upload = (inputFile) => {
//     // Form data
//     data: new FormData();
//     var data = new FormData();
// 	data.append('file', inputFile);


//     jQuery.ajax({
// 	    url: 'php/upload.php',
// 	    data: data,
// 	    cache: false,
// 	    contentType: false,
// 	    processData: false,
// 	    method: 'POST',
// 	    type: 'POST', // For jQuery < 1.9
// 	    success: function(data){
// 	        alert(data);
// 	    }
// 	});
// }
