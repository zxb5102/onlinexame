/**
 * Created by Administrator on 2017/4/19.
 */
$.fn.datebox.defaults.formatter = function(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'/'+m+'/'+d;
};
$.fn.datebox.defaults.parser = function(s){
    var t = Date.parse(s);
    if (!isNaN(t)){
        return new Date(t);
    } else {
        return new Date();
    }
};
$(function(){
    /*更该时间的默认格式*/

    $('#page_detail').hide();
    default_value();
    $('.easyui-switchbutton').eq(0).switchbutton({
        onChange: function(checked){
            if( checked == true ){
                $('#page_detail').slideToggle(200);
            }else{
                $('#page_detail').slideToggle(200);
            }
        }
    })
    function default_value() {
        //设置初始值
        var today = new Date();//获得当前日期
        var year = today.getFullYear();//获得年份
        var month = today.getMonth() + 1;//此方法获得的月份是从0---11，所以要加1才是当前月份
        var day = today.getDate();//获得当前日期
        var new_date = year+"/"+month+"/"+day;
        var new_date2 = (parseInt(year)+1)+"/"+month+"/"+day;
        // console.log(new_date+"  "+new_date2);
        $('#start_date').datebox('setValue', new_date);
        $('#end_date').datebox('setValue', new_date2);

        //设置考试默认时长
        $('#succ_time').numberspinner('setValue', 120);
    }
})
function submitNext() {
    //判断试题名称是否填写
    var flag = $('#word_name').textbox('isValid');
    if(flag){
        //获取相关的值
        var name = $('#word_name').textbox('getValue');
        var style = $('#get_style').textbox('getValue');
        var start = $('#start_date').textbox('getValue');
        var end = $('#end_date').textbox('getValue');
        var succ = $('#succ_time').textbox('getValue');
        var cate = $('#word_category').textbox('getValue');
        var dept = $('#able_dept').textbox('getValue');
        var desc = $('#word_desc').textbox('getValue');
        window.word_msg = new Object();
        window.word_msg['word_name'] = name;
        window.word_msg['get_style'] = style;
        window.word_msg['start_date'] = start;
        window.word_msg['end_date'] = end;
        window.word_msg['succ_time'] = succ;        
        window.word_msg['word_category'] = cate;
        window.word_msg['able_dept'] = dept;
        window.word_msg['word_desc'] = desc;
        var str_re = JSON.stringify(window.word_msg);
        // console.log(window.word_msg);
        jQuery.post( '../../json/sys/manage_word/order_page.json',{msg:str_re},function (data,textStatus,jqXHR) {
            var hf = window.location.href;
            var next_hf = hf.substring(0,hf.lastIndexOf('/')) + '/order_page2.html';
            // console.log(next_hf);
            window.location.replace(next_hf);
        },'json')
    }
}
