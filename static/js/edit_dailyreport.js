$("#submit").on('click',function(){
    var work_id=$.getUrlParam('work_id');
    //swal(work_id);
    var subject=$('#subject').val();
    var content=$('#content').val();
    var status=$('#status').val();
    var man_hours=$('#man_hours').val();
    var createtime=$('#createtime').val();
    if (subject&&content&&createtime) {
    $.ajax({
        url: "/api/dailyreport/edit",
        type: "post",
        data: {
            "work_id":work_id,
            "subject":subject,
            "content":content,
            "status":status,
            "man_hours":man_hours,
            "createtime":createtime
        },
        dataType: "json",
        success:function(res){
        //alert(res.code);
            if (res.code == 0){
                swal('','编辑成功','success');
                location.href='/dailyreport/list'; 
                        //window.location='/index'
                }else{
                    swal('','编辑失败','error');    
                    }
                }
            });
            }else{
                swal('','请补全表单','info')
            }
});

$(function() {
    var b = $("#s").text();
    $("#status").select2();
    $("#status").val(b).trigger('change');
});
