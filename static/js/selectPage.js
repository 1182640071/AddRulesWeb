/**
 * Created by wml on 2018/7/7.
 */

        function selectPages(totle , pageNow , id){
            var size = 10;
            var totlepage = 0;
            if(totle%size == 0){
                totlepage = totle/size;
            }else{
                totlepage = parseInt(totle/size) + 1;
            }
//            上一页
            var html = '<div  class="dataTables_paginate paging_simple_numbers" id="editable_paginate">';
            html = html + '<ul class="pagination">';

            if(totle <= size || pageNow<=1){
                html = html + '<li class="paginate_button previous disabled" id="editable_previous">';
                html = html + '<a href="#" aria-controls="editable" data-dt-idx="0" tabindex="0">Previous</a>';
            }else{
                html = html + '<li class="paginate_button" id="editable_previous">';
                s = pageNow-1;
                html = html + '<a href="#" onclick="selectSubmit('+ s +')" aria-controls="editable" data-dt-idx="0" tabindex="0">Previous</a>';
            }
            html = html + '</li>';


//            中间页数
            if(pageNow == 1){
                html = html + '<li class="paginate_button active">';
                html = html + '<a href="#" onclick="selectSubmit(1)" aria-controls="editable" data-dt-idx="2" tabindex="0">1</a>';
                html = html + '</li>';
            }else{
                html = html + '<li class="paginate_button ">';
                html = html + '<a href="#" onclick="selectSubmit(1)" aria-controls="editable" data-dt-idx="2" tabindex="0">1</a>';
                html = html + '</li>';
            }

            var index = 0;
            if(pageNow > 3){
                html = html + '<li class="paginate_button previous disabled">';
                html = html + '<a href="#" aria-controls="editable" data-dt-idx="0" tabindex="0">...</a>';
                html = html + '</li>';
                index = pageNow-2;
            }else{
                index = 2;
            }
            while(index <= pageNow && index <totlepage){
                if(index == pageNow){
                    html = html + '<li class="paginate_button active">';
                    html = html + '<a href="#" onclick="selectSubmit('+index+')" aria-controls="editable" data-dt-idx="2" tabindex="0">'+index+'</a>';
                    html = html + '</li>';
                }else{
                    html = html + '<li class="paginate_button ">';
                    html = html + '<a href="#" onclick="selectSubmit('+index+')" aria-controls="editable" data-dt-idx="2" tabindex="0">'+index+'</a>';
                    html = html + '</li>';
                }
                index = index +1;
            }
            //html = html + '<li class="paginate_button ">';
            //html = html + '<a href="#" onclick="selectSubmit('+pageNow+')" aria-controls="editable" data-dt-idx="2" tabindex="0">'+pageNow+'</a>';
            //html = html + '</li>';

            index = pageNow+1;

            while(index < pageNow+4 && index <= totlepage-1){
                html = html + '<li class="paginate_button ">';
                html = html + '<a href="#" onclick="selectSubmit('+index+')" aria-controls="editable" data-dt-idx="2" tabindex="0">'+index+'</a>';
                html = html + '</li>';
                index = index +1;
            }

            if(totlepage > pageNow + 3){
                html = html + '<li class="paginate_button previous disabled">';
                html = html + '<a href="#" aria-controls="editable" data-dt-idx="0" tabindex="0">...</a>';
                html = html + '</li>';
            }

            if(pageNow == totlepage){
                 html = html + '<li class="paginate_button active">';
                html = html + '<a href="#" onclick="selectSubmit('+totlepage+')" aria-controls="editable" data-dt-idx="2" tabindex="0">'+totlepage+'</a>';
                html = html + '</li>';
            }else{
                html = html + '<li class="paginate_button ">';
                html = html + '<a href="#" onclick="selectSubmit('+totlepage+')" aria-controls="editable" data-dt-idx="2" tabindex="0">'+totlepage+'</a>';
                html = html + '</li>';
            }

//            下一页
            if(pageNow*size >= totle || pageNow == totlepage){
                html = html + '<li class="paginate_button next disabled" id="editable_next">';
                html = html + '<a href="#" aria-controls="editable" data-dt-idx="7" tabindex="0">Next</a>';

            }else{
                html = html + '<li class="paginate_button next" id="editable_next">';
                s = pageNow+1;
                html = html + '<a href="#" onclick="selectSubmit('+s+')" aria-controls="editable" data-dt-idx="7" tabindex="0">Next</a>';
            }
            html = html + '</li>';

//            行级选择
//            html = html + '<li class="paginate_button" id="editable_next">';
//            html = html + '<select style="background-color:  #1ab394 ; color: white" aria-controls="editable" data-dt-idx="0" tabindex="0" name="statu" id="selectPortSize">';
//            html = html + '<option value={{ PortInformation.pageSize }} selected="selected">默认显示{{ PortInformation.pageSize }}行</option>';
//            html = html + '<option value=5 >调整显示5行</option>';
//            html = html + '<option value=6 >调整显示6行</option>';
//            html = html + '<option value=7 >调整显示7行</option>';
//            html = html + '<option value=8 >调整显示8行</option>';
//            html = html + '<option value=9 >调整显示9行</option>';
//            html = html + '<option value=10 >调整显示10行</option>';
//            html = html + '<option value=11 >调整显示11行</option>';
//            html = html + '<option value=12 >调整显示12行</option>';
//            html = html + '<option value=13 >调整显示13行</option>';
//            html = html + '<option value=14 >调整显示14行</option>';
//            html = html + '<option value=15 >调整显示15行</option>';
//            html = html + '<option value=16 >调整显示16行</option>';
//            html = html + '<option value=17 >调整显示17行</option>';
//            html = html + '<option value=18 >调整显示18行</option>';
//            html = html + '<option value=19 >调整显示19行</option>';
//            html = html + '<option value=20 >调整显示20行</option>';
//            html = html + '</select>';
//            html = html + '</li>';
//            html = html + '</ul>';
//            html = html + '</div>';

            $("#"+id).html(html);
        }