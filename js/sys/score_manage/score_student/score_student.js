/**
 * Created by Administrator on 2017/5/7.
 */
var search_msg = new Object();
$(function () {
    $('#dg').datagrid({
        loadMsg: '玩命加载中 ~_~ ',
        url: '../../../json/sys/score_student/score_student.json',
        method: 'get',
        title: '学生成绩查询',
        iconCls: 'icon-paper',
        fitColumns: true,
        width: '100%',
        /*onLoadSuccess:function () {
         window.editIndex = undefined;
         },*/
        singleSelect: true,
        selectOnCheck:false,
        checkOnSelect:false,
        pagination: true,
        idField:'id',
        toolbar: '#tb',
        /*onDblClickRow: onDblClick,*/
        rownumbers:'true',
        rowStyler: function(index,row){
            if (row.flag == 'true'){
                return 'background-color:#6293BB;color:#fff;'; // return inline style
                // the function can return predefined css class and inline style
                // return {class:'r1', style:{'color:#fff'}};
            }},
        /*view: detailview,*/
        /*detailFormatter:function(index,row){
         return '<div class="ddv"></div>';
         },
         onExpandRow: function(index,row){
         var ddv = $(this).datagrid('getRowDetail',index).find('div.ddv');
         ddv.panel({
         border:false,
         cache:false,
         href:'../../../sys/student_base/student_base2.html?index='+index,
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
            {field:'id',title:'学生考试标识',hidden:'true'},
            {field: 'paper_name', title: '试卷名', width: 15},
            {field: 'category', title: '分类', width: 15},
            {field: 'score', title: '分数', width: 10},
            {field: 'isPass', title: '及格', width: 10},
            {field: 'submit_time', title: '交卷时间', width: 15}
        ]]
    });
    $('#fm').form({
        onChange:function (tar) {
            var name = $($(tar).context).attr('textboxname');
            var value = $(tar).eq(0).textbox('getValue');
            search_msg[name] = value;
            // console.log(search_msg);
        }
    });
});
/*搜索框*/
function searchData() {
    $('#dg').datagrid('load',search_msg);
    console.log(search_msg);
}
/*删除数据*/
function deleteData() {
    var row = $('#dg').datagrid('getSelected');
    if(row){
        $.messager.confirm('确认删除', '确认要删除这条记录吗？', function(r){
            if (r){
                var id = row.id;
                $.ajax({
                    method:'get',
                    url:'../../../json/sys/score_student/delete_data.json',
                    dataType:'json',
                    data:{id:id},
                    success:function (data) {
                        if( data.flag == 'true'){
                            var index = $("#dg").datagrid('getRowIndex',row);
                            $("#dg").datagrid('deleteRow',index);
                        }else{
                            alert('删除记录失败，请联系管理员！');
                        }
                    },
                    error:function () {
                        alert('删除记录失败，请联系管理员！');
                    }
                });
            }
        });
    }
}
function downPDF() {
    var chs = $('#dg').datagrid('getChecked');
    if( chs.length > 0 ){
        var ids = '';
        $(chs).each(function (index,tar) {
            ids += tar.id + ',';
        });
        $.ajax({
            url:'../../../json/sys/score_student/downPDF.json',
            method:'get',
            dataType:'json',
            data:{ids:ids},
            success:function (data) {
                if( data.flag == 'true'){
                    var new_url = window.location.origin + '/' + window.location.pathname.split('/')[1] + data.url;
                    window.location.href = new_url;
                }else{
                    alert('生成考生试题的PDF文件失败，请联系管理员！');
                }
            },
            error:function () {
                alert('生成考生试题的PDF文件失败，请联系管理员！');
            }
        });
    }
}
