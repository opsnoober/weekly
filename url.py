#!/usr/bin/env python
# coding=utf-8
"""
the url structure of website
"""
import sys #utf-8，兼容汉字
reload(sys)
sys.setdefaultencoding("utf-8")
from handlers import base
from handlers import auth
from handlers.api import authapi
from handlers.dailyreport import dailyreport
from handlers.api import dailyreportapi

from handlers.members import memberreport
from handlers.members import members
from handlers.api import membersapi
from handlers.api import memberreportapi

from handlers.plans import plans

urls = [
    (r'/login',auth.LoginHandler),
    (r'/logout',auth.LogoutHandler),
    (r'/index',base.IndexHandler),
    (r'/about',dailyreport.AboutHandler),
    (r'/dailyreport/list',dailyreport.ListDailyReportHandler),
    (r'/dailyreport/add',dailyreport.AddDailyReportHandler),
    (r'/dailyreport/edit',dailyreport.EditDailyReportHandler),
    (r'/api/dailyreport/list',dailyreportapi.ListApiHandler),
    (r'/api/dailyreport/add',dailyreportapi.AddApiHandler),
    (r'/api/dailyreport/edit',dailyreportapi.EditApiHandler),
    (r'/api/dailyreport/del',dailyreportapi.DelApiHandler),             
    (r'/api/auth/checklogin',authapi.CheckLoginApiHandler),

    (r'/members/list',members.ListMembersHandler),
    (r'/members/menberreport/list',memberreport.ListDailyReportHandler),
    (r'/api/members/list',membersapi.ListApiHandler),
    (r'/api/members/memberreport/list',memberreportapi.ListApiHandler),

    # (r'/plans/list',plans.ListPlansHandler),
]

