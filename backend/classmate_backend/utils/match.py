from api.models import Courses, AppUsers, Contact
from django.forms.models import model_to_dict
import json
from typing import List

class MatchPercentage:
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

def matchPercent(ruid) -> List[MatchPercentage]:
    # query the classes that the user takes
    userClassesAllSec = Courses.objects.filter(uid=ruid).values("course", "section")
    userClassesSecOnly = Courses.objects.filter(uid=ruid).values("course")
    allUsers = AppUsers.objects.all()

    returnList = list()
    for user in allUsers:
        commonClassesAllSec = Courses.objects.filter(uid=user).values("course", "section").intersection(userClassesAllSec)
        excludeCourses = set(commonClassesAllSec.values_list("course", flat=True))
        commonClassesCourseOnly = Courses.objects.filter(uid=user).values("course").exclude(course__in=excludeCourses).intersection(userClassesSecOnly)
        
        if (len(commonClassesAllSec) > 0 or len(commonClassesCourseOnly) > 0):
            percentage = ((len(commonClassesAllSec) * 2 + len(commonClassesCourseOnly)) / (len(userClassesAllSec) * 2)) * 100
            percentage = min(100, percentage)
            
            # Get user contact info
            contacts = model_to_dict(Contact.objects.get(uid=user))
            contact_info = contacts["contact_info"]
            contact_type = contacts["contact_type"]

            match = MatchPercentage(uid=str(user.pk), username=user.username, contact_info=contact_info, contact_type=contact_type, percentage=percentage)
            returnList.append(match)

    return returnList
    