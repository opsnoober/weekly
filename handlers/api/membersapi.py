#-*-coding:utf8-*-
from handlers.base import BaseHandler
import tornado.web
from utils.CJsonEncoder import CJsonEncoder
import json

class ListApiHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        # userid=1
        userid = int(self.current_user.id)
        # offset = int(self.get_argument('offset',0))
        # limit = int(self.get_argument('limit',10))
        # sort = self.get_argument('sort','work_id')
        # order = self.get_argument('order','desc')
#        argument_data = dict(
#            userid = int(self.current_user.id),
#            offset = int(self.get_argument('offset',0)),
#            limit = int(self.get_argument('limit',10)),
#            sort = self.get_argument('sort','daily_id'),
#            order = self.get_argument('order','desc'),
#       )
        #works = self.db.query('select * from daily where userid = %s order by "%s" "%s" limit %s,%s',userid,sort,order,limit,offset)
        g = self.db.query('select * from groups where group_admin_id=%s',userid)
        if g:
            groupinfo = g[0]
        # group_name = groupinfo.group_name
            group_id = groupinfo.group_id
            members_id = self.db.query('select user_id from usergroup where group_id=%s',group_id)
            memberlist = []
            total = len(members_id)
            for i in range(total):
                mid = members_id[i].user_id
                members = self.db.query('select id,username from user where id = %s',mid)[0]
                memberlist.append(members)
        else:
            memberlist = []
            total = 0
        res = {
		'message': "success",
		'code': 0,
		'total': total,
		'rows': memberlist,
	}
        self.set_header('Content-Type', 'application/json; charset=UTF-8')
        res_json = json.dumps(res,cls=CJsonEncoder)
        self.write(res_json)