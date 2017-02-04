from handlers.base import BaseHandler
import tornado.web

class ListPlansHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('plans/plans.html')