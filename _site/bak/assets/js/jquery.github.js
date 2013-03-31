$(function() {
    var github = new Github({
        username: 'apitestuser',
        password: '1q2w3e4r5t',
        auth: "basic"
    });

    function iframe(full_name, callback) {
        var username = full_name.split('/')[0],
            reponame = full_name.split('/')[1];

        var tmpl = '<iframe class="github-btn" ' + //
        'src="http://ghbtns.com/github-btn.html?user={{username}}&repo={{reponame}}&type={{type}}&count=true" ' + //
        'allowtransparency="true" frameborder="0" scrolling="0" width="{{width}}" height="{{height}}"></iframe>';

        tmpl = tmpl.replace('{{username}}', username).replace('{{reponame}}', reponame)
            .replace('{{width}}', '130px').replace('{{height}}', '20px');

        var watch = tmpl.replace('{{type}}', 'watch');
        var fork = tmpl.replace('{{type}}', 'fork');
        var follow = tmpl.replace('{{type}}', 'follow');

        $(this).empty()
            .append(watch)
            .append(fork)
            .show();

        // <iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=etaoux&repo=brix&type=watch&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="86px" height="20px"></iframe>
        // <iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=etaoux&repo=brix&type=fork&count=true" allowtransparency="true" frameborder="0" scrolling="0" width="98px" height="20px"></iframe>
    }

    function show(full_name, callback) {
        var username = full_name.split('/')[0],
            reponame = full_name.split('/')[1];
        var repo = github.getRepo(username, reponame);
        repo.show(function(err, repo) {
            if (err) {
                console.log(username, reponame, err);
                callback && callback(err, repo);
                return;
            }
            callback && callback(err, repo);
            return repo;
        });
    }

    $('*>li:contains(_github)').filter(function(index) {
        return !$(this).children().length;
    }).each(function(index, li) {
        li = $(li);
        var name = $.trim(li.text().replace('_github', ''));
        if (!name) {
            li.remove();
            return;
        }
        li.hide().text('loading...');
        iframe.call(li, name);

        return;
        show.call(li, name, function(err, repo) {
            if (err) {
                // error request
                li.text(err.request ? err.request.status + ', ' + err.request.statusText : err.error).hide();
                return;
            }
            var text = 'Create: ' + repo.created_at.split('T')[0] + ', Star: ' + repo.watchers + ', Fork: ' + repo.forks
            if (repo.description) {
                li.text(repo.description);
                li.clone().text(text).insertAfter(li);
            } else {
                li.text(text);
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