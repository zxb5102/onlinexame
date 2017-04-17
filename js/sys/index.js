/**
 * Created by Administrator on 2016/12/10.
 */


$(function () {
    bindEvent();
});

//这个是首页菜单的点击页面跳转的js

function bindEvent() {
    $(".btn-menu").click(function () {
        var title = $(this).text();
        var url = $(this).attr("url");
        var tab = $(".sys-tab:eq(0)");
        var isSelect = tab.tabs('exists', title);
        if (isSelect) {
            tab.tabs('select', title);
            return;
        }
        tab.tabs('add', {
            title: title,
            content: CreateContent(url),
            closable: true
        });
    });
}

function CreateContent(url) {
    /*style="height:100%;width:100%;"*/
    var strHtml = '<iframe src="' + url + '" scrolling="yes" frameborder="0" fit="false" style="width: 100%;height: 100%"></iframe>';
    return strHtml;
}