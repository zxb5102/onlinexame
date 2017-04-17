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
                // console.log(123);
                var date = new Date();
                var min = date.getMinutes()+"";
                var sec1 = date.getSeconds()+"";
                var sec2 = date.getMilliseconds()+"";
                var all = min+sec1+sec2;

                var a1 = $("<textarea name='item["+all+"].title' class='item-textarea' >自定义</textarea>");
                var a2 = $("<div class='package-textarea'></div>");
                a2.append(a1);

                // var b1 = $('<a class="easyui-linkbutton" href="javascript:void(0)" onclick="" >重置</a>');
                var b2 = $('<input type="checkbox" class="ensure" name="item['+all+'].check" value="true" checked="checked">');
                var b3 = $('<div class="package-dv-a"></div>');
                // b3.append(b1);
                b3.append(b2);

                var c1 = $("<label for='item-b-option'></label>");
                var c2 = $('<div class="package-dv-label"></div>');
                c2.append(c1);

                var d1 = $("<div class='package-label'></div>");
                d1.append(c2);
                d1.append(b3);

                var e1 = $("<div class='package-label-textarea'></div>");
                e1.append(d1);
                e1.append(a2);
                $('#dialog-according').children().eq(1).children().eq(1).append(e1);
                // console.log(e1);
                // debugger;

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
    console.log($according.children());
    console.log(typeof $according.children().length);
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
