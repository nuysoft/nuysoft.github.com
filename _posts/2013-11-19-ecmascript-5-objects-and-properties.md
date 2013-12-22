---
layout: post
title: "ECMAScript 5 中的对象和属性"
tagline: "ecmascript 5 objects and properties"
description: ""
category: 
tags: [ecmascript 5]
published: false
---
{% include JB/setup %}

> 原文：[2009.5.21 ECMAScript 5 Objects and Properties](http://ejohn.org/blog/ecmascript-5-objects-and-properties/)

ECMAScript 5 is on its way. Rising from the ashes of ECMAScript 4, which got scaled way back and became ECMAScript 3.1, which was then re-named ECMAScript 5 ([more details](http://en.wikipedia.org/wiki/ECMAScript#ECMAScript.2C_5th_Edition))- comes a new layer of functionality built on top of our lovable ECMAScript 3.

> Update: I’ve posted more details on [ECMAScript 5 Strict Mode, JSON, and More](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/).

There are a few new APIs included in the specification but the most interesting functionality comes into play in the Object/Property code. This new code gives you the ability to dramatically affect how users will be able to interact with your objects, allowing you to provide getters and setters, prevent enumeration, manipulation, or deletion, and even prevent the addition of new properties. In short: You will be able to replicate and expand upon the existing JavaScript-based APIs (such as the DOM) using nothing but JavaScript itself.

Perhaps best of all, though: These features are due to arrive in all major browsers. All the major browser vendors worked on this specification and have agreed to implement it in their respective engines. The exact timeframe isn’t clear yet, but it’s going to be sooner, rather than later.

There doesn’t appear to exist a full implementation of ES5 at this point, but there are a few in the works. In the meantime you can read the [ECMAScript 5 specification](http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf) (PDF – I discuss pages 107-109 in this post) or watch the [recent talk](http://google-caja.googlecode.com/svn/trunk/doc/html/es5-talk/es5-talk.html) by some of the ECMAScript guys at Google.

> Note: I’ve provided a couple simple, example, implementations for these methods to illustrate how they might operate. Almost all of them require other, new, methods to work correctly – and they are not implemented to match the specification 100% (for example there is no error checking).

## Objects
A new feature of ECMAScript 5 is that the extensibility of objects can now be toggled. Turning off extensibility can prevent new properties from getting added to an object.

ES5 provides two methods for manipulating and verifying the extensibility of objects.

    Object.preventExtensions( obj )
    Object.isExtensible( obj )

preventExtensions locks down an object and prevents and future property additions from occurring. isExtensible is a way to determine the current extensibility of an object.

### Example Usage:

    var obj = {};
     
    obj.name = "John";
    print( obj.name );
    // John
     
    print( Object.isExtensible( obj ) );
    // true
     
    Object.preventExtensions( obj );
     
    obj.url = "http://ejohn.org/"; // Exception in strict mode
     
    print( Object.isExtensible( obj ) );
    // false

### Properties and Descriptors
Properties have been completely overhauled. No longer are they the simple value associated with an object – you now have complete control over how they can behave. With this power, though, comes increased complexity.

Object properties are broken down into two portions.

For the actual “meat” of a property there are two possibilities: A Value (a “Data” property – this is the traditional value that we know and love from ECMAScript 3) or a Getter and Setter (an “Accessor” property – we know this from some modern browsers, like Gecko and WebKit).

* Value. Contains the value of the property.
* Get. The function that will be called when the value of the property is accessed.
* Set. The function that will be called when the value of the property is changed.

Additionally, properties can be…

* Writable. If false, the value of the property can not be changed.
* Configurable. If false, any attempts to delete the property or change its attributes (Writable, Configurable, or Enumerable) will fail.
* Enumerable. If true, the property will be iterated over when a user does for (var prop in obj){} (or similar).
Altogether these various attributes make up a property descriptor. For example, a simple descriptor might look something like the following:

    {
      value: "test",
      writable: true,
      enumerable: true,
      configurable: true
    }

The three attributes (writable, enumerable, and configurable) are all optional and all default to true. Thus, the only property that you’ll need to provide will be, either, value or get and set.

You can use the new `Object.getOwnPropertyDescriptor` method to get at this information for an existing property on an object.

    Object.getOwnPropertyDescriptor( obj, prop )

This method allows you to access the descriptor of a property. This method is the only way to get at this information (it is, otherwise, not available to the user – these don’t exist as visible properties on the property, they’re stored internally in the ECMAScript engine).

## Example Usage:

    var obj = { foo: "test" };
     
    print(JSON.stringify(
      Object.getOwnPropertyDescriptor( obj, "foo" )
    ));
    // {"value": "test", "writable": true,
    //  "enumerable": true, "configurable": true}
    Object.defineProperty( obj, prop, desc )

This method allows you to define a new property on an object (or change the descriptor of an existing property). This method accepts a property descriptor and uses it to initialize (or update) a property.

## Example Usage:

    var obj = {};
     
    Object.defineProperty( obj, "value", {
      value: true,
      writable: false,
      enumerable: true,
      configurable: true
    });
     
    (function(){
      var name = "John";
     
      Object.defineProperty( obj, "name", {
        get: function(){ return name; },
        set: function(value){ name = value; }
      });
    })();
     
    print( obj.value )
    // true
     
    print( obj.name );
    // John
     
    obj.name = "Ted";
    print( obj.name );
    // Ted
     
    for ( var prop in obj ) {
      print( prop );
    }
    // value
    // name
     
    obj.value = false; // Exception if in strict mode
     
    Object.defineProperty( obj, "value", {
      writable: true,
      configurable: false
    });
     
    obj.value = false;
    print( obj.value );
    // false
     
    delete obj.value; // Exception

Object.defineProperty is a core method of the new version of ECMAScript. Virtually all the other major features rely upon this method existing.

    Object.defineProperties( obj, props )

A means of defining a number of properties simultaneously (instead of individually).

### Example Implementation:

    Object.defineProperties = function( obj, props ) {
      for ( var prop in props ) {
        Object.defineProperty( obj, prop, props[prop] );
      }
    };

### Example Usage:

    var obj = {};
     
    Object.defineProperties(obj, {
      "value": {
        value: true,
        writable: false
      },
      "name": {
        value: "John",
        writable: false
      }
    });

Property descriptors (and their associated methods) is probably the most important new feature of ECMAScript 5. It gives developers the ability to have fine-grained control of their objects, prevent undesired tinkering, and maintaining a unified web-compatible API.

## New Features
Building on top of these new additions some interesting new features have been introduced into the language.

The following two methods are very useful for collecting arrays of all the properties on an object.

    Object.keys( obj )

Returns an array of strings representing all the enumerable property names of the object. This is identical to the method included in Prototype.js.

### Example Implementation:

    Object.keys = function( obj ) {
      var array = new Array();
      for ( var prop in obj ) {
        if ( obj.hasOwnProperty( prop ) ) {
          array.push( prop );
        }
      }
      return array;
    };

### Example Usage:

    var obj = { name: "John", url: "http://ejohn.org/" };
     
    print( Object.keys(obj).join(", ") );
    // name, url

**Object.getOwnPropertyNames( obj )**

Nearly identical to Object.keys but returns all property names of the object (not just the enumerable ones).

An implementation isn’t possible with regular ECMAScript since non-enumerable properties can’t be enumerated. The output and usage is otherwise identical to Object.keys.

**Object.create( proto, props )**

Creates a new object whose prototype is equal to the value of proto and whose properties are set via Object.defineProperties( props ).

A simple implementation would look like this (requires the new Object.defineProperties method).

### Example Implementation: (by Ben Newman)

    Object.create = function( proto, props ) {
      var ctor = function( ps ) {
        if ( ps )
          Object.defineProperties( this, ps );
      };
      ctor.prototype = proto;
      return new ctor( props );
    };

### Other implementation:

    Object.create = function( proto, props ) {
      var obj = new Object();
      obj.__proto__ = proto;
     
      if ( typeof props !== "undefined" ) {
        Object.defineProperties( obj, props );
      }
     
      return obj;
    };

> Note: The above code makes use of the Mozilla-specific __proto__ property. This property gives you access to the internal prototype of an object – and allows you to set its value, as well. The ES5 method [Object.getPrototypeOf](http://ejohn.org/blog/objectgetprototypeof/) allows you to access this value but not set its value – thus the above method cannot be implement in a generic, spec-compatible, manner.

I discussed [Object.getPrototypeOf](http://ejohn.org/blog/objectgetprototypeof/) previously so I won’t bother discussing it again here.

### Example Usage:

    function User(){}
    User.prototype.name = "Anonymous";
    User.prototype.url = "http://google.com/";
     
    var john = Object.create(new User(), {
      name: { value: "John", writable: false },
      url: { value: "http://google.com/" }
    });
     
    print( john.name );
    // John
     
    john.name = "Ted"; // Exception if in strict mode

**Object.seal( obj )**
**Object.isSealed( obj )**

Sealing an object prevents other code from deleting, or changing the descriptors of, any of the object’s properties – and from adding new properties.

### Example Implementation:

    Object.seal = function( obj ) {
      var props = Object.getOwnPropertyNames( obj );
     
      for ( var i = 0; i < props.length; i++ ) {
        var desc = Object.getOwnPropertyDescriptor( obj, props[i] );
       
        desc.configurable = false;
        Object.defineProperty( obj, props[i], desc );
      }
     
      return Object.preventExtensions( obj );
    };

You would seal an object if you want its existing properties to stay intact, without allowing for new additions, but while still allowing the user to write to or edit the properties.

**Object.freeze( obj )**
**Object.isFrozen( obj )**

Freezing an object is nearly identical to sealing it but with the addition of making the properties un-editable.

### Example Implementation:

    Object.freeze = function( obj ) {
      var props = Object.getOwnPropertyNames( obj );
     
      for ( var i = 0; i < props.length; i++ ) {
        var desc = Object.getOwnPropertyDescriptor( obj, props[i] );
       
        if ( "value" in desc ) {
          desc.writable = false;
        }
       
        desc.configurable = false;
        Object.defineProperty( obj, props[i], desc );
      }
     
      return Object.preventExtensions( obj );
    };

Freezing an object is the ultimate form of lock-down. Once an object has been frozen it cannot be unfrozen – nor can it be tampered in any manner. This is the best way to make sure that your objects will stay exactly as you left them, indefinitely.

All together these changes are very exciting, they provide you with an unprecedented level of control over the objects that you produce. The best aspect, though, is that you will be able to use these features to build larger and more complex features in pure ECMAScript (such as building new DOM modules, or moving more browser APIs into pure-JavaScript). And since all the browsers are on board this is absolutely something that we can look forward to.

