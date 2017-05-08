/**
 * Created by Administrator on 2017/4/28.
 */

/*初始化数据表格*/
$(function () {
    $('#dg').datagrid({
        loadMsg: '玩命加载中 ~_~ ',
        url: '../../json/sys/exist_paper/exist_paper.json',
        method: 'get',
        title: '已经定制的试题',
        iconCls: 'icon-save',
        fitColumns: true,
        width: '100%',
        onLoadSuccess:function () {
            window.editIndex = undefined;
        },
        singleSelect: true,
        pagination: true,
        remoteFilter: true,
        toolbar: '#tb',
        onDblClickRow: onDblClick,
        columns: [[
            {field: 'paper_id', title: 'ID', width: 10},
            {field: 'paper_name', title: '名称', width: 20, editor: {type: 'textbox'}},
            {field: 'begin_date', title: '开始时间', width: 20, editor: {type: 'datebox'}},
            {field: 'end_date', title: '结束时间', width: 20, editor: {type: 'datebox'}},
            {field: 'over_time', title: '答卷时间', width: 10, editor: {type: 'numberbox'}},
            {
                field: 'paper_category', title: '分类', width: 15, editor: {
                type: 'combobox', options: {
                    valueField: 'value',
                    textField: 'value',
                    url: '../../json/sys/exist_paper/paper_category.json'
                }
            }
            },
            {field: 'create_time', title: '创建时间', width: 20},
            {field: 'creater', title: '创建人', width: 15},
            {
                field: 'enable_dept', title: '可考部门', width: 20, editor: {
                type: 'combobox', options: {
                    valueField: 'value',
                    textField: 'value',
                    url: '../../json/sys/exist_paper/enable_dept.json'
                }
            }
            },
            {field: 'create_type', title: '组卷方式', width: 10},
            {field: 'paper_score', title: '总分', width: 10},
            {field: 'paper_desc', title: '描述', width: 40, editor: {type: 'textbox'}}
        ]]
    });
    /*初始化过滤器*/
    myfilter();
});
/*初始化过滤器，过滤器的源码经过修改，只是应用过滤器的样式*/
function myfilter() {
    $('#dg').datagrid(
        'enableFilter', [{
            field: 'end_date',
            /*editable:false,*/
            type: 'datetimebox'
        }, {
            field: 'begin_date',
            /*editable:false,*/
            type: 'datetimebox'
        }, {
            field: 'over_time', type: 'numberbox'
        }, {
            field: 'paper_category', type: 'combobox', options: {
                valueField: 'key',
                textField: 'value',
                url: '../../json/sys/exist_paper/paper_category.json'
            }
        }, {
            field: 'create_time', type: 'datebox'
        }, {
            field: 'creater', type: 'textbox'
        }, {
            field: 'enable_dept', type: 'combobox', options: {
                valueField: 'key',
                textField: 'value',
                url: '../../json/sys/exist_paper/enable_dept.json'
            }
        }, {
            field: 'create_type', type: 'combobox', options: {
                valueField: 'key',
                textField: 'value',
                url: '../../json/sys/exist_paper/create_type.json'
            }
        }, {
            field: 'paper_score', type: 'numberbox'
        }, {
            field: 'paper_desc', type: 'textbox'
        }]
    );
}

/*将下拉选择框的值，获取到后，保存到window上面，保存的键从URL中截取*/
var st = [
    '../../json/sys/exist_paper/create_type.json',
    '../../json/sys/exist_paper/enable_dept.json',
    '../../json/sys/exist_paper/paper_category.json'
];
for (var i = 0; i < st.length; i++) {
    setJson(st[i]);
}
function setJson(url) {
    var len = url.length;
    var mid = url.lastIndexOf('/') + 1;
    var key = url.substring(mid, len).split('.')[0];
    $.ajax({
        url: url,
        success: function (data, status, xhr) {
            window[key] = data;
        },
        dataType: 'json'
    });
}

/*更改时间的默认格式*/
$.fn.datebox.defaults.formatter = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '/' + m + '/' + d;
};
$.fn.datebox.defaults.parser = function (s) {
    var t = Date.parse(s);
    if (!isNaN(t)) {
        return new Date(t);
    } else {
        return new Date();
    }
};

