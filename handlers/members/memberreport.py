from handlers.base import BaseHandler
import tornado.web

class ListDailyReportHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        #user_id = self.get_secure_cookie('user')
        #user_id = self.current_user
        #username = self.current_user.username
        #self.render('dailyreport/dailyreport.html',user_id=user_id,username=username)
        username = self.get_argument('username')
        self.render('members/memberreport.html',username=username)

