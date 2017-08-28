(function() {
    "use strict";
    var fs = require('fs');
    var dirname = process.argv[2];
    if (!dirname) {
        console.log('no directory path!');
        process.exit(-1);
    }
    var countSuccess = 0;
    var countFailure = 0;
    var failureFiles = [];
    var succeededFiles = [];
    const searchedText = 'org.netbeans.jemmy.TestCompletedException: Test passed';

    fs.readdir(dirname, function(err, files) {
        if (err) {
            console.log(err);
            process.exit(-1);
        } else {
            files.forEach(function(file, index) {
                var filefulldir = dirname + '/' + file;
                var data = fs.readFileSync(filefulldir).toString();
                if (data.indexOf(searchedText) > -1) {
                    countSuccess++;
                    succeededFiles.push(file);
                } else {
                    countFailure++;
                    failureFiles.push(file);
                }
            });

            failureFiles.forEach(function(item, index) {
                console.log('Failure tests:' + item);
            });
            succeededFiles.forEach(function(item, index) {
                console.log('Successful tests:' + item);
            });
            console.log('count success: ' + countSuccess);
            console.log('count failure: ' + countFailure);
        }
    });
})();