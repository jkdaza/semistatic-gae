from google.appengine.ext import ndb

class EditableItem(ndb.Model):
    name = ndb.StringProperty()
    content = ndb.StringProperty(indexed=False)
    date = ndb.DateTimeProperty(auto_now_add=True)
    page_id = ndb.StringProperty()
