/**
 * Created by Administrator on 2017/5/4.
 */
$(function () {
    $('#dg').datagrid({
        loadMsg: '玩命加载中 ~_~ ',
        url: '../../json/sys/student_base/student_base.json',
        method: 'get',
        title: '考生基本信息',
        iconCls: 'icon-student',
        fitColumns: true,
        width: '100%',
        /*onLoadSuccess:function () {
            window.editIndex = undefined;
        },*/
        singleSelect: true,
        selectOnCheck:false,
        checkOnSelect:false,
        pagination: true,
        idField:'s_id',
        toolbar: '#tb',
        /*onDblClickRow: onDblClick,*/
        rownumbers:'true',
        view: detailview,
        detailFormatter:function(index,row){
            return '<div class="ddv"></div>';
        },
        onExpandRow: function(index,row){
            var ddv = $(this).datagrid('getRowDetail',index).find('div.ddv');
            ddv.panel({
                border:false,
                cache:false,
                href:'../../sys/student_base/student_base2.html?index='+index,
                onLoad:function(){
                    $('#dg').datagrid('fixDetailRowHeight',index);
                    $('#dg').datagrid('selectRow',index);
                    $('#dg').datagrid('getRowDetail',index).find('form').form('load',row);
                }
            });
            $('#dg').datagrid('fixDetailRowHeight',index);
        },
        columns: [[
            {field:'ck',title:'勾选',checkbox:'true'},
            /*{field:'s_id',title:'',hidden:'true'},*/
            {field: 's_name', title: '姓名', width: 10},
            {field: 's_sex', title: '性别', width: 10},
            {field: 's_dept', title: '所属部门', width: 15},
            {field: 's_phone', title: '联系电话', width: 15},
            {field: 's_email', title: '邮箱', width: 15},
            {field: 's_idy', title: '身份证号', width: 10},
            {field: 's_address', title: '地址', width: 15},
            {field: 's_job', title: '工作', width: 20},
            {field: 's_remark', title: '备注', width: 20}
        ]]
    });
});
/*下载pdf*/
function getPdf() {
    var ary = "";
    var rows =  $("#dg").datagrid('getChecked');
    $(rows).each(function (index, tar) {
        ary += $(tar)[0].s_id + ',';
    });
    console.log(ary);
    if( ary != ""){
        $.ajax({
            url:'../../json/sys/student_base/down_excel.json',
            method:'GET',
            data:{ary:ary},
            dataType:'json',
            error:function () {
                alert('下载表格失败，请联系管理员！');
            },
            success:function (data) {
                if( data.flag == 'true' ){
                    //获取应用名
                    var application = window.location.pathname.split('/')[1];
                    var new_url = window.location.origin + "/"+application + data.url;
                    /*alert(data.url);*/
                    window.location.href = new_url;
                }else{
                    alert('下载表格失败，请联系管理员！');
                }
            }
        });
    }

}

var search_msg = new Object();
/*为表格绑定相应的事件获取输入框的值*/
$('#fm').form({
    onChange:function (tar) {
        if ($(tar).eq(0).textbox('isValid')) {
            setSearchValue(tar);
        }
    }
});
function setSearchValue(tar) {
    var name = $($(tar).context).attr('textboxname');
    var value = $(tar).eq(0).textbox('getValue');
    search_msg[name] = value;
    console.log(search_msg);
}
/*提供搜索更新数据表格的展示*/
function search_dg(){
    $('#dg').datagrid('load',search_msg);
    console.log(search_msg);
}

