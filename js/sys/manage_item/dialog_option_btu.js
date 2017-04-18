/**
 * Created by Administrator on 2016/12/13.
 */
function resetbtn() {
    // console.log(this);
    // console.log(123);
    var pare = $(this).parents("div[index]")[0];
    var index = $(pare).attr('index');//获取序列号
    // console.log();
    if( index != -1 ){
        var str = indexmsg.msg[parseInt(index)-1];//获取保存的字符串
        var package = $(pare).children('.package-textarea')[0];
        var area = $(package).children('.item-textarea')[0];
        var str = $(area).val(str);//设置字符串
    }else{
        //进行删除操作
        $(pare).remove();
        //遍历修改选项的值
        changeItemOptionValue()
    }

}
//批量更改选项框的值
function changeItemOptionValue() {
    // var all = window.PNUM.next - 1;
    var labels = $("#dialog-according").children().eq(1).find('.package-label-textarea');
    var all = labels.length;//获取当前总的元素个数
    var exit = window.PNUM.cur;//获取当前原来返回的元素个数

    var i;
    var j = 65 + exit;
    for(i=exit;i< all ;i++,j++){
        var tstr = String.fromCharCode(j);
        $(labels[i]).find('label').eq(0).text(tstr);
        $(labels[i]).find('.item-textarea').attr('name','item['+tstr+'].title');//更改文字域 不带''
        $(labels[i]).find('.ensure').attr('name',"item["+tstr+"].check");//更改选项框
    }
}


function saveindexmsg() {
    this.index = [];
    this.msg = [];
}
saveindexmsg.prototype.save = function () {

    var set = $('div[index]');
    for(var i=0;i<set.length;i++){
        var dv =set[i];//获取顶级的div
        var $dv = $(dv);
        var package = $dv.children('.package-textarea')[0];
        var area = $(package).children('.item-textarea')[0];
        var str = $(area).val();
        this.msg.push(str);//保存信息
        this.index.push(dv.index);//保存序列号
    }
}