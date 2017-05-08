/**
 * Created by Administrator on 2017/5/8.
 */
/*更改默认的时间格式*/
$.fn.datebox.defaults.formatter = function(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'/'+m+'/'+d;
};
$.fn.datebox.defaults.parser = function(s){
    var t = Date.parse(s);
    if (!isNaN(t)){
        return new Date(t);
    } else {
        return new Date();
    }
};
$(function () {
    $('#dg').datagrid({
        loadMsg: '玩命加载中 ~_~ ',
        url: '../../json/sys/score_paper/paper_select.json',
        method: 'get',
        title: '选择试题',
        iconCls: 'icon-result',
        fitColumns: true,
        width: '100%',
        /*onLoadSuccess:function () {
         window.editIndex = undefined;
         },*/
        singleSelect: true,
        selectOnCheck:true,
        checkOnSelect:true,
        pagination: true,
        idField:'id',
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
            {field:'id',title:'',hidden:'true'},
            {field: 'name', title: '试题', width: 15},
            {field: 'category', title: '分类', width: 10},
            {field: 'score', title: '总分', width: 10},
            {field: 'start_time', title: '开始时间', width: 15},
            {field: 'end_time', title: '结束时间', width: 15},
            {field: 'creater', title: '创建人', width: 10},
            {field: 'create_time', title: '创建时间', width: 15}
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
function selectPaper() {
    var sel = $('#dg').datagrid('getSelected');
    if(sel){
        $('#form-hide').find("input[name='paper_id']").val(sel.id);
        $('#form-hide').submit();
    }
}
