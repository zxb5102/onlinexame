/**
 * Created by Administrator on 2016/12/12.
 */
/*添加新题目*/
function newTest(){
    Tobj = new tobj();
    $('#dlg').dialog('open').dialog('setTitle','新题目');
    $('#item-dialog').form('clear')
    addpanel('one');//添加面板;

    // document.getElementById("test").value ='单选题';
    /* $('test').value="单选题"; */
    // url = "add_items";
    disablebtn();
}
/*编辑题目*/
var row;
function editTest(){
    /*panelf = new panelFlag();//记录 面板的选择*/
    Tobj = new tobj();//记录题目的值

    row = $('#dg').datagrid('getSelected');//获取表格选中的行

    addpanel('two');//添加面板

    /*设置对话框题目的id传送到后台*/
    $("#dia_item_id").val(row.id);
    if (row){
        $('#dlg').dialog('open').dialog('setTitle','编辑题目');
        $('#item-dialog').form('clear')//现将表格清除然后再刷新
                .form('load',row);
        url = "update_items?id="+row.id;
    }
    Tobj.save();
    disablebtn();
}

/*工具条的删除按钮*/
function removeTest(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $.messager.confirm('Confirm','你确定要删除这个题目?',function(r){
            if (r){
                $.post("../../json/sys/manage_item/delete.json",
                    {id:row.id},
                    function(result){
                        // var result = eval('(' + data + ')');
                        if (result.success){
                            $('#dg').datagrid('reload');	// reload the user data
                        } else {
                            $.messager.show({	// show error message
                                title: '错误',
                                msg: result.message
                            });
                        }
                },'json');
            }
        });
    }
}