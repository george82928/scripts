var async = require('async');
var fs = require('fs');
var dirname = process.argv[2];
if (!dirname) {
    console.log('no directory path!');
    process.exit(-1);
}

fs.readdir(dirname, function(err, files) {
    var countSuccess = 0;
    var countFailure = 0;
    var failureFiles = [];
    var succeededFiles = [];
    var searchedText = 'org.netbeans.jemmy.TestCompletedException: Test passed';
    if (err) {
        console.log(err);
    } else {

        async.eachSeries(files, function(file, callback) {
            var filefulldir = dirname + '/' + file;
            var result = null;
            fs.readFile(filefulldir, (err, data) => {
                if (data.indexOf(searchedText) > -1) {
                    succeededFiles.push(file);
                    result = {
                        fileName: file,
                        succeeded: true
                    };
                    console.log(result);
                    callback(result);
                } else {
                    result = {
                        fileName: file,
                        succeeded: false
                    };
                    console.log(result);
                    callback(result);
                }
            });


        }, function(err, result) {

            if (!err) {
                if (result.succeeded) {
                    countSuccess++;
                    succeededFiles.push(result.fileName);
                } else {
                    countFailure++;
                    failureFiles.push(result.fileName);
                }

                failureFiles.forEach(function(item, index) {
                    console.log('Failure tests:' + item);
                });
                succeededFiles.forEach(function(item, index) {
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