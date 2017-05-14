/**
 * Created by Administrator on 2017/5/8.
 */
$('#tabs').tabs({
    fit:true,
    justified:true
}).tabs('add',{
    title:'按试题查询',
    selected:true,
    tools:[{
        iconCls:'icon-mini-refresh',
        handler:refreshPanel
    }],
    content: CreateContent('../../sys/score_manage/score_paper/paper_select.html')
}).tabs('add',{
    title:'按考生查询',
    selected:false,
    tools:[{
        iconCls:'icon-mini-refresh',
        handler:refreshPanel
    }],
    content: CreateContent('../../sys/score_manage/score_student/student_select.html')
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