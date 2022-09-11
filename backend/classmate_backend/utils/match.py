from api.models import Courses, AppUsers, Contact
from django.forms.models import model_to_dict
import json
from typing import List

class Match:
    def __init__(self, uid, username, contact_info, contact_type, percentage) -> None:
        self.uid = uid
        self.username = username
        self.contact_info = contact_info
        self.contact_type = contact_type
        self.percentage = percentage
    
    def __str__(self) -> str:
        itemDict = {
            "uid": self.uid,
            "username": self.username,
            "contact_info": self.contact_info,
            "contact_type": self.contact_type,
            "percentage": self.percentage,
        }

        return json.dumps(itemDict)
    
    def __repr__(self) -> str:
        return str(self)

def match(ruid) -> List[Match]:
    # query the classes that the user takes
    userClassesAllSec = Courses.objects.filter(uid=ruid).values("course", "section")
    userClassesSecOnly = Courses.objects.filter(uid=ruid).values("course")
    allUsers = AppUsers.objects.all()

    returnList = list()
    for user in allUsers:
        commonClassesAllSec = Courses.objects.filter(uid=user).values("course", "section").intersection(userClassesAllSec)
        commonClassesCourseOnly = Courses.objects.filter(uid=user).exclude(course__in=commonClassesAllSec.values("course")).intersection(userClassesSecOnly)
        
        if (commonClassesAllSec.count() > 0 or commonClassesCourseOnly.count() > 0):
            percentage = ((commonClassesAllSec.count() * 2 + commonClassesCourseOnly.count()) / (userClassesAllSec.count() * 2)) * 100
            percentage = min(100, percentage)
            
            # Get user contact info
            contacts = model_to_dict(Contact.objects.get(uid=user))
            contact_info = contacts["contact_info"]
            contact_type = contacts["contact_type"]

            match = Match(uid=user.pk, username=user.username, contact_info=contact_info, contact_type=contact_type, percentage=percentage)
            returnList.append(match)

    return returnList
    