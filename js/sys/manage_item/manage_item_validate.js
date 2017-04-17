/**
 * Created by Administrator on 2016/12/12.
 */
/*不能够出现非数字，并且第一个不能是0*/
function validate_num(num){

    if(num!=""){
        var reg = /(^[1-9](\d*)$)/;
        return reg.test(num);
    }else{
        return true;
    }

}

searchMsg = new searchmsg('');
/*日期格式2017-1-1，并且要2000年以后月份和日期都做了限制，后台还需要验证*/
function validate_date(date){

    if(date!=""){
        var reg = /2[0-9]{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))/;
        return reg.test(date);
    }else{
        return true;
    }
}


/*搜索条件是否合法的js*/
function doSearch(){

    var msg = "";

    if( validate_num( $("#id").val() ) ){
        if( ! validate_date( $("#start_date + span :last").val() ) ){
            msg = "输入的起始日期不正确";
        }else{
            if(! validate_date( $("#end_date + span :last").val() ) ){
                msg = "输入的结束日期不正确";
            }
        }
    }else{
        msg = "输入的编号不合法";
    };

    console.log(msg);
    console.log(msg!="");
    if(msg != ""){

        var vmsg = $("#vmsg");
        vmsg.text(msg);
        console.log(vmsg.text());

        vmsg.dialog('open');
    }else{
        /*获取搜索框的关键字*/
        var str = $('#test_key').val();
        searchMsg = new searchmsg(str);

        $('#dg').datagrid('load',{
            type: $('#type').val(),
            id:$("#id").val(),
            start_date:$("#start_date + span :last").val(),
            end_date:$("#end_date + span :last").val(),
            source:$("#source").val(),
            type:$("#type").val(),
            key:$("#test_key").val()

        });
    }
}


function searchmsg(value) {
    this.value = value;
}