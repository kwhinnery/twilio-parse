// Initialize Parse so we can hit cloud code functions
Parse.initialize(
    'TJN3F1R7mIQ9BPVrOCnILTh8PHlbcK1Sw58MCHoZ', 
    '0cnvw7KQWLAP9GMbXzaeXbiiax5kqEBlNr6pykV0'
);

// Kick off tests - requires authentication
(function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function() {
        // Check authentication state
        var current = Parse.User.current();
        if (current) {
            execJasmine();
        } else {
            // prompt for admin login
            var username = prompt('admin user name:');
            var password = prompt('admin password:');
            Parse.User.logIn(username, password, {
                success:execJasmine,
                error:function(user, error) {
                    alert('there was an error logging you in - please retry.');
                }
            });
        }

        // execute any existing onload logic
        if (currentWindowOnload) {
            currentWindowOnload();
        }
    };

    function execJasmine() {
        jasmineEnv.execute();
    }
})();