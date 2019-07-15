    $(document).ready(function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
    });

$(document).ready(function(){

            $('#loading-example-btn').click(function () {
                btn = $(this);
                simpleLoad(btn, true);

                simpleLoad(btn, false);
            });
        });

        function simpleLoad(btn, state) {
            if (state) {
                btn.children().addClass('fa-spin');
                btn.contents().last().replaceWith(" Loading");
            } else {
                setTimeout(function () {
                    btn.children().removeClass('fa-spin');
                    btn.contents().last().replaceWith(" Refresh");
                }, 2000);
            }
        }

    var config = {
        '.chosen-select'           : {},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"95%"}
    };
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }


    function changeColorOver(node){
        node.style.color="white";
//        alert(node.style.color);
    }

    function changeColorOut(node){
        node.style.color="grey";
//        alert(node.style.color);
    }

    $("#rules_name").bind('input propertychange',function () {
        var content = $("#rules_name").val();
        var html = "- name: " + content + '_rules';
        $("#name_rules").html(html);
        var alerthtml = "&nbsp;&nbsp;- alert: " + content;
        $("#alert_rules").html(alerthtml);
    });


    $("#rules_expr").bind('input propertychange',function () {
        var content = $("#rules_expr").val();
        var html = "&nbsp;&nbsp;&nbsp;&nbsp;expr: " + content;
        $("#expr_rules").html(html);
    });


    $("#rules_time").bind('input propertychange',function () {
        var content = $("#rules_time").val();
        var html = "&nbsp;&nbsp;&nbsp;&nbsp;for: " + content;
        $("#time_rules").html(html);
    });

    $("#rules_desc").bind('input propertychange',function () {
        var content = $("#rules_desc").val();
        var html = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description: " + content;
        $("#desc_rules").html(html);
    });


    $("#rules_select").change(function(){
        var content=$("#rules_select").val();
        content = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;level: " + content;
        $("#select_rules").html(content);
    });


    $("#service_select").bind('input propertychange',function () {
        var content = $("#service_select").val();
        var html = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service: " + content;
        $("#select_services").html(html);
    });

    //$("#service_select").change(function(){
    //    var content=$("#service_select").val();
    //    content = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service: " + content;
    //    $("#select_services").html(content);
    //});


    $("#rules_select_item").change(function(){
        var content=$("#rules_select_item").val();
        content = $("#rules_expr").val() + content;
        $("#rules_expr").val(content);
    });


    function submit(){
        var name = $("#rules_name").val().trim();
        var expr = $("#rules_expr").val().trim();
        var _for = $("#rules_time").val().trim();
        var level = $("#rules_select").val().trim();
        var desc = $("#rules_desc").val().trim();
        var model = $("#rules_model").val().trim();
        var server = $("#service_select").val().trim();

        if(name == "" || expr == "" || _for == "" || level == "" || desc == "" || server ==""){
            alert("参数不能为空,请补全参数");
            return;
        }
        //alert(name + ' ' + expr + ' ' + _for + ' ' + level + ' ' + desc + ' ' + model);

        jQuery.ajax({
            type: "POST",
            url: "/prometheus/add",
            dataType: 'json',
            data : {
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
            }
        })
    }

    function refreshRule(){

        var x = confirm("是否确认刷新");
        if(x ==false){
            return;
        }
        jQuery.ajax({
            type: "POST",
            url: "/prometheus/refresh",
            async: false,
            error: function () {
                alert("操作失败,请稍等片刻重新尝试,如仍有问题请联系管理员......");
                return false;
            },
            success : function(result){
                alert(result);
            }
        })
    }