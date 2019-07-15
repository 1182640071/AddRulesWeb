$("#list_select_rules").change(function(){
    var content=$("#list_select_rules").val();
    jQuery.ajax({
        type: "POST",
        url: "/prometheus/getRulesDetail",
        dataType: 'json',
        data : {
            "name": content
        },
        async: false,
        error: function () {
            alert("操作失败,请稍等片刻重新尝试,如仍有问题请联系管理员......");
            return false;
        },
        success : function(result){
            //{'name': '', 'alert': '', 'expr': '', '_for': '', 'level': '', 'summary': '', 'description': ''}

            $("#name_rules").html("- name: " + result.alert + '_rules');
            $("#alert_rules").html("&nbsp;&nbsp;- alert: " + result.alert);
            $("#rules_name").val(result.alert);


            $("#expr_rules").html("&nbsp;&nbsp;&nbsp;&nbsp;expr: " + result.expr);
            $("#rules_expr").val(result.expr);

            $("#time_rules").html("&nbsp;&nbsp;&nbsp;&nbsp;for: " + result._for);
            $("#rules_time").val(result._for);

            $("#desc_rules").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description: " + result.description);
            $("#rules_desc").val(result.description);

            $("#select_services").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service: " + result.service);
            var se = $('#service_select').val(result.service);
            se.attr('selected',true);

            $("#select_rules").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;level: " + result.level);
            var add = $('#rules_select').val(result.level);
            add.attr('selected',true);
        }
    })
});

    function update(){
        var label = $("#list_select_rules").val();
        var name = $("#rules_name").val().trim();
        var expr = $("#rules_expr").val().trim();
        var _for = $("#rules_time").val().trim();
        var level = $("#rules_select").val().trim();
        var desc = $("#rules_desc").val().trim();
        var model = $("#rules_model").val().trim();
        var server = $("#service_select").val().trim();

        if(name == "" || expr == "" || _for == "" || level == "" || desc == "" || server == ""){
            alert("参数不能为空,请补全参数");
            return;
        }
        //alert(name + ' ' + expr + ' ' + _for + ' ' + level + ' ' + desc + ' ' + model);

        jQuery.ajax({
            type: "POST",
            url: "/prometheus/update",
            dataType: 'json',
            data : {
                "_name": label,
                "name": name,
                "expr": expr,
                "_for": _for,
                "level": level,
                "desc": desc,
                "model": model,
                "service": server
            },
            async: false,
            error: function () {
                alert("操作失败,请稍等片刻重新尝试,如仍有问题请联系管理员......");
                return false;
            },
            success : function(result){
                alert(result);
                window.location.reload();
            }
        })
    }