[Semistatic GAE](http://semistatic-gae.appspot.com) [![Build Status](https://secure.travis-ci.org/coto/gae-boilerplate.png)](http://travis-ci.org/coto/gae-boilerplate)
==============================

Semistatic GAE lets you create a simple website to be hosted (often for free) on Google App Engine. 
No Python or Google App Engine knowledge is required, as all the backend stuff has been already setup.
Semistatic GAE is template driven, and frontend developers can easily create site pages and editable content by exploting the power of the [Jinja2](http://jinja.pocoo.org/) templates. 
Semistatic GAE has been inspired by the amazing work on the [Google App Engine Boilerplate](http://appengine.beecoss.com), which is better suited for medium/large web project, where multi-user and community elements are needed.

[Try a online demo](http://semistatic-gae.appspot.com)
NB: For demo purposes, the above demo gives editorial rights to all users, while the standard version allows only Admins to edit content.

Semistatic GAE User Cases
------------------------------------
Semistatic GAE would be an ideal tool for web designers and front-end developers, when building a website with a farily defined number of pages.
Page templates are designed in HTML, CSS and JS, with the addition of Jinja2 (a designer-friendly templating language) if required.
No server coding skills or previous Python knowledge is required. Although, familiarizing with [Jinja2](http://jinja.pocoo.org/) documnetation will allow for greater flexibility and outstanding results.

Is that is?
Well no. Semistatic GAE has a simple HTML editor built-in, which allows all Admin to edit block of content (text, HTML, images and galleries) that the designer has allowed editorial rights to.
Admin roles can be managed using the GAE Developers Console, as Semistatic GAE leverages the GAE permission and role managemnt. Read more [here](https://cloud.google.com/appengine/docs/adminconsole/roles).

Semistatic GAE is NOT a fully featured Content Managemnt System, so you will not be able to add pages using the GUI.



Get started in just a few easy steps
------------------------------------

New to Google App Engine? Learn about it by watching [this video](http://www.youtube.com/watch?v=bfgO-LXGpTM) of @bslatkin or reading [the official documentation](https://developers.google.com/appengine/).

1. Download the last version of the [App Engine SDK](http://code.google.com/appengine/downloads.html#Google_App_Engine_SDK_for_Python) for Linux, Mac OS or Windows.
1. Download or clone the code of this project ([here](https://github.com/jkdaza/semistatic-gae/zipball/master))
1. Run locally ([instructions](https://developers.google.com/appengine/docs/python/tools/devserver)).
1. Set your 'application' name and other custom variables in [app.yaml](https://github.com/jkdaza/semistatic-gae/blob/master/app.yaml)
1. Set Authentication Options dropdown to Google in the Google App Engine control panel
1. Deploy it online ([instructions](https://developers.google.com/appengine/docs/python/gettingstarted/uploading) - recommended setup: python 2.7, high replication datastore)

Please note that your custom theme(s) and content shall be located in the /themes folder.
In this way, the Semistatic GAE code is separate from your application code, avoiding conflicts and allowing to keep up with this project changes.

A new themes can be created by cloning and renaming the default theme folder (/themes/default).
Mastering the [Jinja2 Template Design documentation](http://jinja.pocoo.org/docs/) will aloow you exploiting the numerous advantages of this amazing tool.

Functions and features:
-----------------------
+ Easy page creation from template file (lazy routing)
+ Simple editing of content blocks 
+ Contact Form
+ Responsive Design for viewing on PCs, tablets, and mobile phones (synchronized with Twitter-Bootstrap project)
+ Error handling


Open Source
-----------
If you want to add, fix or improve anythig here, create an [issue](https://github.com/jkdaza/semistatic-gae/issues) or send a [Pull Request](https://github.com/jkdaza/semistatic-gae/pull/new/master).

