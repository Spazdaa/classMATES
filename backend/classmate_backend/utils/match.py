from api.models import Courses
from api.models import AppUsers

def match(user) -> list:
    # query the classes that the user takes
    classes = Courses.objects.filter(uid = user)

    


