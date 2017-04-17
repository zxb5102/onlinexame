/**
 * Created by Administrator on 2016/12/12.
 */



var Tobj ;
$(document).ready(function () {
    $("#title-clr").click(function () {
        var show =$("#item-a-option");
        show.val("");
    });
    $("#title-undo").click(function () {
        var show =$("#item-a-option");
        // debugger;
        if((typeof Tobj )!= 'undefined'){
            var str = Tobj.get();
            show.val(str);
        }else{
            show.val('');
        }
    });

});


//对象处理选项框数据还原和清除
function tobj(){
    this.value = "";
}
tobj.prototype.get = function () {
    return this.value;
}
tobj.prototype.save = function () {
    var show =$("#item-a-option");
    this.value = show.val();
}



