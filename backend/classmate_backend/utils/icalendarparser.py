from typing import List
from icalendar import Calendar

class Class:
    """
        This class represents a Class in the schedule, it contains its:
            Course (e.g. STAT 266, CMPUT 401)
            Section (e.g. LEC A1, SEM F1)
        To create: Pass in the course name summary (e.g. CMPUT 401 LEC A1)
        To access: Call the getters (e.g. get_subject)
    """

    def __init__(self, summary: str) -> None:
        """
            Initialize a new instance of Class object
            Input: 
                summary: The course name summary (e.g. CMPUT 401 LEC A1)
        """
        self.__summary = summary.strip()
        self.__parse()
    
    def __parse(self) -> None:
        parsed = self.__summary.split(" ", maxsplit=2)
        self.__course = parsed[0] + " " + parsed[1]
        self.__section = parsed[2]
    
    def get_course(self) -> str:
        """
            Gets the course number
            Output: The course number (e.g. STAT 266)
        """
        return self.__course
    
    def get_section(self) -> str:
        """
            Gets the section of the class
            Output: The course section (e.g. LEC A1)
        """
        return self.__section

    def __str__(self) -> str:
        return self.__summary
    
    def __repr__(self) -> str:
        return str(self)

def parseCalendar(ics: str) -> List[Class]:
    summaries = set()

    calendar: Calendar = Calendar.from_ical(ics)
    for component in calendar.walk():
        if component.name == "VEVENT":
            summary = str(component.get("SUMMARY")).strip()
            summaries.add(summary)
    
    classes = list()
    for s in summaries:
        c = Class(summary=s)
        classes.append(c)

    return classes

if __name__ == '__main__':
    g = open('test.ics', 'r').read()
    print(parseCalendar(g))
