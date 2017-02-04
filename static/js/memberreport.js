 var $table=$("#memberreporttable");
    var listapi = '/api/members/memberreport/list';
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
                // var username = $('#username').val();
                var username = $('#user').text();
                var starttime = $('#starttime').val();
                var status = $('#status').val();
                var param = {
    					username:username,
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
                formatter: statusFormatter,
  			}, {
  			    field: 'man_hours',
  			    title: '工时',
                align: 'center',
  			}, {
                field: 'createtime',
                title: '创建时间',
                align: 'center',
                sortable: true,
  			}, ],
});
function statusFormatter(value,row,index) {
            //通过判断单元格的值，来格式化单元格，返回的值即为格式化后包含的元素
              var text='';
              var a='';
              if(value == "wks"){
                  var text = "未开始";
                  var a = '<span class="text-info">'+text+'</span>';
              }else if(value == "ywc"){
                  var text = "已完成";
                  var a = '<span class="text-success">'+text+'</span>';
              }else if(value == "jxz"){
                  var text = "进行中";
                  var a = '<span class="text-warning">'+text+'</span>';
              }else {
                  var text = "未开始";
                  var a = '<span class="text-info">'+text+'</span>';
              };
              return a;
};

$(function() {
    $( ".datepicker" ).datepicker({
      dateFormat:'yy-mm-dd',
      buttonText:'选择日期',
    });

 });

$(function () {
    $('#search-btn').on('click',function () {
        var username = $('#username').val();
        var status = $('#status').val();
        var starttime = $('#starttime').val();
        $( "#user" ).html(username);
        $table.bootstrapTable('refresh');

    })

})