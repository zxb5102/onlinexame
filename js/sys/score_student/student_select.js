/**
 * Created by Administrator on 2017/5/7.
 */
$(function () {
    $('#dg').datagrid({
        loadMsg: '玩命加载中 ~_~ ',
        url: '../../json/sys/score_student/student_select.json',
        method: 'get',
        title: '选择考生',
        iconCls: 'icon-student',
        fitColumns: true,
        width: '100%',
        /*onLoadSuccess:function () {
         window.editIndex = undefined;
         },*/
        singleSelect: true,
        selectOnCheck:true,
        checkOnSelect:true,
        pagination: true,
        idField:'s_id',
        toolbar: '#tb',
        /*onDblClickRow: onDblClick,*/
        rownumbers:'true',
        /*view: detailview,*/
        /*detailFormatter:function(index,row){
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
        },*/
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
    // console.log(search_msg);
}
/*提供搜索更新数据表格的展示*/
function search_dg(){
    $('#dg').datagrid('load',search_msg);
    console.log(search_msg);
}
/*提交选择的学生信息*/
function selectStudent() {
    var sel = $('#dg').datagrid('getSelected');
    if(sel){
        $('#form-hide').find("input[name='s_id']").val(sel.s_id);
        $('#form-hide').submit();
    }
}


