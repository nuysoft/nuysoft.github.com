$(function() {

    function iframe(full_name, callback) {
        console.log(this, full_name);
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

        $(this)
            .empty()
            .append(watch)
            .append(fork)
            .show();
    }

    $('span.ghbtns').each(function(index, span) {
        iframe.call(span, $(span).data('fullname'));
    })

});