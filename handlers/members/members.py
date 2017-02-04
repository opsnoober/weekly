from handlers.base import BaseHandler
import tornado.web

class ListMembersHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('members/members.html')
