/**
 * Created by Administrator on 2016/12/12.
 */
/*对话框点击取消按钮*/
function cancelText() {
    enablebtn();
    removepanel();  
    $('#dlg').dialog('close');
}

/*按下对话框的保存按钮*/
function saveTest(){
    $('#item-dialog').form('submit',{
        url:'../../json/sys/manage_item/update.json',
        onSubmit: function(){
            return true;
        },
        success: function(data){
            var result = eval('(' + data + ')');
            if (result.success){
                $('#dlg').dialog('close');		// close the dialog
                $('#dg').datagrid('reload');	// reload the user data
            } else {
                $.messager.show({
                    title: '错误',
                    msg: result.message
                });
            }

        }
    });
    enablebtn();
    removepanel();
}