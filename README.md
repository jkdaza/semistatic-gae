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


Technologies used
-----------------
+ Python 2.7.5
+ [NDB 1.0.10](http://developers.google.com/appengine/docs/python/ndb/) (The best datastore API for the Google App Engine Python runtime).
+ [Jinja2 2.6](http://jinja.pocoo.org/docs/) (A fully featured template engine for Python).
+ [WTForms-1.0.2](http://wtforms.simplecodes.com/) (Forms validation framework keeping user interaction secure and flexible with or without javascript).
+ [Babel-0.9.6](http://babel.edgewall.org/) and [gaepytz-2011h](http://code.google.com/p/gae-pytz/) (Industy standard internationalization renders the site in multiple languages).
+ [webapp2 2.5.2](http://webapp-improved.appspot.com/) (A lightweight Python web framework, the most compatible with Google App Engine).
    + webapp2_extras.sessions
    + webapp2_extras.routes
    + webapp2_extras.auth
    + webapp2_extras.i18n
+ Code written following the [Google Python Style Guide](http://google-styleguide.googlecode.com/svn/trunk/pyguide.html)
+ Unit testing with [unittest](http://docs.python.org/library/unittest.html), [webtest](http://webtest.pythonpaste.org/en/latest/index.html), [pyquery](http://packages.python.org/pyquery/)
+ OpenID library provided by Google App Engine
+ OAuth2 for federated login providers that do not support OpenID


Working with Internationalization (i18n)
----------------------------------------
This boilerplate comes bundled with babel, pytz, and automatic language detection which together provide powerful internationalization capability.
Text to be translated needs to be indicated in code and then translated by users like you after which it is compiled for speed.

Adding or updating text to be translated or adding new languages requires more work as indicated in the steps below:

1. Text to be translated should be enclosed in `_("text to translate")` in *.py files.
   + `{{..._("text to translate")...}}`
   + `{%..._("text to translate")...%}`
1. In html templates translated text is indicated by:
   + `{% trans %}text to translate{% endtrans %}`
   
   **NOTE:** Translations can be added to other types of files too.  See [babel.cfg](https://github.com/coto/gae-boilerplate/blob/master/locale/babel.cfg)
   and [babel.cfg documentation](http://babel.edgewall.org/wiki/Documentation/0.9/messages.html)
1. Obtain pybabel to perform the steps below.  You will need to install and compile [jinja2](http://jinja.pocoo.org/docs/) and [babel](http://babel.edgewall.org/wiki/Download).
   Note that you may need to first install [setuptools and easy_install](http://pypi.python.org/pypi/setuptools).
   pybabel.exe can be run from the Scripts directory in your python installation.
   * `easy_install jinja2 babel`
1. Babel then needs to find all translationed text blocks throughout code and templates.
   After installing pybabl run this command to extract messages (assuming ./ is the location of this boilerplate):
   <tt>pybabel extract -F ./locale/babel.cfg -o ./locale/messages.pot ./ --sort-output --no-location --omit-header</tt>
1. Update translations of existing languages or add new languages
   1. Update translations of existing languages by running this command for each locale:
      <tt>pybabel update -l es_ES -d ./locale -i ./locale/messages.pot --previous --ignore-obsolete</tt>
      Run this command for each locale by replacing es_ES in the command.  Locale names are the directory names in ./locale.
   1. Add new languages
      Run this command for each new language to add.  You will need to replace es_ES in the command with the locale code to add:
      <tt>pybabel init -l es_ES -d ./locale -i ./locale/messages.pot</tt>
      Add the locale to the locales array in [config.py](https://github.com/coto/gae-boilerplate/blob/master/boilerplate/config.py).  Instructions on how to pick a locale code are provided in the comments above the array.
1. Provide translations for each language
   In each locale/<locale code>/LC_MESSAGES directory there is a file messages.po.  Users translate the strings in these files.
   msgid is the text in English.  msgstr is the translation to the language indicated by the locale code.  For example:
   + `msgid "Change your password"`
   + `msgstr "Cambiar tu contrase��a"`
1. Compile translations
   Run: <tt>pybabel compile -f -d ./locale</tt>

See [webapp2's tutorial](http://webapp-improved.appspot.com/tutorials/i18n.html) and [pybabel's docs](http://babel.edgewall.org/wiki/Documentation/cmdline.html) for more details.

**Disabling i18n**
i18n can be disabled and language options hidden.  Set locales in config.py to None or empty array [] to do this.  This may be useful to provide a performance boost or simplify sites that serve a market with only one language.
The locale directory can be safely removed to save space if not needed but the babel and pytz directories cannot be removed without breaking code (imports and trans statements) at this time.

Security
--------
**SSL**
+ SSL is enabled site wide by adding <tt>secure: always</tt> to the section: <tt>- url: /.*</tt> in app.yaml (remove this line to disable)
+ SSL either requires a free google app engine *.appspot.com domain or a [custom domain and certificate](https://developers.google.com/appengine/docs/ssl)
+ Alternatively SSL can be enabled at a controller level via webapp2 schemes. Use the secure_scheme provided in routes.py
+ It is recommended to enable ssl site wide to help prevent [session hijacking](http://en.wikipedia.org/wiki/Session_hijacking)

**Passwords**
+ Passwords are hashed and encrypted with SHA512 and PyCrypto.

**CSRF**
+ [Cross-site request forgery](http://en.wikipedia.org/wiki/Cross-site_request_forgery) protection

Acknowledgements
----------------
Google App Engine Boilerplate is a collaborative project created by [coto](https://github.com/coto) which is bringing to you thanks to the help of
these [amazing people](https://github.com/coto/gae-boilerplate/graphs/contributors?type=a)

**Top 10: Primary contributors:**
+ [Tmeryu](https://github.com/tmeryu)
+ [Peta15](https://github.com/peta15)
+ [Sergue1](https://github.com/sergue1)
+ [Sabirmostofa](https://github.com/sabirmostofa)
+ [Pmanacas](https://github.com/pmanacas)
+ [copycat91](https://github.com/copycat91)
+ [Mooose](https://github.com/mooose)
+ [f1shear](https://github.com/f1shear)
+ [presveva](https://github.com/presveva)
+ [Sorced-Jim](https://github.com/sorced-Jim)
