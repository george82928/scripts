(function() {
    "use strict";
    var async = require('async');
    var fs = require('fs');
    var dirname = process.argv[2];
    const searchedText = 'org.netbeans.jemmy.TestCompletedException: Test passed';
    var countSuccess = 0;
    var countFailure = 0;
    var filesWithFullPath = [];
    var failureFiles = [];
    var succeededFiles = [];
    if (!dirname) {
        console.log('no directory path!');
        process.exit(-1);
    }
    fs.readdir(dirname, (err, files) => {
        if (err) {
            console.log(err);
            process.exit(-1);
        } else {
            files.forEach((file, index) => {
                filesWithFullPath.push(dirname + '/' + file);
            });

            async.each(filesWithFullPath, (file, callback) => {
                fs.readFile(file, (err, data) => {
                    if (data.indexOf(searchedText) > -1) {
                        countSuccess++;
                        succeededFiles.push(file);
                        callback(err);
                    } else {
                        countFailure++;
                        failureFiles.push(file);
                        callback(err);
                    }
                });
            }, function(err) {
                if (!err) {
                    failureFiles.forEach((item, index) => {
                        console.log('Failure tests:' + item);
                    });
                    succeededFiles.forEach((item, index) => {
                        console.log('Successful tests:' + item);
                    });
                    console.log('count success: ' + countSuccess);
                    console.log('count failure: ' + countFailure);
                } else {
                    console.log(err);
                }
            });
        }
    });
})();