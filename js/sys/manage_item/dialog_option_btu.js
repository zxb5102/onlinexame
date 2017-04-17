/**
 * Created by Administrator on 2016/12/13.
 */
function resetbtn() {
    // console.log(this);
    // console.log(123);
    var pare = $(this).parents("div[index]")[0];
    var index = $(pare).attr('index');//获取序列号
    // console.log();
    var str = indexmsg.msg[parseInt(index)-1];//获取保存的字符串
    var package = $(pare).children('.package-textarea')[0];
    var area = $(package).children('.item-textarea')[0];
    var str = $(area).val(str);//设置字符串
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