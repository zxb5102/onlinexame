/**
 * Created by Administrator on 2017/5/14.
 */
$('#tabs').tabs({
    fit:true,
    justified:true
}).tabs('add',{
    title:'试题分类',
    selected:true,
    tools:[{
        iconCls:'icon-mini-refresh',
        handler:refreshPanel
    }],
    content: CreateContent('../../sys/category_manage/paper_manage.html')
}).tabs('add',{
    title:'部门分类',
    selected:false,
    tools:[{
        iconCls:'icon-mini-refresh',
        handler:refreshPanel
    }],
    content: CreateContent('../../sys/category_manage/dept_manage.html')
});

function refreshPanel() {
    var pp = $('#tabs').tabs('getSelected');
    var url = $(pp).children()[0].outerHTML;
    $(pp).panel('clear').html(url);
}

function CreateContent(url) {
    /*style="height:100%;width:100%;"*/
    var strHtml = '<iframe src="' + url + '" scrolling="auto" frameborder="0"  style="width: 100%;height: 100%"></iframe>';
    return strHtml;
}
