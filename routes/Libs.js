
let Console = new (function Console() {
    var me = this;
    this.isTrack = true;
    this.isLog = true;
    var style = function (icon) {
        return 'background: url(' + window.location.origin + icon + ') no-repeat top left; background-size: 14px 14px';
    };
    var getExeLine = function (err) {
        var err = new Error('');
        var re = /\r\n/;
        var lines = err.stack.split('\n');
        var count = 1;
        for (var i = lines.length - 2; i > 3; i--) {
            console.log(lines[i].replace('at', '[' + count + ']'));
            count++;
        }
    };
    var log = function (message, icon) {
        if (me.isLog) {
            if (me.isTrack) {
                console.groupCollapsed('%c   ' + message, style(icon));
                console.log(message);
                getExeLine();
                console.groupEnd();
            } else {
                console.log('%   ' + message, style(icon));
            }
        }
    };
    this.Bug = function (message) {
        log(message, '/img/bug.jpg');
    };
    this.Info = function (message) {
        log(message, '/img/info.png');
    };
    this.Warn = function (message) {
        log(message, '/img/warn.png');
    };
    this.Log = function (message) {
        log(message, '/img/log.png');
    };
    this.StartTest = function (_name) {
        console.group('%cTest', 'text-transform:uppercase; font-weight: bold; color: green ', _name);
    }
    this.Assert = function (_con, _data = '', _true = '', _false = '') {
        if (_con) {
            console.log('%c[Pass]', 'color: green', _data, _true);
        } else {
            console.log('%c[Fail]', 'color: red', _data, _false);
        }
    }
    this.EndTest = function () {
        console.groupEnd();
    }

})();

class Cookie{
    constructor() {
        this.encodeMap = "012345wertyuio67m~!@#$%WERTYDFGHlzxc^&JKLZXCasdfghjUIOPASk*_89Qvbn=+?VBNMqp<>-(";
        this.speraMap = "|{}/'[]";
    }

    random(max){
        return Math.floor((Math.random() * max) + 1);
    }

    encode_cookie(cookie_value){
        // This variable holds the encoded cookie characters
        var coded_string = '';
        var codeArr = [];
        // Run through each character in the cookie value
        for (var counter = 0; counter < cookie_value.length; counter++) {
            codeArr.push(cookie_value.charCodeAt(counter));
        }
        var encrytStr = '';
        for (var i = 0; i < codeArr.length; i++) {
            var item = codeArr[i] + "";
            var code;

            var codeLength = item.length / 2;
            for (var j = 0; j < codeLength; j++) {
                code = item.substr(j * 2, 2);
                if (parseInt(code) > this.encodeMap.length) {
                    encrytStr += code;
                } else {
                    encrytStr += this.encodeMap[parseInt(code)];
                }
            }
            if (i < codeArr.length - 1) {
                encrytStr += this.speraMap[this.random(4) - 1];
            }
        }
        return encrytStr;
    }

    decode_cookie(coded_string) {
        coded_string = unescape(coded_string);
        var decrytStr = "";
        var codeStr = "";
        var enCodeArr = coded_string.replace(/[\|\{\}\/\'\[\]]/g, '*SEPARATION*').split('*SEPARATION*');
        var deCodeArr = [];
        for (var i = 0; i < enCodeArr.length; i++) {
            var item = enCodeArr[i];
            var code = "";
            for (var j = 0; j < item.length; j++) {
                var charItem = item[j];
                if (j < (item.length - 1) && parseInt(charItem) > 7) {
                    code += item[j] + item[j + 1];
                    j++;
                } else {
                    code += this.encodeMap.indexOf(charItem);
                }
            }
            var intCode = parseInt(code);
            decrytStr += String.fromCharCode(intCode);
        }
        return decrytStr
    };

    read(name){
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return unescape(this.decode_cookie(c.substring(nameEQ.length, c.length)));
        }
        return null;
    }

    create(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = escape(name) + "=" + escape(this.encode_cookie(value)) + expires + "; path=/";
        return 1;
    };

    remove(name){
        return this.create(name, "", -1);
    };

    getsetKey(key, value) {
        if (value === undefined) {
            return this.read(key);
        } else if (value === null) {
            this.remove(key);
        } else {
            this.create(key, value);
        }
    };

    Key(key,value){
        return this.getsetKey(key,value);
    }
}

class JS {
    static isNull(obj){
        if(obj === null || obj === undefined || obj === ""){
            return true;
        } else {
            return false;
        }
    }