/*获取搜索值进行验证，通过后重新加载数据*/
function go() {
    var fields = $('#dg').datagrid('getColumnFields');
    var obj = new Object();
    for (var i = 0; i < fields.length; i++) {
        var val = getValue(i);
        if (validate(fields[i], val)) {
            obj[fields[i]] = val;
        } else {
            return;
        }
    }
    obj = JSON.stringify(obj);
    $('#dg').datagrid('load', {
        msg: obj
    });
}
/*单纯的获取搜索框里面的值，根据不同的情况用不同的方式获取值*/
function getValue(index) {
    var res;
    var inputs = $('.datagrid-filter-row').eq(1).children().eq(index).find('input');
    if (inputs.length > 1) {
        res = inputs.eq(1).val();
    } else {
        res = inputs.val();
    }
    return res;
}
/*下拉框值的验证，键入的值不是下拉框提供的值，无效*/
function va(field, value) {
    var obj = window[field];
    var flag = true;//没有匹配到返回 true
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].value == value) {
            flag = false;
        }
    }
    return flag;
}
/*传递字段和值 判读当前的值是否合法 返回TRUE 和FALSE*/
function validate(field, value) {
    if (value != '') {
        var title = $('#dg').datagrid('getColumnOption', field).title;
        var msg = '输入有误！';
        var flag = false;
        var ary1 = ['ID', '答卷时间', '总分'];
        var ary2 = ['开始时间', '结束时间', '创建时间'];
        var ary3 = ['分类', '可考部门', '组卷方式'];
        var index;
        if ((index = ary1.indexOf(title)) != -1) {
            if (/\D/.test(value)) {
                flag = true;
            }
        } else if ((index = ary2.indexOf(title)) != -1) {
            if (/[^0-9/:\s]/.test(value)) {
                flag = true;
            }
        } else if ((index = ary3.indexOf(title)) != -1) {
            if (va(field, value)) {
                flag = true;
            }
        }
        if (flag) {
            msg = title + msg;
            $.messager.alert("温馨提示", msg, 'error');
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

/*确认用户是否真的要删除这个试题*/
function removeConfirm() {
    var sel = $('#dg').datagrid('getSelected');
    if (sel != null) {
        $.messager.confirm('温馨提示', '确定要删除试题？', function (r) {
            if (r) {
                removePaper(sel);
            }
        });
    }
}
/*删除相应ID 的试题，传递参数是选定的行*/
function removePaper(sel) {
    var id = sel.paper_id;
    $.get('../../json/sys/exist_paper/remove_paper.json', {id: id}, function (data) {
        if (data.msg == 'success') {
            $.messager.show({
                title: '温馨提示',
                msg: '删除数据成功！',
                timeout: 2000,
                showType: 'slide'
            });
            /*删除成功更新数据*/
            $('#dg').datagrid('reload');
        } else {
            $.messager.show({
                title: '温馨提示',
                msg: '删除数据失败！',
                timeout: 2000,
                showType: 'slide'
            });
        }
    }, 'json');
}
/*预览试题点击方法*/
function viewPaper() {
    // $().
    var flag = $('#dg').datagrid('getSelected');
    if( flag != null ){
        var hf = window.location.href;
        var next_hf = hf.substring(0,hf.lastIndexOf('/'));
        next_hf = next_hf.substring(0,next_hf.lastIndexOf('/')) + '/paper_view/rainbow.html';
        window.location.href = next_hf;
        console.log('view_paper');
    }

}

/*保存按钮触发事件*/
function save() {
    if (editIndex != undefined) {
        endEditing(editIndex);
    }
}
/*验证某行的更改值是否正确*/
function valRow(index) {
    var flag = true;
    var ary = ['begin_date', 'end_date', 'paper_category', 'enable_dept', 'over_time', 'paper_name'];
    for (var i = 0; i < ary.length; i++) {
        var vlaue;
        if (i <= 3) {
            value = $('#dg').datagrid('getEditor', {
                index: index,
                field: ary[i]
            }).target.next().find('input').eq(0).val()
        } else {
            value = $('#dg').datagrid('getEditor', {index: index, field: ary[i]}).target.val();
        }
        if (value != '') {
            if (!validate(ary[i], value)) {
                flag = false;
                break;
            }
        } else {
            var title = $('#dg').datagrid('getColumnOption', ary[i]).title;
            $.messager.alert("温馨提示", title + '不能为空');
            flag = false;
            break;
        }
    }

    return flag;
}
/*f负责将给定行的信息发送到后台，成功与否都会进行弹出窗提示*/
function getRes( index ) {
    var fields = $('#dg').datagrid('getColumnFields');
    var size = fields.length;
    var obj = new Object();
    for( var i=0;i<size;i++ ){
        var val = $('.datagrid-btable').children().children().eq(index).children().eq(i).find('div').text();
        obj[fields[i]] = val;
    }
    return JSON.stringify(obj);
}
function sendSave(index) {
    var res = getRes(index);
    $.get('../../json/sys/exist_paper/paper_update.json', {msg: res}, function (data) {
        if (data.msg == 'success') {
            $.messager.show({
                title: '温馨提示',
                msg: '更改数据成功！',
                timeout: 2000,
                showType: 'slide'
            });
        } else {
            $.messager.show({
                title: '温馨提示',
                msg: '更改数据失败！',
                timeout: 2000,
                showType: 'slide'
            });
        }
    }, 'json');
}

var editIndex = undefined;
/*某行验证无误后，退出编辑行的状态*/
function endEditing() {
    if (editIndex == undefined) {
        return true
    }
    if (valRow(editIndex)) {
        $('#dg').datagrid('endEdit', editIndex);
        //验证修改无误，向后台发送更新请求
        sendSave(editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
/*行的双击事件*/
function onDblClick(index, row) {
    if (editIndex != index) {
        if (endEditing()) {
            $('#dg').datagrid('selectRow', index)
                .datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#dg').datagrid('selectRow', editIndex);
        }
    }
}

