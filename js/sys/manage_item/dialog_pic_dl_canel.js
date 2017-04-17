/**
 * Created by Administrator on 2016/12/12.
 */
/*删除图片*/
function picdel() {
    $(this).parent().next('div').children('img').hide(200);
    // $(this).siblings('input').val('del');
    $(this).parent().children('input').eq(0).val('true');
}
/*撤销删除*/
function picrec() {
    $(this).parent().next('div').children('img').show(200);
    // $(this).siblings('input').val('canel');
    $(this).parent().children('input').eq(0).val('false');
}