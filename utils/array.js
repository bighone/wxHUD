
module.exports.init = function() {
    Array.prototype.last = function() {
        return this[this.length - 1];
    }

    Array.prototype.contains = function(obj) {
        return this.indexOf(obj) !== -1;
    }

    // 去重复
    Array.prototype.unique = function() {
        this.sort();
        var re=[this[0]];
        for(var i=1; i<this.length; i++) {
            if( this[i] !== re[re.length-1]) {
                re.push(this[i]);
            }
        }
        return re;
    }

    // 并集
    Array.prototype.union = function(array) {
        return this.concat(array).unique(); 
    }
    //差集
    Array.prototype.minus = function(array) { 
        var result = [];
        var clone = this;
        for(var i=0; i < clone.length; i++) {
            var flag = true; 
            for(var j=0; j < array.length; j++) {   
                if(clone[i] == array[j])   
                flag = false;   
            }   
            if(flag)   
            result.push(clone[i]); 
        }
        return result.unique(); 
    }
    // 交集
    Array.prototype.intersect = function(array) { 
        var result = [];
        var a = this;
        for(var i = 0; i < array.length; i ++) {
            var temp = array[i];
            for(var j = 0; j < a.length; j ++) {
                if(temp === a[j]) {
                    result.push(temp);
                    break;
                }
            }
        }
        return result.unique();
    }
}