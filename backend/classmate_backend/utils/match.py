from api.models import Courses
from api.models import AppUsers

def match(id):
    #query the matching class
    classes = Courses.objects.filter(uid = id)
    #query corresponding users
    t2_match = Courses.objects.filter(courses=classes.course())
    t2_match = Courses.objects.exclude(uid=id)
    #query the matching sections
    t2_match_users = AppUsers.filter(uid = t1_match.uid)

    #query to get matching setions
    t1_match = t2_match.filter(section = classes.section)
    #query the matching sections
    t1_match_users = AppUsers.filter(uid = t1_match.uid)
    t2_match_users = t2_match.filter(t1_match_users)
    return t1_match_users,t2_match_users
    


