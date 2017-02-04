from handlers.base import BaseHandler
import tornado.web
from utils.CJsonEncoder import CJsonEncoder
from utils.getWeek import getWeek,getCurrentWeek
import json

class ListApiHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        userid = int(self.current_user.id)
        query_offset = int(self.get_argument('offset',0))
        query_limit = int(self.get_argument('limit',10))
        query_sort = self.get_argument('sort','work_id')
        query_order = self.get_argument('order','desc')
        query_search = self.get_argument('search', '')
        starttime = self.get_argument('starttime',0)
        status = self.get_argument('status','wks')
#        argument_data = dict(
#            userid = int(self.current_user.id),
#            offset = int(self.get_argument('offset',0)),
#            limit = int(self.get_argument('limit',10)),
#            sort = self.get_argument('sort','daily_id'),
#            order = self.get_argument('order','desc'),
#       )

        ###################cankao
        # mainSql = "SELECT * FROM soc_sdk_reinforce_list WHERE sdk_tactics_id>0 AND user_id = %s" % user_id
        # if quer_search:
        #     whereSql = " AND CONCAT_WS(sdk_old_name, sdk_status) LIKE '%%%%%s%%%%' " % quer_search
        #     mainSql += whereSql
        # if query_sort_name:
        #     orderBySql = " ORDER BY %s %s " % (query_sort_name, query_order)
        #     mainSql += orderBySql
        # limitSql = " LIMIT %s,%s;"
        # mainSql += limitSql
        # return self.db.query(mainSql, query_offset, query_limit)
        ######################
        mainSql = 'select * from works where userid = %s' %(userid)
        if starttime:
            startSql = " and createtime >= '%s'" %starttime
            mainSql += startSql
        if status:
            statusSql = " and status = '%s'" %status
            mainSql += statusSql
        if query_search:
            whereSql = " and concat(subject,content,status,createtime) like '%%%%%s%%%%'" %query_search
            mainSql += whereSql
        if query_sort:
            orderBySql = " order by %s %s" %(query_sort,query_order)
            mainSql += orderBySql
        if query_limit:
            limitSql = ' limit %s,%s'%(query_offset,query_limit)
            mainSql += limitSql
        # print mainSql
        works = self.db.query(mainSql)
        #works = self.db.query('select * from daily where userid = %s order by "%s" "%s" limit %s,%s',userid,sort,order,limit,offset)
        #works = self.db.query('select * from works where userid = %s order by %s %s limit %s,%s',userid,sort,order,offset,limit)
        #works = self.db.query('select * from works where userid = %s order by %s %s limit %s,%s', userid, query_sort, query_order,query_offset, query_limit)
        total = self.db.query('select count(*) as total from works where userid = %s',userid)[0]['total']
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
        
class AddApiHandler(BaseHandler):
    @tornado.web.authenticated
    def post(self):
        userid = int(self.current_user.id)
        content = self.get_argument("content")
        subject = self.get_argument("subject")
        createtime = self.get_argument("createtime")
        week = getWeek(createtime)
        argument_data={
                'userid':userid,
                'subject':subject,
                'content':content,
                'week':week,
                'createtime':createtime,
        }
        #print userid
        #sql = 'insert into works(userid,subject,content,createtime) values("%(userid)s","%(week)s","%(content)s","%(status)s","%(createtime)s")'
        #data=DB.execute(sql,argument_data)
        data=self.db.execute('insert into works(userid,subject,content,week,createtime) values(%s,%s,%s,%s,%s)',userid,subject,content,week,createtime)
        if data:
            code=0
            success=True
        else:
            code=1
            success=False
        res = {
                "code": code,
                "success":success,
        }
        response_json = json.dumps(res)
        self.write(response_json)        
        
class EditApiHandler(BaseHandler):
    @tornado.web.authenticated
    def post(self):
        work_id = self.get_argument("work_id")
        userid = int(self.current_user.id)
        subject = self.get_argument("subject")        
        content = self.get_argument("content")
        status = self.get_argument("status",'wks')
        man_hours = self.get_argument("man_hours","0")
        createtime = self.get_argument("createtime")
        argument_data={
                'work_id':work_id,
                'userid':userid,
                'subject':subject,
                'content':content,
                'status':status,
                'man_hours':man_hours,
                'createtime':createtime,
        }
        #for (k,v) in argument_data.items(): 
            #print v
        #sql = 'insert into works(userid,subject,content,createtime) values("%(userid)s","%(week)s","%(content)s","%(status)s","%(createtime)s")'
        #data=DB.execute(sql,argument_data)
        data=self.db.execute('update works set subject=%s,content=%s,status=%s,man_hours=%s,createtime=%s where work_id=%s and userid=%s',subject,content,status,man_hours,createtime,int(work_id),int(userid))
        if data == 0:
            code=0
            success=True
        else:
            code=1
            success=False
        res = {
                "code": code,
                "success":success,
        }
        response_json = json.dumps(res)
        self.write(response_json)  

class DelApiHandler(BaseHandler):
    @tornado.web.authenticated
    def post(self):
        work_id = self.get_argument("work_id")
#        userid = int(self.current_user.id)
        #sql = 'insert into works(userid,subject,content,createtime) values("%(userid)s","%(week)s","%(content)s","%(status)s","%(createtime)s")'
        #data=DB.execute(sql,argument_data)
        #print work_id
       # print userid
        #data=self.db.execute('delete from works where work_id="%s" and userid="%s"',work_id,userid)
        data=self.db.execute('delete from works where work_id=%s',int(work_id))
        #print data
        if data == 0:
            code=0
            success=True
        else:
            code=1
            success=False
        res = {
                "code": code,
                "success":success,
        }
        response_json = json.dumps(res)
        self.write(response_json) 
