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
    $('#next_btu').bind('click',function () {
        // eq(0).progressbar('getValue')
        var pros = $('#right_pro').find('.easyui-progressbar');
        var p_length = pros.length;
        var flag = true;
        var i;
        for( i=0;i<p_length;i++ ){
            if( $(pros[i]).progressbar('getValue') != '100' ){
                flag = false;
            }
        }
        // console.log(flag);
        if(flag){
            var nodes = $('#right_pro').find('ul').children();
            var length = nodes.length;
            var ary = new Array();
            for( i=0;i<length;i++ ){
                ary[i] = $(nodes[i]).text();
            }
            var obj = new Object();
            obj.sort = ary;
            obj.options = window.package_page_option;
            var re_str = JSON.stringify(obj);
            console.log(re_str);
            $.post('../../json/sys/manage_word/order_page_end.json',{'data':re_str},function (data) {
                if( data.msg == 'success' ){
                    var hf = window.location.href;
                    var next_hf = hf.substring(0,hf.lastIndexOf('/')) + '/order_page_success.html';
                    // console.log(next_hf);
                    window.location.replace(next_hf);
                }
            },'json');
        }
    });
})
$(function () {
    $.get('../../json/sys/manage_word/get_page2Msg.json',{},function (data) {
        // console.log(data);
        // var obj = JSON.parse(data);
        window.page2msg = data;
        // console.log(obj);
    },'json');
    window.package_page_option = new Object();
    //判断某个元素在对象的位置，不存在返回 -1
    function judge( id,title ){
        var obj = window.package_page_option[title];
        if( obj ){
            var size = obj.length;
            var i;
            for( i=0;i<size;i++ ){
                if( obj[i] == id ){
                    return i;
                }
            }
        }
        return -1;
    }
    function select(index, row) {
        console.log(1234123);
        var title = $(this).parents("[class='panel']").eq(0).children("[class*='panel-header']").children("[class*=panel-title]").text();
        if(!window.package_page_option[title]){
            window.package_page_option[title] = new Object();
            window.package_page_option[title]['length'] = 0;
        }
        var next = window.package_page_option[title].length;

        var all = window.page2msg[title];
        var ju = judge( row.id,title );
        console.log(ju);
        if( ju == -1 ){
            if( next + 1 <= all ){
                var id = row.id;
                window.package_page_option[title][next] = id;
                window.package_page_option[title].length = next + 1;
                var incr = Math.ceil(100/all);
                var tar =  $('#right_pro').find("[flag*='"+title+"']").eq(0);
                var old_va = $(tar).progressbar('getValue');
                if( old_va + incr > 100 ){
                    $(tar).progressbar('setValue',100);
                }else{
                    $(tar).progressbar('setValue',old_va + incr );
                }
            }else{
                return false;
            }
        }else{
            return true;
        }

    }
    function unselect(index, row) {

        var title = $(this).parents("[class='panel']").eq(0).children("[class*='panel-header']").children("[class*=panel-title]").text();
        var ju = judge( row.id,title );
        if( ju != -1 ){
            var i;
            var length = window.package_page_option[title].length;
            for( i=ju;i<=length-1-1;i++ ){
                window.package_page_option[title][i] = window.package_page_option[title][i+1];
            }
            delete(window.package_page_option[title][length-1]);
            // var next = window.package_page_option[title].length;
            window.package_page_option[title].length = length - 1;

            var all = window.page2msg[title];
            var incr = Math.ceil(100/all);
            var tar =  $('#right_pro').find("[flag*='"+title+"']").eq(0);
            var old_va = $(tar).progressbar('getValue');
            if( old_va - incr > 0 ){
                $(tar).progressbar('setValue',old_va - incr );
            }else{
                $(tar).progressbar('setValue',0);
            }
        }

    }
    $('.dg').datagrid({
        onBeforeSelect:select,
        onBeforeCheck:select,
        onUnselect:unselect,
        onUncheck:unselect,
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
