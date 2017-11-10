// onclick事件
function search() {
    var inputText = document.getElementById("keyword");
    var value = inputText.value;
    console.log('search:' + value);
    // inputText.value='';
    $.post('/album', {name: value}, function (data, status) {
        onSearchResult(data)
    });
}

// 按Enter键,执行事件
function entersearch(elem) {
    var event = window.event || arguments.callee.caller.arguments[0];
    if (event.keyCode == 13) {
        search();
    }
}

// 请求数据返回
function onSearchResult(data) {
    $("ul#result_list").empty();
    let size = data.length;
    if (size > 0) {
        for (let i = 0; i < size; i++) {
            let content = '<li class="item"><a href="javascript:void(0)"><img onerror="this.src=\'/covers/error.jpg\'" src="/covers/' + data[i].cover + '"><div><h2>' + data[i].title + '</h2><p>' + data[i].path + '</p></div><h3>' + data[i].cd_list[0].lossless_type + '</h3></a></li>';
            console.log(content);
            $("ul#result_list").append(content);
        }
    }
}
