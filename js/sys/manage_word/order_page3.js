/**
 * Created by Administrator on 2017/4/22.
 */
$(function(){
    var indicator = $('<div class="indicator">>></div>').appendTo('body');
    $('.drag-item').draggable({
        revert:true,
        deltaX:0,
        deltaY:0
    }).droppable({
        onDragOver:function(e,source){
            indicator.css({
                display:'block',
                left:$(this).offset().left-10,
                top:$(this).offset().top+$(this).outerHeight()-5
            });
        },
        onDragLeave:function(e,source){
            indicator.hide();
        },
        onDrop:function(e,source){
            $(source).insertAfter(this);
            indicator.hide();
        }
    });
});
$(function () {
    window.package_page_option = new Object();
    $('.dg').datagrid({
        onCheck:function (index, row) {
            var title = $(this).parents("[class='panel']").eq(0).children("[class*='panel-header']").children("[class*=panel-title]").text();
            var id = row.id;
            if(!window.package_page_option[title]){
                window.package_page_option[title] = new Object();
                window.package_page_option[title]['length'] = 0;
            }
            var next = window.package_page_option[title].length;
            window.package_page_option[title][next] = id;
            window.package_page_option[title].length = next + 1;
        },
        onUncheck:function (index, row) {

        },
        view: detailview,
        detailFormatter: function (index, row) {
            return '<div class="ddv"></div>';
        },
        onExpandRow: function (index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('div.ddv');
            ddv.panel({
                border: false,
                cache: true,
                href: '../../sys/manage_item/detail.html?id=' + row.id,
                onLoad: function () {
                    $('.dg').datagrid('fixDetailRowHeight', index);
                }
            });
            $('.dg').datagrid('fixDetailRowHeight', index);
        }
    }).datagrid('enableFilter');
    window.page_option_get = new Object();
    window.page_option_get[0] = true;
    $('.easyui-accordion').eq(0).accordion({
        'onSelect':function (title, index) {
            if( !window.page_option_get[index] ){
                window.page_option_get[index] = true;
                $(this).children().eq(index).find('.easyui-datagrid').datagrid('reload');
            }
        }});
});
