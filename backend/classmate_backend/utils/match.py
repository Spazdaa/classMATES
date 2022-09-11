from api.models import Courses
from api.models import AppUsers

def match(uid) -> list:
    # query the classes that the user takes
    classes = Courses.objects.filter(uid = uid)

    


