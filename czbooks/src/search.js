load('libs.js');

function execute(key, page) {
	var host = 'https://czbooks.net';
    var url = String.format('{0}/s/{1}/{2}', host, key, page || '1');
    var doc = Http.get(url).html();
    var data = [];

    var elems = $.QA(doc, '.container .novel-item');
    if (!elems.length) return Response.error(key);

    elems.forEach(function(e) {
        data.push({
            name: $.Q(e, '.novel-item-title').text(),
            link: $.Q(e, 'a').attr('href').mayBeFillHost(host),
            cover: $.Q(e, '.novel-item-thumbnail img').attr('src'),
            description: $.Q(e, '.novel-item-author').text(),
            host: host
        })
    })

    var next = $.Q(doc, '.nav.paginate li.active + li').text();
    if (next) {
        return Response.success(data, next);
    }

    return Response.success(data)
}