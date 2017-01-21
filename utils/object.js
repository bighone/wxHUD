
module.exports.init = function() {
    Object.prototype.isArray = function(value) {
        return Array.isArray(value);
    }

    Object.prototype.isFunction = function(value) {
        return typeof value === 'function';
    }

    Object.prototype.isDefined = function(value) {
        return typeof value !== 'undefined';
    }

    Object.prototype.isObject = function(value) {
        return value !== null && typeof value === 'object';
    }

    Object.prototype.clone = function(obj) {
        if (typeof obj !== 'object' || !obj) {
            return obj;
        }
        let copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    }

    Object.prototype.type = function(obj) {
        const toString = Object.prototype.toString;

        if ( obj == null ) {
            return obj + '';
        }

        return  typeof obj === 'object' || 
                typeof obj === 'function' ? toString.call(obj) || 
                'object' : typeof obj;
    }

    Object.prototype.isPlainObject = function(obj) {
        let getProto = Object.getPrototypeOf;
        let class2type = {};
        let toString = class2type.toString;
        let hasOwn = class2type.hasOwnProperty;
        let fnToString = hasOwn.toString;
        let ObjectFunctionString = fnToString.call(Object);
        let proto, ctor;
        if (!obj || type(obj) !== '[object Object]') {
            return !1;
        }
        proto = getProto( obj );
        if ( !proto ) {
            return !0;
        }
        ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
        return typeof ctor === 'function' && fnToString.call(ctor) === ObjectFunctionString;
    }

    Object.prototype.extend = function() {
        let src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = !1;

        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[ i ] || {};
            i++;
        }

        if (typeof target !== 'object' && !isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = {};
            i--;
        }

        for (; i < length; i++) {
            if ( (options = arguments[ i ]) != null ) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && (isPlainObject(copy) || 
                        (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = !1;
                            clone = src && isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
}