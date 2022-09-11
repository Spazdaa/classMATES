from api.models import Courses, AppUsers, Contact
from django.forms.models import model_to_dict
import json
from typing import List
from utils.icalendarparser import Class

class MatchPercentage:
    def __init__(self, uid: str, username: str, contact_info: str, contact_type: str, percentage: str) -> None:
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

class MatchClasses:
    def __init__(self, uid: str, username: str, contact_info: str, contact_type: str) -> None:
        self.uid = uid
        self.username = username
        self.contact_info = contact_info
        self.contact_type = contact_type
        self.matchesAllSec = list()
        self.matchesCourseOnly = list()

    def add_class_all_sec_match(self, course: str, section: str) -> None:
        newClass = {
            "course": course,
            "section": section
        }

        self.matchesAllSec.append(newClass)
    
    def add_class_course_only(self, course: str) -> None:
        newClass = {
            "course": course
        }

        self.matchesCourseOnly.append(newClass)
    
    def to_dict(self) -> dict:
        output = {
            "username": self.username,
            "contact_info": self.contact_info,
            "contact_type": self.contact_type,
            "matched_classes_all_section": self.matchesAllSec,
            "matched_classes_course_only": self.matchesCourseOnly
        }

        return output
        
    def __str__(self) -> str:
        return json.dumps(self.to_dict())

    def __repr__(self) -> str:
        return str(self)

def matchPercent(ruid) -> List[MatchPercentage]:
    # query the classes that the user takes
    userClassesAllSec = Courses.objects.filter(uid=ruid).values("course", "section")
    userClassesCorOnly = Courses.objects.filter(uid=ruid).values("course")
    allUsers = AppUsers.objects.all()

    returnList = list()
    for user in allUsers:
        commonClassesAllSec = Courses.objects.filter(uid=user).values("course", "section").intersection(userClassesAllSec)
        excludeCourses = set(commonClassesAllSec.values_list("course", flat=True))
        commonClassesCourseOnly = Courses.objects.filter(uid=user).values("course").exclude(course__in=excludeCourses).intersection(userClassesCorOnly)
        
        if (len(commonClassesAllSec) > 0 or len(commonClassesCourseOnly) > 0):
            percentage = ((len(commonClassesAllSec) * 2 + len(commonClassesCourseOnly)) / (len(userClassesAllSec) * 2)) * 100
            percentage = min(100, percentage)
            
            # Get user contact info
            contacts = model_to_dict(Contact.objects.get(uid=user))
            contact_info = contacts["contact_info"]
            contact_type = contacts["contact_type"]

            match = MatchPercentage(uid=str(user.pk), username=user.username, contact_info=contact_info, contact_type=contact_type, percentage=str(percentage))
            returnList.append(match)

    return returnList

def matchClasses(requester_id, user_id) -> MatchClasses:
    # query the classes that the user takes
    userClassesAllSec = Courses.objects.filter(uid=requester_id).values("course", "section")
    userClassesCorOnly = Courses.objects.filter(uid=requester_id).values("course")

    commonClassesAllSec = Courses.objects.filter(uid=user_id).values("course", "section").intersection(userClassesAllSec)
    excludeCourses = set(commonClassesAllSec.values_list("course", flat=True))
    commonClassesCourseOnly = Courses.objects.filter(uid=user_id).values("course").exclude(course__in=excludeCourses).intersection(userClassesCorOnly)
    
    username = AppUsers.objects.get(uid=requester_id).username

    try:
        contacts = Contact.objects.get(uid=requester_id)
        mc = MatchClasses(uid=str(requester_id), username=username, contact_info=contacts.contact_info, contact_type=contacts.contact_type)
    except:
        mc = MatchClasses(uid=str(requester_id), username=username, contact_info="None", contact_type="None")

    for c in commonClassesAllSec:
        mc.add_class_all_sec_match(course=c["course"], section=c["section"])

    for c in commonClassesCourseOnly:
        mc.add_class_course_only(course=c["course"])

    return mc
