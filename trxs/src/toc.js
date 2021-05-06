load('libs.js');

function execute(url) {
    var host = 'http://trxs.cc';
    url = url.replace('m.trxs.cc', 'trxs.cc');
    var doc = Http.get(url).html('gb2312');
    
    var data = [];
    var elems = $.QA(doc, 'div.book_list.clearfix > ul > li');
    if (!elems.length) return Response.eror(url);
    
    elems.forEach(function(e){
        data.push({
            name: $.Q(e, 'a').text().trim(),
            url: $.Q(e, 'a').attr('href'),
            host: host
        })
    });

    return Response.success(data);
}