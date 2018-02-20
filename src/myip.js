(function() {

    var performRequest = function(url, callback) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                   callback(200, xmlhttp.responseText);
                } else {
                    callback(xmlhttp.status);
                }
            }
        };

        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }
    
    myIP = window['myIP'] || {};
    
    myIP.lookup = function(callback) {
        var response = { 
            ipv4: null,
            ipv6: null
        };
        
        var lookup4 = function(callback) {
            performRequest('https://api4.my-ip.io/ip', function(statusCode, ip) {
                if (statusCode == 200) {
                    response.ipv4 = ip;
                }
                
                callback();
            });
        };
        
        var lookup6 = function(callback) {
            performRequest('https://api6.my-ip.io/ip', function(statusCode, ip) {
                if (statusCode == 200) {
                    response.ipv6 = ip;
                }
                
                callback();
            });
        };
        
        lookup4(function() {
            lookup6(function() {
               callback(response); 
            });
        });
    };
    
})();