$(function() {
    var github = new Github({
        username: 'apitestuser',
        password: '1q2w3e4r5t',
        auth: "basic"
    });

    function show(full_name, callback){
        var username = full_name.split('/')[0],
            reponame = full_name.split('/')[1];
        var repo = github.getRepo(username, reponame);
        repo.show(function(err, repo) {
            if( err ) {
                console.log( username, reponame, err );
                callback && callback(err, repo);
                return;
            }
            callback && callback(err, repo);
            return repo;
        });    
    }

    $('*>li:contains(_github)').filter(function(index){
        return !$(this).children().length;
    }).each(function(index, li){
        li = $(li);
        var name = $.trim( li.text().replace('_github', '') );
        if( !name ) {
            li.remove();
            return;
        }
        li.text('loading...');
        show(name, function(err, repo){
            if( err ) {
                // error request
                li.text( err.request ? err.request.status + ', ' + err.request.statusText : err.error );
                return;
            }
            var text = 'Create: ' + repo.created_at.split('T')[0] + ', Star: ' + repo.watchers + ', Fork: ' + repo.forks
            if( repo.description ) {
                li.text(repo.description);
                li.clone().text( text ).insertAfter(li);
            } else {
                li.text( text );
            }
        });
    })
    
    // test
    // show('janl/mustache.js');
    // show('twitter/hogan.js');
    // show('wycats/handlebars.js');
    // show('zaach/jison');
    // show('akdubya/dustjs');
    // show('dmajda/pegjs');
    // show('documentcloud/underscore');
});