from handlers.base import BaseHandler
import tornado.web
from utils.CJsonEncoder import CJsonEncoder
import json

class ListApiHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        username = self.get_argument('username','')
        query_offset = int(self.get_argument('offset', 0))
        query_limit = int(self.get_argument('limit', 10))
        query_sort = self.get_argument('sort', 'work_id')
        query_order = self.get_argument('order', 'desc')
        query_search = self.get_argument('search', '')
        starttime = self.get_argument('starttime', 0)
        status = self.get_argument('status', 'wks')
#        argument_data = dict(
#            userid = int(self.current_user.id),
#            offset = int(self.get_argument('offset',0)),
#            limit = int(self.get_argument('limit',10)),
#            sort = self.get_argument('sort','daily_id'),
#            order = self.get_argument('order','desc'),
#       )
        #works = self.db.query('select * from daily where userid = %s order by "%s" "%s" limit %s,%s',userid,sort,order,limit,offset)
        if username:
            userid = self.db.query('select id from user where username = %s', username)[0]['id']
            print userid
            mainSql = 'select * from works where userid = %s' % (userid)
            if starttime:
                startSql = " and createtime >= '%s'" % starttime
                mainSql += startSql
            if status:
                statusSql = " and status = '%s'" % status
                mainSql += statusSql
            if query_search:
                whereSql = " and concat(subject,content,status,createtime) like '%%%%%s%%%%'" % query_search
                mainSql += whereSql
            if query_sort:
                orderBySql = " order by %s %s" % (query_sort, query_order)
                mainSql += orderBySql
            if query_limit:
                limitSql = ' limit %s,%s' % (query_offset, query_limit)
                mainSql += limitSql
            # print mainSql
            works = self.db.query(mainSql)
            total = self.db.query('select count(*) as total from works where userid = %s', userid)[0]['total']
        else:
            works = ''
            total = 0
        worklist = []
        for w in works:
            worklist.append(w)
        res = {
		'message': "success",
		'code': 0,
		'total': total,
		'rows': worklist,
	}
        self.set_header('Content-Type', 'application/json; charset=UTF-8')
        res_json = json.dumps(res,cls=CJsonEncoder)
        self.write(res_json)