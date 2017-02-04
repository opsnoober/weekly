// $(function(){
//     var myDate = new Date();
//     var myYear = myDate.getFullYear();
//     var myMonth = myDate.getMonth() + 1;
//     var myDay = myDate.getDate();
//     // var getMonthWeek = function (a, b, c) {
//     //     var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
//     //     return Math.ceil((d + 6 - w) / 7
//     //                     );
//     var getYearWeek = function (a, b, c) {
//         var d1 = new Date(a, b-1, c), d2 = new Date(a, 0, 1),
//         d = Math.round((d1 - d2) / 86400000);
//         return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
//         };
//     var myWeek = getYearWeek(myYear,myMonth,myDay);
//     $('#year').html(myYear+'年');
//     // $('#date').html(myYear+'年'+'第'+myWeek+'周');
//     $('#week').html('第'+myWeek+'周');
// });

var $table=$("#dailytable");
var listapi = '/api/dailyreport/list';
		$table.bootstrapTable({
            url: listapi,
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
 		    pagination: true,                   //是否显示分页（*）
    		sortable: true,                     //是否启用排序
    		sortOrder: "desc",                   //排序方式
    		sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
    		pageNumber: 1,                       //初始化加载第一页，默认第一页
    		pageSize: 10,                       //每页的记录行数（*）
    		pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
    		search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    		strictSearch: true,
    		showColumns: true,                  //是否显示所有的列
            showFilter: true,                   //是否显示filter过滤器
    		showRefresh: true,                  //是否显示刷新按钮
    		minimumCountColumns: 2,             //最少允许的列数
    		clickToSelect: true,                //是否启用点击选中行
    		height: 600,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    		uniqueId: "daily_id",                     //每一行的唯一标识，一般为主键列
    		showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
    		cardView: false,                    //是否显示详细视图
    		detailView: false,                   //是否显示父子表
            queryParamsType : "limit",
            queryParams: function queryParams(params) {   //设置查询参数
                var userid = $('#userid').text();
                var starttime = $('#starttime').val();
                var status = $('#status').val();
                var param = {
    					userid:userid,
                        status:status,
                        starttime:starttime,
    					offset: params.offset, //起始
    					limit: params.limit,  //限制
    					order: params.order,  
    					sort: params.sort,
                        search: params.search,
              		};    
              			    return param;                   
            			},
  			columns: [{
  			    checkbox: true
  			}, {
  			    field: 'work_id',
  			    title: 'id',
            align: 'center',
  			    visible: false,
  			    sortable: true,
  			}, {
            field: 'subject',
            title: '主题',
            align: 'center',
        }, {
  			    field: 'content',
  			    title: '工作内容',
            align: 'center',
  			}, {
  			    field: 'status',
  			    title: '状态',
            align: 'center',
            //formatter: statusFormatter,
            editable: {
                type: 'select',
                title: '状态',
                source:[{value:"wks",text:"未开始"},{value:"jxz",text:"进行中"},{value:"ywc",text:"已完成"}]      
            },
  			}, {
  			    field: 'man_hours',
  			    title: '工时',
            align: 'center',
  			    editable: {
                type: 'text',
                title: '工时',      
            },
  			}, {
            field: 'createtime',
            title: '创建时间',
            align: 'center',
            sortable: true,
            }, {
  			    field: 'operation',
  			    title: '操作',
            class: 'col-lg-2',
            align: 'center',
            formatter: operateFormatter,
            events: 'operateEvents'
  			}, ],
            onEditableSave: function (field, row, oldValue, $el) {
                $table.bootstrapTable('resetView');
            // alert(row.work_id);
            // alert(oldValue);
            var editapi_url = "/api/dailyreport/edit";
                $.ajax({
                    url: editapi_url,
                    type: "post",
              // data: {
              //     "work_id":row.work_id,
              //     "subject":row.subject,
              //     "content":row.content,
              //     "status":row.status,
              //     "man_hours":row.man_hours,
              //     "createtime":row.createtime
              // },
                    data: row,
                    dataType: "json",
                    success: editCallback(row),
                });
            },

});

// function statusFormatter(value,row,index) {  
//             //通过判断单元格的值，来格式化单元格，返回的值即为格式化后包含的元素  
//               var text='';
//               var a='';
//               if(value == "wks"){
//                   var text = "未开始";
//                   var a = '<span class="text-info">'+text+'</span>';
//               }else if(value == "ywc"){
//                   var text = "已完成";
//                   var a = '<span class="text-success">'+text+'</span>';
//               }else if(value == "jxz"){
//                   var text = "进行中";
//                   var a = '<span class="text-warning">'+text+'</span>';
//               }else {
//                   var text = "未开始";
//                   var a = '<span class="text-info">'+text+'</span>';
//               };
//               return a;  
// };

function operateFormatter(value, row, index) {
   var e='<button id="btnEdit" type="button" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>修改</button>';
   var d='<button id="btnDel" type="button" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</button>';
   return e+' '+d;
    // return [
    //     '<div class="btn-group">',
    //     '<button id="btnEdit" type="button" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span>修改</button>',
    //     '<button id="btnDel" type="button" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</button>',
    //     '</div>',
    // ].join('');

};

function editCallback(row){

    //swal(row.work_id+' '+"修改成功");
    // $table.bootstrapTable('refresh')
};

function removeCallback(row){
    $table.bootstrapTable('remove', {
              field: 'work_id',
              values: [row.work_id],
    });
    swal('删除成功!','','success');
};


window.operateEvents = {
  // 'click .edit': function (e, value, row, index) {
  //     var edit_url = "/dailyreport/" + row.work_id + "/edit";
  //     $.ajax({
  //       url: edit_url,
  //       type: "get",
  //       data: {'work_id': row.work_id},
  //       dataType: "json",
  //       success: editCallback(row),
  //     });
  //   },
  'click #btnEdit': function (e,value,row,index) {
      var edit_url = "/dailyreport/edit?"+"work_id="+row.work_id
      window.location.href = edit_url;
      // $.ajax({
      //           url: edit_url,
      //           type: "get",
      //           data: {"work_id":row.work_id},
      //           dataType: "json",
      //           success: editCallback(row),

      //         });

  },
  'click #btnDel': function (e, value, row, index) {
      swal({
          title: '确认删除吗？',
          //text: '确认删除这条记录吗？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确认!',
          cancelButtonText: '取消',
        }).then(function(isConfirm) {
          if (isConfirm === true) {
            var remove_url = "/api/dailyreport/del";
            $.ajax({
                url: remove_url,
                type: "post",
                async: false,
                data: {'work_id': row.work_id},
                dataType: "json",
                success: removeCallback(row),

              });

          } else if (isConfirm === false) {
            swal(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            );
          
          } else {
            // Esc, close button or outside click
            // isConfirm is undefined
          }
        });

    }
 }; 

$(function() {
    $( ".datepicker" ).datepicker({
      dateFormat:'yy-mm-dd',
      buttonText:'选择日期',
    });

 });

$(function () {
    $('#search-btn').on('click',function () {
        var st = $('#status').val();
        // alert(st);
        $table.bootstrapTable('refresh');

    })

})




