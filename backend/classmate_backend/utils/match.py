from api.models import Courses
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

def match(user) -> List[Match]:
    # query the classes that the user takes
    classes = Courses.objects.filter(uid = user)
    