var msg_secure;
function closeSec() {
    $('#dlg').dialog('close');
}
function initDlg() {
    $('#dlg').find('.easyui-textbox').textbox('clear');
    $('.easyui-switchbutton').switchbutton('clear');
    msg_secure = new Object();
    msg_secure.change_pwd = false;
    msg_secure.disable_s = false;
}
var dlg_sec;
/*打开窗口*/
function openDlg() {
    var row = $('#dg').datagrid('getSelected');
    if(row){
        initDlg();
        $('#dlg').dialog('open');
        dlg_sec = row.s_id;
    }
}
/*保存设置*/
function secure() {
    msg_secure.s_id = dlg_sec;
    if(msg_secure.change_pwd){
        if($('#pwd2').textbox('isValid')){
            var pwd = $('#pwd2').val();
            msg_secure.pwd = pwd;

        }else{
            return false;
        }
    }
    saveSecure();
    closeSec();
}
/*发送请求*/
function    saveSecure() {
    $.ajax({
        url:'../../json/sys/student_base/save_secure.json',
        data:msg_secure,
        type:'post',
        dataType:'json',
        success:function (data) {
            if( data.flag == 'true'){

            }else{
                alert('修改失败，请联系管理员！');
            }
        },
        error:function () {
            alert('修改失败，请联系管理员！');
        }
    });
}
/*绑定事件*/
$(function () {
    /*是否要更改密码*/
    $('#change_pwd').switchbutton({onChange:function () {
        toggle(this);
        if($(this).attr('flag') == 'true'){
            $('#pwd').show(200);
//            var pwd = $('#pwd1').val();
            msg_secure.change_pwd = true;
        }else{
            $('#pwd').hide(200);
            msg_secure.change_pwd = false;
        }
    }});
    /*是否要禁用用户*/
    $('#disable_s').switchbutton({onChange:function () {
        toggle(this);
        if($(this).attr('flag') == 'true'){
            msg_secure.disable_s = true;
        }else{
            msg_secure.disable_s = false;
        }
    }});
    /*将按钮的flag属性在false和true中切换*/
    function toggle(tar) {
        if( $(tar).attr('flag')== 'false'){
            $(tar).attr('flag','true');
        }else{
            $(tar).attr('flag','false');
        }
    }
});
/*扩展判断密码是否一致*/
$.extend($.fn.validatebox.defaults.rules, {
    equals: {
        validator: function(value,param){
            return value == $(param[0]).val();
        },
        message: '两次输入的密码不匹配！'
    }
});

/*保存更改或是新建的学生的信息*/
function saveItem(index) {
    var row = $('#dg').datagrid('getRows')[index];
    var url = row.isNewRecord ? '../../json/sys/student_base/save_student.json' : '../../json/sys/student_base/update_student.json'+"?s_id="+row.s_id;
    $('#dg').datagrid('getRowDetail', index).find('form').form('submit', {
        url: url,
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (data) {
            data = eval('(' + data + ')');
            if( data.flag == 'true'){
                data.msg.isNewRecord= false;
                $('#dg').datagrid('collapseRow', index);
                $('#dg').datagrid('updateRow', {
                    index: index,
                    row: data.msg
                });
            }else{
                alert('信息提交出错，请联系管理员！');
            }
        }
    });
}
/*删除新添加的行，折叠更改的行*/
function cancelItem(index) {
    var row = $('#dg').datagrid('getRows')[index];
    if (row.isNewRecord) {
        $('#dg').datagrid('deleteRow', index);
    } else {
        $('#dg').datagrid('collapseRow', index);
    }
}
/*删除某个学生的信息*/
function destroyItem() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $.messager.confirm('Confirm', '确认要删除当前考生?', function (r) {
            if (r) {
                var index = $('#dg').datagrid('getRowIndex', row);
                $.post('../../json/sys/student_base/destroy_student.json',{id: row.s_id}, function (data) {
                    if( data.flag == 'true' ){
                        $('#dg').datagrid('deleteRow', index);
                    }else{
                        alert('删除考生错误，请联系管理员');
                    }

                },'json');
            }
        });
    }
}
/*新建学生*/
function newItem() {
    $('#dg').datagrid('appendRow', {isNewRecord:true});
    var index = $('#dg').datagrid('getRows').length - 1;
    $('#dg').datagrid('expandRow', index);
    $('#dg').datagrid('selectRow', index);
}