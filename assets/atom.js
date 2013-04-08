$.ajax('http://nuyproxy.appspot.com/proxy?url=http://nuysoft.com/atom.xml', {
	dataType: 'text xml'
})
.done(function(data) {
	$('feed > entry', data).each(function(index, entry) {
        console.log(entry)
		console.log($(entry).find('title').text());
	});
})

$.ajax('http://localhost:8888/proxy?url=http://nuysoft.com/atom.xml', {
	dataType: 'text xml'
})
.done(function(data) {
	$('feed > entry', data).each(function(index, entry) {
		console.log($(entry).find('title').text());
	});
})