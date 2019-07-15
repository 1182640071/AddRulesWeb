/**
 * Created by wml on 2019/1/2.
 */


//加载数据,包括监控组
jQuery.ajax({
    type: "POST",
    url: "/prometheus/GetInfo",
    dataType: 'json',
    async: false,
    error: function () {
        alert("操作失败,请稍等片刻重新尝试,如仍有问题请联系管理员......");
        return false;
    },
    success : function(result){
        for(item in result.servers){
            //alert(result.servers[item]);
            $("#service_select").append('<option style="text-align: center" value="'+ result.servers[item] +'">'+result.servers[item]+'</option>');
        }
        var html = '';
        for (item in result.alerm){
            //alert(result.alerm[item]);
            //html = html + '<option style="text-align: center" value="'+ result.alerm[item] +'">'+result.alerm[item]+'</option>';

            $("#rules_select").append('<option style="text-align: center" value="'+ result.alerm[item] +'">'+result.alerm[item]+'</option>');
        }
        //$("#list_select_rules").html(html);
    }
});