/**
 * Created by Administrator on 2017/5/14.
 */
/**
 * Created by Administrator on 2017/5/9.
 */
/*判断是否是Root节点*/
function isRoot(node) {
    var root = $('#te').tree('getRoot');
    if( node.text == root.text ){
        return true;
    }else{
        return false;
    }
}
/*获取某个节点的所有父节点包括Root节点 node 为普通的 DOM对象 */
function getPareNodes(node) {
    var ary = new Array();
    var pare = $('#te').tree("getParent",node);
    while( pare != null){
        ary.push(pare);
        node = document.getElementById(pare.domId);
        pare = $('#te').tree("getParent",node);
    }
    return ary;
}
/*判断节点是否是文件夹节点*/
function isFloder(node) {
    var flag = false;
    var attrs = node.attributes;
    if( attrs ){
        if( attrs.folder == 'true'){
            flag = true;
        }
    }
    return flag;
}
/*更新节点的ID*/
function updateNodeId(node ,old_part,new_part) {
    if( isFloder(node) ){
        /*获取目录节点的孩子*/
        var ary = getNodeSize(node,true);
        /*更新目录节点*/
        var new_id = node.id.replace(old_part,new_part);
        console.log("目录     "+node.id+"     "+new_id);
        node.id = new_id;
        $('#te').tree('update',node);
        /*批量更新子节点*/
        $(ary).each(function (index,target) {
            updateNodeId(target,old_part,new_part);
        });
    }else{
        var new_id = node.id.replace(old_part,new_part);
        console.log(""+node.id+"     "+new_id);
        node.id = new_id;
        $('#te').tree('update',node);
    }
}
/*实现移除一个节点更改DOM树节点的属性 node 是普通的对象含有ID和domId属性*/
function changeRemove(source,noChangePareNum) {
    var id = "#" + source.domId;
    var close = $(id).closest("li");
    var nextAll = $(close).nextAll();
    nextAll.each(function (index,tar) {
        var target = $('#te').tree("getNode",$(tar).children());
        var id = target.id;
        var ary = id.split('-');
        var newNum = parseInt(ary[ary.length - 1]) - 1;
        ary[ary.length - 1] = newNum;
        var newId = "";
        for( var i=0;i<ary.length;i++ ){
            if( i != ary.length - 1){
                newId += ary[i] + '-';
            }else{
                newId += ary[i];
            }
        }
        // target.id = newId;
        updateNodeId(target,target.id,newId);
        /*更新节点数据*/
        // $('#te').tree('update',target);
    });
    if(noChangePareNum == undefined){
        /*更新父节点的 numSize 值（进行减操作）*/
        var dom_source = document.getElementById(source.domId);
        var pares = getPareNodes(dom_source);
        /*获取*/
        var numValue = getNodeNumValue(source);
        var root = $('#te').tree('getRoot');
        $(pares).each(function (index, tar) {
            if( tar.text != root.text ){
                var num = $(tar.target).find("span[class*='badge']").text();
                var new_num = parseInt(num) - numValue;
                getNodeNumValue(pares[0],new_num);
                $('#te').tree('update',pares[0]);
            }
            // console.log(new_num);
        });
    }

    return true;
}
$(function () {
    $('#te').tree({
        url:'../../json/sys/category_manage/dept_manage/tree_data1.json',
        lines:true,
        method:'get',
        animate:true,
        dnd:true,
        onDblClick: function(node){
            $(this).tree('beginEdit',node.target);
        },
        onContextMenu: function(e, node){

            var delMenu = $('#remove_menu')[0];
            var appendMenu = $('#append_menu')[0];
            if( !isFloder(node) ){
                /*
                 * showItem,hideItem*/
                $('#mm').menu('hideItem', appendMenu)
                    .menu('showItem', delMenu);
            }else{
                $('#mm').menu('showItem', appendMenu);
                /*判断是否是root节点*/
                if( isRoot(node) ){
                    /*禁用删除按钮*/
                    $('#mm').menu('hideItem', delMenu);
                }else{
                    $('#mm').menu('showItem', delMenu);
                }
            }
            e.preventDefault();
            // select the node
            $('#te').tree('select', node.target);
            // display context menu
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        },
        onDrop:function (target,source,point) {
            /*更新当前节点的id*/

            // console.log("============================");

            var pare = $('#te').tree('getNode',target);
            var size = getNodeSize(pare);
            /*获取父节点的ID值 得到要更新的值 更新数据*/
            var new_id = pare.id + '-' + (size + 1) ;
            updateNodeId(source,source.id,new_id);
            // source.id = new_id;
            // $('#te').tree("update",source);
            // if( isFloder(source)){
            //     // alert('folder');
            //     /*更新folder下的全部文件使用递归方法 */
            //
            // }
            // console.log(new_id);
            // console.log(target);
            // console.log(source);
            /*向上更新父节点的num值*/
            /*更新父节点的 numSize 值（进行减操作）*/
            var dom_source = document.getElementById(source.domId);
            var pares = getPareNodes(dom_source);
            /*获取*/
            var numValue = getNodeNumValue(source);
            var root = $('#te').tree('getRoot');
            $(pares).each(function (index, tar) {
                if( tar.text != root.text ){
                    var num = $(tar.target).find("span[class*='badge']").text();
                    var new_num = parseInt(num) + numValue;
                    getNodeNumValue(pares[0],new_num);
                    $('#te').tree('update',pares[0]);
                }
                // console.log(new_num);
            });
        },
        onBeforeDrop:function (target,source,point) {
            // console.log(target);
            /*判断当前的拖动是否是父子级关系 若是则 return false */
            var pare_text = $('#te').tree('getParent',source.target).text;
            var tar = $('#te').tree('getNode',target).text;
            if( pare_text == tar ){
                return false;
            }else{
                changeRemove(source);
            }

        },
        onDragOver:function (target, source) {
            // console.log('???????????????????????????');
            // console.log($("#te").tree('getNode',target));
            // console.log(source);
            // console.log();
            var tar = $("#te").tree('getNode',target);
            var pare = $('#te').tree('getParent',source.target);
            // console.log(tar);
            // console.log(pare);
            if( isFloder(tar) ){
                // console.log('是文件夹');
                // return true;
                /*if( pare.text == tar.text ){
                 return false;
                 }else{
                 return true;
                 }*/
                return true;
            }else{
                return false;
            }
        },
        onAfterEdit:function (node) {
            if(isRepeat(node.text)){
                $.messager.alert({
                    title: '温馨提示',
                    msg: '输入的分类重复！',
                    closable:false,
                    icon:'warning',
                    fn: function(){
                        $('#te').tree('beginEdit',node.target);
                    }
                });
            }else{
                var id = node.id;
                var text = node.text;
                $.ajax({
                    url:'../../json/sys/category_manage/dept_manage/nodeEdit.json',
                    method:'get',
                    dataType:"json",
                    data:{id:id,text:text},
                    success:function (data) {
                        if( data.flag != 'true'){
                            alert('分类重命名失败，请联系管理员!');
                        }
                    },
                    error:function () {
                        alert('分类重命名失败，请联系管理员!');
                    }
                });
            }
        },
        /*格式化*/
        formatter:function(node){
            // console.log(node);
            // console.log(node);
            var attrs = node.attributes;
            var num;
            var calzz;
            /*获取attribute里面的num*/
            if(attrs){
                if( attrs.num != undefined ){
                    num = parseInt(attrs.num);
                }else{
                    num = 0;
                }
            }else{
                num = 0;
            }
            /*转化得到要设定的样式*/
            if( !isFloder(node) ){
                /*10以下使用 gray 10以上使用 green*/
                if( num < 10 ){
                    clazz="gray";
                }else{
                    clazz="green";
                }
            }else{
                clazz='red';
                // console.log('red');
            }
            clazz+= " badge";
            return "<span>"+node.text+"<span class='"+clazz+"'>"+num+"</span>"+"</span>";
        }
    });
    $('#mm').menu({
        onClick:clickMenu
    });
});
function sav() {
    // alert('save');
    var sel = $('#te').tree('getSelected');
    var node = $(sel.target);
    var selNode = $('#te').tree('getNode',sel);
    console.log(selNode);
}
/*参数 pareFolder 是一个含有 ID 的对象*/
function append(pareFolder,isFolder){
    // var tar = pareFolder.target;

    $.ajax({
        url:'../../json/sys/category_manage/dept_manage/nodeAppend.json',
        data:{id:pareFolder.id},
        dataType:'json',
        success:function (data) {
            if( data.flag == 'true' ){
                var size = getNodeSize(pareFolder);
                var id = "" + pareFolder.id + "-" + (size + 1);
                var data = new Object();
                data.id = id;
                data.text = "新分类";
                data.attributes = new Object();
                data.attributes.num = 0;
                if( isFolder == true){
                    data.attributes.folder = "true";
                }
                $("#te").tree('append',{
                    parent: pareFolder.target,
                    data:[data]
                });

                var ary = getNodeSize(pareFolder,true);
                if (isFolder == true){
                    /*更改图标*/
                    //    tree-icon tree-folder
                    $(ary[ary.length - 1].target).find("span[class*='tree-icon']").removeClass("tree-file").addClass("tree-folder");;

                }
                $('#te').tree('beginEdit',ary[ary.length - 1].target);
                /*
                 var newId;
                 var child_num;
                 /!*加入手动设定id*!/
                 if( typeof tid != undefined){
                 newId = tid;
                 }else{
                 child_num = getNodeSize(pareFolder);
                 newId = String(id) +"-"+ (child_num + 1);
                 }


                 console.log('新建节点的id'+ '    '+newId);
                 $('#te').tree('append', {
                 parent: tar,
                 data: [{
                 id: newId,
                 text: text,
                 attributes:attributes
                 }]
                 });
                 //获取刚添加的节点，进入编辑状态
                 var tnodes = $('#te').tree('getChildren',tar);
                 var tnode = $(tnodes).last()[0];
                 $('#te').tree('beginEdit',tnode.target);
                 */

            }else{
                alert('新增分类失败，请联系管理员！');
            }
        },
        error:function () {
            alert('新增分类失败，请联系管理员！');
        }
    });
}
/*判断分类名是否重复*/
function isRepeat( val ) {
    var root = $('#te').tree('getRoot');
    var childs = $('#te').tree('getChildren',root);
    var flag = false;
    var i = 0;
    $(childs).each(function( index,tar ){
        var nodevale = $(tar)[0].text;
        // console.log(nodevale);
        if( nodevale == val ){
            i ++;
        }
    });
    if( i == 1){
        flag = false;
    }else{
        flag = true;
    }
    return flag;
}
/*删除节点*/
function remove() {
    var sel = $('#te').tree('getSelected');
    if(isFloder(sel)){
        delFolder(sel);
    }else{
        //delNode(sel);
        delFile(sel);
        console.log('点击删除普通文件');
    }
}
/*删除普通的文件*/
function delFile(node) {
    var num = getNodeNumValue(node);
    if( num > 0){
        $.messager.alert('温馨提示','当前分类下含有文件，不允许删除','warning');
    }else{
        $.ajax({
            url:"../../json/sys/category_manage/dept_manage/nodeDel.json",
            dataType:"json",
            data:{id:node.id},
            success:function (data) {
                if(data.flag == 'true'){
                    // /*获取孩子节点*/
                    // var childs = $('#te').tree('getChildren',node.target);
                    if(changeRemove(node,true)){
                        $('#te').tree('remove',node.target);
                    }

                    // // append(pareNode,childs[0].text,childs[0].attributes);
                    // var tsize = getNodeSize(pareNode);
                    // $(childs).each(function (index, tar) {
                    //     console.log(index);
                    //     var id = "" + pareNode.id  +"-"+ (tsize + index + 1);
                    //     append(pareNode,tar.text,tar.attributes,false,id);
                    // });
                }else{
                    alert('删除节点失败，请联系管理员！');
                }
            },
            error:function () {
                alert('删除目录失败，请联系管理员！');
            }
        });
    }
}
function delFolder(node) {
    var numValue = getNodeNumValue(node);
    // console.log(numValue);
    var pareNode = $('#te').tree('getParent',node.target);
    if( numValue > 0 ){
        $.messager.confirm({
            title: '温馨提示',
            msg: '当前的目录下存在其他的分类,是否删除？',
            fn: function(r){
                if (r){
                    // console.log('点击确认');
                    /*判断是目录还是普通文件*/
                    $.ajax({
                        url:"../../json/sys/category_manage/dept_manage/nodeDel.json",
                        dataType:"json",
                        data:{id:node.id},
                        success:function (data) {
                            if(data.flag == 'true'){
                                /*获取孩子节点*/
                                // var childs = $('#te').tree('getChildren',node.target);
                                var ary = getNodeSize(node,true);//这里要追加到上一层节点
                                changeRemove(node,true);

                                // append(pareNode,childs[0].text,childs[0].attributes);
                                var tsize = getNodeSize(pareNode);

                                $(ary).each(function (index, tar) {
                                    // console.log(index);
                                    var id = "" + pareNode.id  +"-"+ ((tsize - 1) + (index + 1));
                                    // append(pareNode,tar.text,tar.attributes,false,id);
                                    // tar.id = id;
                                    updateNodeId(tar,tar.id,id);
                                    $("#te").tree('append',{
                                        parent: pareNode.target,
                                        data:[tar]
                                    });
                                });
                                $('#te').tree('remove',node.target);
                            }else{
                                alert('删除目录节点失败，请联系管理员！');
                            }
                        },
                        error:function () {
                            alert('删除目录节点失败，请联系管理员！');
                        }
                    });

                }else{
                    console.log('点击取消');
                    // getNodeNumValue(node);
                }
            }
        });
    }else{
        console.log('没有文件，直接删除');
        $('#te').tree('remove',node.target);
    }
}
/*node 是一个普通的 DOM 对象（getSelected的对象）*/
function getNodeSize(node,getAry) {
    var text = String(node.id) ;
    var length = text.split('-').length;
    var allNodes = $('#te').tree('getChildren');
    var result = 0;
    var ary = new Array();
    $(allNodes).each(function (index,tar) {
        // console.log(tar);
        var val = String(tar.id);
        if( val.split('-').length == (length+1) && val.indexOf(text) == 0){
            ary.push(tar);
            result ++;
        }
    });
    if( getAry == undefined ){
        return result;
    }else{
        return ary;
    }
}
function delNode(node) {
    console.log('delNode');
}
/*获取节点的Num的值 返回一个 int 型的值 接入 new_num 允许设置新的值*/
function getNodeNumValue(node,new_num) {
    var value;
    // var attrs = node.;nod
    var attrs = node.attributes;
    if( attrs){
        if( attrs.hasOwnProperty('num') ){
            if( new_num == undefined ){
                value = parseInt(attrs.num);
            }else{
                attrs.num = new_num;
                return;
            }

        }else{
            value = 0;
        }
    }else{
        value = 0;
    }
    return value;
}
/*右键按钮的点击事件*/
function clickMenu(node) {

    if( node.id == 'remove_menu'){
        remove();
    }else{
        console.log(node);
        var sel = $('#te').tree('getSelected');
        // var pare = $('#te').tree('getParent',sel.target);
        if( node.id == 'append-file'){
            append(sel,false);
        }else{
            append(sel,true);
        }
    }
}