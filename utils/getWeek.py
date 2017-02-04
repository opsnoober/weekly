#coding:utf-8
import datetime
import time

#简单的测试一个字符串的MD5值
def getWeek(date):
    dateobj = datetime.datetime.strptime(date, '%Y-%m-%d')
    week = dateobj.strftime('%W')
    return week

def getCurrentWeek():
    currentWeek = time.strftime('%W')
    return  currentWeek