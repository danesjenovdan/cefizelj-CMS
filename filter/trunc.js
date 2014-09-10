function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

angular.module('bunkerCms').filter('trunc', function() {
    return function(value, wordwise, max, tail) {
        if (!value){ return '';}

        max = parseInt(max, 10);
        if (!max) {return value;}
        if (value.length <= max){ return value;}

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

angular.module('bunkerCms').filter('truncExt', function() {
    return function(value, wordwise, max, tail) {
        if (!value){ return '';}

        max = parseInt(max, 10);
        if (!max) {return value;}
        if (value.length <= max){ return value;}
        var ext = getExtension(value);
        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' … '+ext);
    };
});