    static callBack(func){
        if (func !== null && func !== undefined && func !== '' && typeof func === 'function') {
            var args = [];
            for (var i = 1; i < arguments.length; i++)
                args.push(arguments[i]);
            func.apply(this, args);
        }
        return true;
    }

    static wait(exp,callback){
        var thread = setInterval(function () {
            console.log('exp--',exp);
            if(exp){
                clearInterval(thread);
                JS.callBack(callback);
            }
        }, 100);
    }
}

class Json{
    static toJson(obj){
        return JSON.stringify(obj);
    }

    static toObject(str){
        return JSON.parse(str);
    }
}

class LocalStorage{

    constructor() {
        this.encodeMap = "012345wertyuio67m~!@#$%WERTYDFGHlzxc^&JKLZXCasdfghjUIOPASk*_89Qvbn=+?VBNMqp<>-(";
        this.speraMap = "|{}/'[]";
    }

    random(max) {
        return Math.floor((Math.random() * max) + 1);
    };

    encode(cookie_value) {
        // This variable holds the encoded cookie characters
        var coded_string = "";
        var codeArr = [];
        // Run through each character in the cookie value
        for (var counter = 0; counter < cookie_value.length; counter++) {
            codeArr.push(cookie_value.charCodeAt(counter));
        }
        var encrytStr = "";
        for (var i = 0; i < codeArr.length; i++) {
            var item = codeArr[i] + "";
            var code;

            var codeLength = item.length / 2;
            for (var j = 0; j < codeLength; j++) {
                code = item.substr(j * 2, 2);
                if (parseInt(code) > this.encodeMap.length) {
                    encrytStr += code;
                } else {
                    encrytStr += this.encodeMap[parseInt(code)];
                }
            }
            if (i < codeArr.length - 1) {
                encrytStr += this.speraMap[this.random(4) - 1];
            }
        }
        return encrytStr;
    };

    decode(coded_string) {
        coded_string = unescape(coded_string);
        var decrytStr = "";
        var codeStr = "";
        var enCodeArr = coded_string.replace(/[\|\{\}\/\'\[\]]/g, '*SEPARATION*').split('*SEPARATION*');
        var deCodeArr = [];
        for (var i = 0; i < enCodeArr.length; i++) {
            var item = enCodeArr[i];
            var code = "";
            for (var j = 0; j < item.length; j++) {
                var charItem = item[j];
                if (j < (item.length - 1) && parseInt(charItem) > 7) {
                    code += item[j] + item[j + 1];
                    j++;
                } else {
                    code += this.encodeMap.indexOf(charItem);
                }
            }
            var intCode = parseInt(code);
            decrytStr += String.fromCharCode(intCode);
        }
        return decrytStr;
    };

    removeLocalStorageItem(key) {
        localStorage.removeItem(key);
    }

    val(key, val){
        if(val === undefined){
            if(localStorage.getItem(key) === null || localStorage.getItem(key) === undefined || localStorage.getItem(key) === ''){
                return null;
            } else {
                return localStorage.getItem(key);
            }
        } else {
            localStorage.setItem(key, val);
        }
    }
};

let Location = new (function () {

    this.__defineGetter__('path_param', function(){
        var pathname = location.pathname;
        var regex = /([^\/]+)/g;
        var match;
        var params = [];
        while (match === regex.exec(pathname)){
            params.push(decodeURI(match[1]));
        }

        return params;
    });

    this.__defineGetter__('query_param', function(){
        var vars = [], hash;
        var fullPath = $(location).attr('search');
        var hashes = fullPath.slice(fullPath.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            if(hash[0] === ''){
                continue;
            }
            //vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    });

})();

export{Console,Cookie,JS,Json,LocalStorage,Location}
