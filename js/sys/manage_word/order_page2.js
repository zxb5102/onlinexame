/**
 * Created by Administrator on 2017/4/22.
 */
window.op_group = new Object();

$.extend($.fn.validatebox.defaults.rules, {
    no_zh: {
        validator: function (value) {
            console.log(value);
            return false;
        },
        message: '请输入数字'
    }
});
function deal3() {
    var pare = $(this).parents('.pack_all');
    var title = pare.eq(0).find('.op_title').eq(0).text();
    pare.remove();
    window.op_group[title] = false;
}
function d_focus() {
//        $(this).parent().prev().find('span').eq(1).text('填写数字');
}
function d_blur() {
    var msg = $(this).val().trim();
    var flag ;
    if( msg == ''){
        flag = true;
    }else{
        flag = /.*\D.*/.test(msg);
    }
    var node = $(this).parent().prev().find('span').eq(1);
    if(flag){
        node.text('请填写');
        node.attr('flag','false');
        node.css('color','#ff0000');
    }else{
        node.text('填写正确');
        node.attr('flag','true');
        node.css('color','#0D880D');
    }
//        $(this).parent().prev().find('span').eq(1).text('请填写');
}
$(function () {
    $('#dev_right').children().eq(0).css('display', 'none');
    $('#mm').menu({
        onClick: function (item) {
            var name = item.text;
            if (!window.op_group[name]) {
                var pare = $('#dev_right').children();
                var num_child = pare.length;
                var t_node = pare.eq(0).clone(true, true);
                t_node.find('.flag_c').attr('flag','false');
                t_node.find('a').click(deal3);
                t_node.find('.page_input').focus(d_focus).blur(d_blur);
                t_node.css('display', 'block');
                t_node.find('.op_title').eq(0).text(name);
                $('#dev_right').append(t_node);
                window.op_group[name] = true;
            }
        }
    });
    $('#dev_left').find('.easyui-linkbutton').bind('click',function () {
        var nodes = $('.flag_c');
        var size = nodes.length;
        var x;
        var flag = true;
//            console.log(nodes);
        for( x=0;x<size;x++ ){
//                console.log($(nodes[x]).attr('flag'));
            if($(nodes[x]).attr('flag') == 'false'){
                flag = false;
            }
        }
        if( flag ){
            var childs = $('#dev_right').children();
            var size = childs.length;
            if( size > 1 ){
                var i;
                window.re_obj = new Object();
                window.re_obj.length = 0;
                for( i=1;i<size;i++ ){
                    var node = $(childs[i]);
                    var title = node.find('.op_title').eq(0).text();
                    var sec_child = node.children().eq(1);
                    var num = sec_child.children().eq(0).find('.page_input').val();
                    var score = sec_child.children().eq(1).find('.page_input').val();
//                        console.log( title + "  " + num + " " + score);
                    var obj = new Object();
                    obj['title'] = title;
                    obj['num'] = num;
                    obj['score'] = score;
                    var len = window.re_obj.length;
                    window.re_obj[len] = obj;
                    window.re_obj.length = len + 1;
                }
                var str_re = JSON.stringify(window.re_obj);
                console.log(str_re);
                jQuery.post( '../../json/sys/manage_word/order_page.json',{msg:str_re},function (data,textStatus,jqXHR) {
//                        $('html').html(data);
                    var hf = window.location.href;
                    var next_hf = hf.substring(0,hf.lastIndexOf('/')) + '/order_page3.html';
                    console.log(next_hf);
                    window.location.replace(next_hf);
                },'json')
            }
        }
    });
})