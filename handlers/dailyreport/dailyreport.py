from handlers.base import BaseHandler
import tornado.web

class ListDailyReportHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        #user_id = self.get_secure_cookie('user')
        #user_id = self.current_user
        #username = self.current_user.username
        #self.render('dailyreport/dailyreport.html',user_id=user_id,username=username)
        self.render('dailyreport/dailyreport.html')

class AddDailyReportHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('dailyreport/add_dailyreport.html')

class EditDailyReportHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        work_id = self.get_argument("work_id")
        userid = int(self.current_user.id)
        # subject = self.get_argument("subject")        
        # content = self.get_argument("content")
        # status = self.get_argument("status",'wks')
        # man_hours = self.get_argument("man_hours","0")
        # createtime = self.get_argument("createtime")
        # work_detail = self.db.query('select * from works where userid = %s and work_id = %s',int(userid),int(work_id))[0]
        work_detail = self.db.query('select * from works where work_id = %s',int(work_id))[0]
        # work_detail = dict(
        #     work_id = work_id,
        #     userid = userid,
        #     subject = data.subject,     
        #     content = data.content,
        #     status = data.status,
        #     man_hours = data.man_hours,
        #     createtime = data.createtime,
        # )
        # if work:
        #     res = {
        #     'code': 0,
        #     'success': True,
        #     'data': w
        #     }
        self.render('dailyreport/edit_dailyreport.html',work_detail=work_detail)
        
class AboutHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('dailyreport/about.html')


