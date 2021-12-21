<?php
/**
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
 *  origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you
 *  the general idea of what is involved.  For the nitty-gritty low-down, read:
 *  @from https://stackoverflow.com/questions/8719276/cross-origin-request-headerscors-with-php-headers
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - https://fetch.spec.whatwg.org/#http-cors-protocol
 *
 */
function cors() {
    $devMode = false; // Set to true to skip domain checking
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        $origin = $_SERVER['HTTP_ORIGIN'];
        // Allow from AMVARA domains
        $amvaraDomains = ['.amvara.de', '.amvara.consulting', '.amvara.rocks'];
        $allowed = false;
        foreach ($amvaraDomains as $domain) {
            if (strpos($origin, $domain) !== FALSE) $allowed = true;
        }
        if ($allowed OR $devMode) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}"); // Allow requesting origin
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
    
            // Access-Control headers are received during OPTIONS requests
            if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
                
                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                    // may also be using PUT, PATCH, HEAD etc
                    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
                
                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            
                exit(0);
            }
        }
    }
}
?>