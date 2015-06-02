#!/usr/bin/env python


__author__ = 'Dario Faniglione'

import webapp2
import json
import os
import jinja2
import logging
import urllib
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail
import models as m

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(
        [
        os.path.join(
          os.path.dirname(__file__), 'template'
        ),
        os.path.join(
          os.path.dirname(__file__), 'themes', os.environ['theme'], 'content'
        )
        ]
    ),
    extensions=['jinja2.ext.autoescape','jinja2.ext.with_'],
    autoescape=True)


class BaseHandler(webapp2.RequestHandler):
    
    def is_current_user_admin(self):
        result = False
        user = users.get_current_user()
        if user:
            result = users.is_current_user_admin()
        return result
        
class ContentHandler(BaseHandler):
    
    @webapp2.cached_property
    def global_vars(self):
        globals = {
                   'scripts': ['/js/plugins.js']
        }
        if self.is_current_user_admin():
            globals['scripts'].extend(['//cdn.ckeditor.com/4.4.7/standard/ckeditor.js',
                                       '/js/semistatic.js'
                                       ])
            globals['user_is_admin'] = True
        return globals
    
    def editable_vars(self,active_page):
        items = m.EditableItem.query(m.EditableItem.page_id==active_page).fetch()
        editables = {}
        for item in items:
            editables[item.name] = {
                        'name':item.name,
                        'content':item.content,
                        'key':item.key.urlsafe()
            }
        return editables
        

    @webapp2.cached_property
    def jinja2(self):
        # Returns a Jinja2 renderer cached in the app registry.
        return jinja2.get_jinja2(app=self.app)

    def render_response(self, _template, **context):
        # Renders a template and writes the result to the response.
        template = JINJA_ENVIRONMENT.get_template(_template)
        #Pass environment variable to Jinja
        for i in os.environ:
            template.globals[i] = os.environ[i]
        self.response.headers.add_header('X-UA-Compatible', 'IE=Edge,chrome=1')
        context['globals'] = self.global_vars
        self.response.write(template.render(context))

class AjaxRequestHandler(BaseHandler):

    def render_json(self, dataObject):
        def datetimeconvert(obj):
            """datetimeconvert JSON serializer."""

            import datetime

            if isinstance(obj, datetime.datetime):
                return obj.strftime("%Y/%m/%d %H:%M")

            return str(obj)

        self.response.headers.add_header('Content-Type', 'application/json')
        self.response.write(json.dumps(dataObject, default=datetimeconvert))

class AdminHandler(ContentHandler):
    def get(self):
        context = {}
        
        if self.is_current_user_admin():
            user = users.get_current_user()

            context['nickname'] = user.nickname()
            context['logout'] = users.create_logout_url('/')
            
        else:
            context['login'] = users.create_login_url('/')
                
        try:
            self.render_response('admin.html', **context)
        except Exception as e:
            logging.error(e)
            self.abort(404)

class LazyHandler(ContentHandler):

    def get(self, *args, **kwargs):
        name = args[0]
        if args[0] == '':
            name = os.environ['homepage']
        template_file = name + '.html'
        context = {'active_page':name}
        context['editables'] = self.editable_vars(name)
        try:
            self.render_response(template_file, **context)
        except Exception as e:
            logging.error(e)
            self.abort(404)



class EditableHandler(BaseHandler):

    def get(self, *args, **kwargs):
        context = {}
        items = m.EditableItem.query().fetch()
        
        printed = []
        context['editables'] = []
        for item in items:
            context['editables'].append(
                        {'name':item.name,'content':item.content,'key':item.key.urlsafe()})
            printed.append(item.name)
        
        for item in default_content.InitialContent:
            if 'name' in item and item['name'] not in printed:
                context['editables'].append(item)
        
        template_file = 'editor.html'
        context['active_page'] = 'editor'
        try:
            self.render_response(template_file, **context)
        except Exception as e:
            logging.error(e)
            self.abort(404)


class SaveHandler(AjaxRequestHandler):
    def post(self):
        responseObject = {'error':'Something went wrong'}
        auth = True
        
        if not self.is_current_user_admin():
            logging.error(str(users.get_current_user())+' attempted to make an edit!!')
            responseObject['error'] = 'You are not authorized to make changes on this site!'
            auth = False
        
        if auth:
            urlsafe = self.request.get('key')
    
            item = None
            sk = None
            
            if urlsafe is not None and urlsafe != '':
                key = ndb.Key(urlsafe=urlsafe)
                item = key.get()
            else:
                item_name = self.request.get('item_name')
                page_id = self.request.get('page_id')
                if item_name and page_id:
                    item = m.EditableItem(name=item_name,page_id=page_id)
                else:
                    responseObject['error'] = 'Element name and page id are required values!'
            
            if item is not None:
                item.content = self.request.get('content')
                sk = item.put()
            
            if sk is not None:
                responseObject['error'] = None
                responseObject['success'] = True
                responseObject['key'] = sk.urlsafe()
        self.render_json(responseObject)

class SendMessageHandler(AjaxRequestHandler):
    def post(self):
        responseObject = {'error':'Something went wrong'}
        
        name = self.request.get('name')
        email = self.request.get('email')
        message = self.request.get('message')
        
        if name and email and message:
            if mail.is_email_valid(email):
                mail.send_mail(os.environ['site_email_address_sender'], os.environ['site_email_address'], 
                               'Message from '+name, message+' \n Sent from '+email, reply_to=email)
                responseObject['error'] = False
                responseObject['message'] = 'Thank you for your email'
                
            else:
                responseObject['error'] = 'Please enter a valid email address'
        
        self.render_json(responseObject)


app = webapp2.WSGIApplication([
    #(r'/', LazyHandler),
    webapp2.Route(r'/editor', handler=EditableHandler),
    webapp2.Route(r'/saveitem', handler=SaveHandler),
    webapp2.Route(r'/admin', handler=AdminHandler),
    webapp2.Route(r'/send-message', handler=SendMessageHandler),
    webapp2.Route(r'/<:.*>', handler=LazyHandler),
])
