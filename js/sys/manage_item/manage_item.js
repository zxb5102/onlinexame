/**
 * Created by Administrator on 2016/12/10.
 */
var url = 'testoperation';

$(function(){
    $('#dg').datagrid({
        view: detailview,
        detailFormatter:function(index,row){
            return '<div class="ddv"></div>';
        },
        onExpandRow: function(index,row){
            var ddv = $(this).datagrid('getRowDetail',index).find('div.ddv');
            ddv.panel({
                border:false,
                cache:true,
                href:'detail.html?id='+row.id,
                onLoad:function(){
                    $('#dg').datagrid('fixDetailRowHeight',index);
                    /* $('#dg').datagrid('fixDetailRowHeight',index);
                     $('#dg').datagrid('selectRow',index);
                     $('#dg').datagrid('getRowDetail',index).find('form').form('load',row); */
                }
            });
            $('#dg').datagrid('fixDetailRowHeight',index);
        }
    });

});


/*格式化数据的方法*/
function format (value,row,index){
    // console.log(value);
/*    if(window.searchMsg==null|| (typeof searchMsg ==undefined)){
        searchMsg = new searchmsg('');
    }*/
    return obvious(searchMsg.value,value);
}
/*排序时间*/
function sortdate(a,b) {
    console.log('sortdate');
    return 1;
}

/*让搜索值明显*/
function obvious(reg_str,str){

    var reg = new RegExp(reg_str,"g");

    var reg_length = reg_str.length;
    var str_length = str.length;
    var point = [];
    var fragment = [];

    var length;//匹配到的字符个数
    if(str.match(reg)!=null){
        length = str.match(reg).length;
    }else{
        length = 0
    }




    for(var i=0;i<length;i++){
        var ary = reg.exec(str)
        point.push(ary.index);
    }
    for(var j=0;j<=point.length;j++){


        var start;
        var stop ;

        if(j==0){
            start = 0;
            stop = point[j];
        }else if(j==point.length){
            start = point[j-1]+reg_length;
            stop = str_length;
        }else{
            stop = point[j];
            start = point[j-1]+reg_length;
        }
        fragment.push(str.substring(start,stop));
    }

    var node = '';

    for(var k=0;k<fragment.length;k++){

        if(k==fragment.length-1){
            node += fragment[k];
        }else{
            node += fragment[k]+"<span style='color:red'>"+reg_str+"</span>";
        }
    }

    if(node==""){
        return str;
    }else{
        return node;
    }

}

/*用来覆盖时间的系统默认设置*/
function overridedate(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    console.log(date);
    return y+'-'+m+'-'+d;
}














