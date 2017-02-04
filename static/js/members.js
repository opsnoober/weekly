var $table=$("#memberstable");
var listapi = '/api/members/list';
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
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 600,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "userid",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            queryParamsType : "limit",   
            queryParams: function queryParams(params) {   //设置查询参数  
              var userid = $('#userid').text();
              var param = {    
                        userid:userid,
                        offset: params.offset, //起始
                        limit: params.limit,  //限制
                        order: params.order,  
                        sort: params.sort,
                    };    
                            return param;                   
                        },
            columns: [{
            //     checkbox: true
            // }, {
                field: 'user_id',
                title: 'id',
                visible: false,
                sortable: true,
            }, {
                field: 'username',
                title: '姓名',
                align: 'center',
                class: 'col-lg-2'
            }, {
                field: 'dailyreport',
                title: '周报',
                align: 'center',
                class: 'col-lg-2',
                formatter: dailyreportFormatter,
                events: 'operateEvents'
            }, ],
        });

function dailyreportFormatter(value, row, index) {
   var e='<a id="btndetail" type="button" class="btn btn-warning btn-xs">详情</a>';
   return e
};

window.operateEvents = {
    'click #btndetail': function (e, value, row, index) {
        var detail_url = "/members/menberreport/list?username="+row.username;
        window.location.href = detail_url;
        $('username').val = row.username;
    }
};

