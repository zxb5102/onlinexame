/**
 * Created by Administrator on 2016/12/12.
 */
/*处理面板选择刷新问题*/
/*var panelf;
function panelselect(title,index){
    console.log(title+" "+index);
    if(index>0&& typeof(panelf) != "undefined"){
        if(panelf.flag[index-1]){
            var row = $('#dg').datagrid('getSelected');//获取选中的行的id

            var pp = $('#dialog-according').accordion('getSelected');    // get the selected panel
            if (pp){
                var path ;
                if(index==1){
                    path = 'option.html';
                }else{
                    path = 'pic.html';
                }
                 //pp.panel('refresh',path+'?id='+row.id);    // call 'refresh' method to load new content
                pp.panel({
                    //href:path+'?id='+row.id,
                });
            }
            panelf.flag[index-1] = false;
        }

    }
}*/





/*禁用工具栏按钮*/
function disablebtn() {
    $("#toolbar .easyui-linkbutton").linkbutton("disable");
    console.log('禁用按钮');
}
/*启用工具栏按钮*/
function enablebtn() {
    $("#toolbar .easyui-linkbutton").linkbutton("enable");
    console.log('启用按钮');
}



/*对象是否点击编辑按钮，控制面板的重加载*/
/*function panelFlag(){
    this.flag = [true,true];
}*/
function panelNum(cur) {
    this.already = false;
    this.flag = false;
    // this.id = id;
    this.cur = cur;
    this.next = cur + 1;
}
panelNum.prototype.setFalse = function () {
    this.flag = false;
}
panelNum.prototype.setTrue = function () {
    this.flag = true;
}
panelNum.prototype.setNum = function ( cur) {
    if(this.flag == true ){
        if( this.already == false){
            this.cur = cur;
            this.next = this.cur + 1;
            this.already = true;
        }else{
            this.next = cur + 1;
        }
    }
}
panelNum.prototype.getChar = function(){
    var i,j;
    for( j=65,i=0;i<this.next-1;i++){
        j++;
    }
    return String.fromCharCode(j);
}

window.PNUM = new panelNum( -1 );
//当第二个选项窗口打开的时候 设置为TRUE
$(function () {
    $('#dialog-according').accordion({
        onSelect:function ( title,index ) {
            if( index == 1 && window.PNUM.flag == false ){
                window.PNUM.setTrue();
            }
        }
    });
})
//关闭窗口的时候把开关设置为FALSE
$(function () {
    $("#dlg").dialog({
        onClose:function () {
            window.PNUM.setFalse();
            window.PNUM.already = false;
        }
    });
})
/*添加面板*/
function addpanel(type) {

    var hrf='';
    if(type=='two'){    
        hrf='option.html?id='+row.id;
    }
    /*添加选项面板*/
    $('#dialog-according').accordion('add', {
        title: '选项',
        tools:[{
            iconCls:'icon-add',
            handler:function(){
                if( window.PNUM.flag == true ){
                    var date = new Date();
                    var min = date.getMinutes()+"";
                    var sec1 = date.getSeconds()+"";
                    var sec2 = date.getMilliseconds()+"";
                    var all = min+sec1+sec2;
                    var e1;
                    var labels = $("#dialog-according").children().eq(1).find('.package-label-textarea');
                    var lnum = labels.length;
                    window.PNUM.setNum( lnum );
                    var tstr = window.PNUM.getChar();
                    if( type === 'two'){
                        e1 = $(labels[0]).clone(true,true);//默认克隆第一个节点
                        e1.attr('index','-1');

                        e1.find('.package-dv-label').eq(0).find('label').eq(0).text(tstr);
                        e1.find('.easyui-linkbutton').eq(0).find('.l-btn-text').eq(0).text('删除');

                        e1.find('.item-textarea').text('').attr('name','item['+tstr+'].title');//默认文字为空
                        e1.find('.ensure').attr('name',"item["+tstr+"].check").attr('checked','checked');//默认选中

                    }else{
                        var a1 = $("<textarea  name='item["+tstr+"].title' class='item-textarea' ></textarea>");
                        var a2 = $("<div class='package-textarea'></div>");
                        a2.append(a1);

                        var b1 = $('<a  class="easyui-linkbutton" href="javascript:void(0)" onclick="" >删除</a>');
                        b1.bind('click',resetbtn);
                        var b2 = $('<input type="checkbox" class="ensure" name="item['+tstr+'].check" value="true" checked="checked">');
                        var b3 = $('<div class="package-dv-a"></div>');
                        b3.append(b1);
                        b3.append(b2);

                        var c1 = $("<label for='item-b-option'>"+tstr+"</label>");
                        var c2 = $('<div class="package-dv-label"></div>');
                        c2.append(c1);

                        var d1 = $("<div class='package-label'></div>");
                        d1.append(c2);
                        d1.append(b3);

                        var e1 = $("<div index= '-1' class='package-label-textarea'></div>");
                        e1.append(d1);
                        e1.append(a2);
                    }
                    $('#dialog-according').children().eq(1).children().eq(1).append(e1);
                }

            }
        }],
        iconCls:'icon-ok',
        href:hrf,
        selected: false
    });

    if(type=='two'){
        /*添加图片面板*/
        $('#dialog-according').accordion('add', {
            title: '图片',
            iconCls:'icon-ok',
            /*content:'<div style="padding:10px">Contentffsfs</div>',*/
            href:'pic.html?id='+row.id,
            selected: false
        });
    }

}
/*移除面板*/
function  removepanel() {
    var $according = $('#dialog-according');
    // console.log($according.children());
    // console.log(typeof $according.children().length);
    if($according.children().length==3){
        $according.accordion('remove',1)
                    .accordion('remove',1);
    }else if($according.children().length==2){
        $according.accordion('remove',1);
    }


}

/*
panelFlag.prototype.enable = function (num) {
    this.flag[num] = true;
    // this.flag= true;
};
panelFlag.prototype.disable = function () {
    this.flag = false;
}*/
