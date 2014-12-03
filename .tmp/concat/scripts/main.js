Ember.TEMPLATES["components/basic-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<i class=\"close deny icon\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", "view", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push("></i> <div class=\"header\">");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> <div class=\"content\"> ");
  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> ");
  return buffer;
  
});

Ember.TEMPLATES["components/file-upload"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("currentFile::hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"ui black horizontal label\"> <i class=\"file icon\"></i> ");
  stack1 = helpers._triageMustache.call(depth0, "currentFile", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "replace", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Replace</a> </div> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("currentFile:hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <input type=\"file\" class=\"hidden\"> <button class=\"ui small black button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "triggerClick", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Upload file</button> </div> ");
  return buffer;
  
});

Ember.TEMPLATES["about"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>About</h1>");
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("<i class=\"home icon\"></i> Home");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("<i class=\"file icon\"></i> Bulletins");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("<i class=\"mail icon\"></i> Witnesses");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("<i class=\"star icon\"></i> Featured Content");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("<i class=\"feed icon\"></i> Notify");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("<i class=\"calendar icon\"></i> Calendars");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" <div class=\"right menu\"> <div class=\"item\"> <i class=\"user icon\"></i> Hello, ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> <a class=\"item\" href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Log out</a> </div> ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push(" <div class=\"right menu\"> ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "login", options) : helperMissing.call(depth0, "link-to", "login", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> ");
  return buffer;
  }
function program16(depth0,data) {
  
  
  data.buffer.push("Log in");
  }

  data.buffer.push(" <div class=\"ui one column page grid\"> <div class=\"column\"> <div class=\"ui teal inverted menu\"> ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "bulletins", options) : helperMissing.call(depth0, "link-to", "bulletins", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "witnesses", options) : helperMissing.call(depth0, "link-to", "witnesses", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "featured", options) : helperMissing.call(depth0, "link-to", "featured", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "notifications", options) : helperMissing.call(depth0, "link-to", "notifications", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "calendars", options) : helperMissing.call(depth0, "link-to", "calendars", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "loggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> </div> <div class=\"ui one column page grid\"> <div class=\"column\"> ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> ");
  return buffer;
  
});

Ember.TEMPLATES["authenticate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"ui basic modal\"> <div class=\"content\"> <div class=\"ui active loader\"></div> </div> </div> ");
  
});

Ember.TEMPLATES["bulletin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push(" <i class=\"unhide icon\"></i> ");
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <button class=\"ui small black button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "viewFile", {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">View</button> ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" <div class=\"ui red pointing above label\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.service", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" <div class=\"ui red pointing above label\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> ");
  return buffer;
  }

  data.buffer.push("<div class=\"ui grid\"> <div class=\"row\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleEditing", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("> <div class=\"one wide column\"> ");
  stack1 = helpers['if'].call(depth0, "bulletin.visible", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> <div class=\"eleven wide column\"> <div class=\"header\">");
  stack1 = helpers._triageMustache.call(depth0, "bulletin.formattedDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> ");
  stack1 = helpers._triageMustache.call(depth0, "bulletin.service", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> <div class=\"four wide right column\"> ");
  stack1 = helpers['if'].call(depth0, "bulletin.file", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <button class=\"ui small red button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "remove", {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Delete</button> </div> </div> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":editing :row :slide bulletin.editing::hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"sixteen wide column\"> <form class=\"ui fluid form\"> <div class=\"field\"> ");
  data.buffer.push(escapeExpression((helper = helpers['file-upload'] || (depth0 && depth0['file-upload']),options={hash:{
    'oldFile': ("bulletin.file"),
    'change': ("fileSelected")
  },hashTypes:{'oldFile': "ID",'change': "STRING"},hashContexts:{'oldFile': depth0,'change': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "file-upload", options))));
  data.buffer.push(" </div> <div class=\"two fields\"> <div class=\"field\"> <label>Service</label> <div class=\"ui left labeled input\"> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("bulletin.service"),
    'placeholder': ("e.g. ICON")
  },hashTypes:{'value': "ID",'placeholder': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "errors.service", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> <div class=\"date field\"> <label>Service Date</label> <div class=\"ui left labeled input\"> ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Fumc.DateField", {hash:{
    'date': ("bulletin.date")
  },hashTypes:{'date': "ID"},hashContexts:{'date': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "errors.date", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> </div> <div class=\"field\"> <div class=\"ui checkbox\"> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("bulletin.visible")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" <label>Publish to app/website</label> </div> </div> <div class=\"ui buttons field\"> <button type=\"button\" class=\"ui button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Cancel</button> <div class=\"or\"></div> <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :button bulletin.fileUpload.isUploading:disabled")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Save</button> </div> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :progress bulletin.fileUpload.showProgressBar::hidden bulletin.fileUpload.didUpload:successful")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"bar\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("bulletin.fileUpload.progressStyle")
  },hashTypes:{'style': "STRING"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></div> </div> </form> </div> </div> </div> ");
  return buffer;
  
});

Ember.TEMPLATES["bulletins"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "bulletin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  data.buffer.push("<h1 class=\"ui header\">Bulletins</h1> <button class=\"ui blue button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "newBulletin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">New Bulletin</button> <div class=\"ui selection link divided list\"> ");
  stack1 = helpers.each.call(depth0, "bulletin", "in", "arrangedContent", {hash:{
    'itemController': ("bulletin")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> ");
  stack1 = (helper = helpers['basic-modal'] || (depth0 && depth0['basic-modal']),options={hash:{
    'class': ("file-viewer"),
    'initialize': ("registerModal"),
    'title': ("showBulletinTitle")
  },hashTypes:{'class': "STRING",'initialize': "STRING",'title': "ID"},hashContexts:{'class': depth0,'initialize': depth0,'title': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "basic-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  
});

Ember.TEMPLATES["calendars"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"narrow\"> <h1 class=\"ui header\">Calendars</h1> <p class=\"ui red segment\"><strong>Warning!</strong> This feature is in beta. Pay close attention around seasonal time changes and report any inconsistancies you find to <a href=\"mailto:andrewbranch@mail.com\">Drew</a>.</p> <p>ACS calendars can be converted to iCalendar format via this web app for use with Google Calendar, Apple&rsquo;s Calendar.app, iPhone calendars, and many others. To subscribe to them, use the URLs provided below. Only published events are included. There is an extraordinary number of events on the ACS calendar, so at any given time you can only see events one year back and one year ahead. This specification is subject to change in the future.</p> <div class=\"space-below\"> <h2 class=\"ui header\">The Easy Way</h2> <div class=\"space-below\"> <a href=\"webcal://fumc.herokuapp.com/api/calendars/all.ics\" class=\"ui blue button\">Subscribe to Combined Calendar</a> </div> <div class=\"ui action input\"> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("calendarName"),
    'id': ("calendar-name"),
    'placeholder': ("Type name of calendar...")
  },hashTypes:{'value': "ID",'id': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'id': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("calendarURL")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"ui blue button\">Subscribe to Specific Calendar</a> </div> </div> <div class=\"ui secondary segment\"> <h2 class=\"ui header\">Documentation</h2> <h4 class=\"ui header\">Named Calendars</h4> <p>Any individual calendar, even ones that are added in the future, can be accessed by name. To do so, remove any spaces and special characters from the calendar name, and insert it into the URL <code>webcal://fumc.herokuapp.com/api/calendars/CALENDAR_NAME.ics</code>. For example, the URL for the &ldquo;MCA &amp; Children's Ministry&rdquo; calendar would be</p> <div class=\"ui segment\"><code>webcal://fumc.herokuapp.com/api/calendars/MCAChildrensMinistry.ics</code></div> <p>Capitalization of the calendar name is ignored.</p> <h4 class=\"ui header\">All Calendars Combined</h4> <p>You can alternatively subscribe to one calendar that combines published events from all calendars. Just replace the name of the calendar in the URL above with <code>all</code>.</p> </div> </div> ");
  return buffer;
  
});

Ember.TEMPLATES["contact"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Contact</h1>");
  
});

Ember.TEMPLATES["error404"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Error 404: <small>Page not found</small></h1>");
  
});

Ember.TEMPLATES["failure"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["feature"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("feature.iphoneFourFileUpload.base64Image")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "feature.iphoneFourImage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("feature.iphoneFourImageURL")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push(" <!-- <div class=\"size-label\">Drop file here</div> --> ");
  }

function program8(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("feature.iphoneFiveFileUpload.base64Image")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "feature.iphoneFiveImage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("feature.iphoneFiveImageURL")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("feature.iphoneSixFileUpload.base64Image")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "feature.iphoneSixImage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("feature.iphoneSixImageURL")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("feature.iphoneSixPlusFileUpload.base64Image")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "feature.iphoneSixPlusImage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("feature.iphoneSixPlusImageURL")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  return buffer;
  }

  data.buffer.push("<div class=\"actions\"> <button type=\"button\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :button feature.isUploading:disabled feature.isControllerDirty::disabled")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Save</button> <div class=\"ui slider checkbox\"> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("feature.actualSize")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" <label>Actual Size</label> </div> </div> <div class=\"active-label\"> <div class=\"ui toggle checkbox\"> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("feature.active")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" <label>Active</label> </div> </div> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":devices feature.actualSize::little")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"iphone4 size\"> <h3 class=\"ui header\">iPhone 4</h3> <h5 class=\"ui header\">640 &times; 734</h5> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":feature-frame feature.iphoneFourShowingImage:showing-image")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"feature-content\"> ");
  stack1 = helpers['if'].call(depth0, "feature.iphoneFourFileUpload", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> ");
  data.buffer.push(escapeExpression((helper = helpers['file-upload'] || (depth0 && depth0['file-upload']),options={hash:{
    'oldFile': ("feature.iphoneFourImage"),
    'change': ("iphoneFourFileSelected")
  },hashTypes:{'oldFile': "ID",'change': "STRING"},hashContexts:{'oldFile': depth0,'change': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "file-upload", options))));
  data.buffer.push(" <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :progress feature.iphoneFourFileUpload.showProgressBar::hidden feature.iphoneFourFileUpload.didUpload:successful")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"bar\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("feature.iphoneFourFileUpload.progressStyle")
  },hashTypes:{'style': "STRING"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></div> </div> </div> <div class=\"iphone5 size\"> <h3 class=\"ui header\">iPhone 5</h3> <h5 class=\"ui header\">640 &times; 910</h5> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":feature-frame feature.iphoneFiveShowingImage:showing-image")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"feature-content\"> ");
  stack1 = helpers['if'].call(depth0, "feature.iphoneFiveFileUpload", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> ");
  data.buffer.push(escapeExpression((helper = helpers['file-upload'] || (depth0 && depth0['file-upload']),options={hash:{
    'oldFile': ("feature.iphoneFiveImage"),
    'change': ("iphoneFiveFileSelected")
  },hashTypes:{'oldFile': "ID",'change': "STRING"},hashContexts:{'oldFile': depth0,'change': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "file-upload", options))));
  data.buffer.push(" <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :progress feature.iphoneFiveFileUpload.showProgressBar::hidden feature.iphoneFiveFileUpload.didUpload:successful")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"bar\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("feature.iphoneFiveFileUpload.progressStyle")
  },hashTypes:{'style': "STRING"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></div> </div> </div> <div class=\"iphone6 size\"> <h3 class=\"ui header\">iPhone 6</h3> <h5 class=\"ui header\">650 &times; 1108</h5> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":feature-frame feature.iphoneSixShowingImage:showing-image")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"feature-content\"> ");
  stack1 = helpers['if'].call(depth0, "feature.iphoneSixFileUpload", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> ");
  data.buffer.push(escapeExpression((helper = helpers['file-upload'] || (depth0 && depth0['file-upload']),options={hash:{
    'oldFile': ("feature.iphoneSixImage"),
    'change': ("iphoneSixFileSelected")
  },hashTypes:{'oldFile': "ID",'change': "STRING"},hashContexts:{'oldFile': depth0,'change': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "file-upload", options))));
  data.buffer.push(" <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :progress feature.iphoneSixFileUpload.showProgressBar::hidden feature.iphoneSixFileUpload.didUpload:successful")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"bar\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("feature.iphoneSixFileUpload.progressStyle")
  },hashTypes:{'style': "STRING"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></div> </div> </div> <div class=\"iphone6plus size\"> <h3 class=\"ui header\">iPhone 6 Plus</h3> <h5 class=\"ui header\">1242 &times; 1869</h5> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":feature-frame feature.iphoneSixPlusShowingImage:showing-image")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"feature-content\"> ");
  stack1 = helpers['if'].call(depth0, "feature.iphoneSixPlusFileUpload", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> ");
  data.buffer.push(escapeExpression((helper = helpers['file-upload'] || (depth0 && depth0['file-upload']),options={hash:{
    'oldFile': ("feature.iphoneSixPlusImage"),
    'change': ("iphoneSixPlusFileSelected")
  },hashTypes:{'oldFile': "ID",'change': "STRING"},hashContexts:{'oldFile': depth0,'change': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "file-upload", options))));
  data.buffer.push(" <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :progress feature.iphoneSixPlusFileUpload.showProgressBar::hidden feature.iphoneSixPlusFileUpload.didUpload:successful")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"bar\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("feature.iphoneSixPlusFileUpload.progressStyle")
  },hashTypes:{'style': "STRING"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></div> </div> </div> </div> ");
  return buffer;
  
});

Ember.TEMPLATES["featured"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "feature", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" ");
  return buffer;
  }

  data.buffer.push("<h1 class=\"ui header\">Featured Content</h1> <button class=\"ui blue button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "newFeature", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">New Featured Content</button> <div class=\"ui divided list\"> ");
  stack1 = helpers.each.call(depth0, "feature", "in", "arrangedContent", {hash:{
    'itemController': ("feature")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> ");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1 clas=\"ui header\">Index</h1> ");
  
});

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<a href=\"#\" class=\"ui blue button\" id=\"LoginWithAmazon\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Log in with Amazon</a> ");
  return buffer;
  
});

Ember.TEMPLATES["notifications"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"narrow\"> <h1 class=\"ui header\">Send Push Notification</h1> <form ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :form :segment loading")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"field\"> <label>Expiration Date</label> ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Fumc.DateField", {hash:{
    'date': ("expirationDate")
  },hashTypes:{'date': "ID"},hashContexts:{'date': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" </div> <div class=\"field\"> <label>Message</label> ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("message")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push(" </div> <div class=\"field\"> <label>Associated URL</label> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :input urlIsValid::error")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("url")
  },hashTypes:{'type': "STRING",'value': "ID"},hashContexts:{'type': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" </div> </div> <div> <button type=\"button\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :button isValid::disabled")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "test", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Test</button> <button type=\"button\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :red :button isValid::disabled")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "send", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Send</button> </div> </form> </div> ");
  return buffer;
  
});

Ember.TEMPLATES["witness"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push(" <i class=\"unhide icon\"></i> ");
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <button class=\"ui small black button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "viewFile", {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">View</button> ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" <div class=\"ui red pointing above label\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.volume", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" <div class=\"ui red pointing above label\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.issue", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" <div class=\"ui red pointing above label\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.from", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" <div class=\"ui red pointing above label\">");
  stack1 = helpers._triageMustache.call(depth0, "errors.to", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> ");
  return buffer;
  }

  data.buffer.push(" <div class=\"ui grid\"> <div class=\"row\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleEditing", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("> <div class=\"one wide column\"> ");
  stack1 = helpers['if'].call(depth0, "witness.visible", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> <div class=\"eleven wide column\"> <div class=\"header\">");
  stack1 = helpers._triageMustache.call(depth0, "witness.formattedDateRange", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div> Volume ");
  stack1 = helpers._triageMustache.call(depth0, "witness.volume", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(", Issue ");
  stack1 = helpers._triageMustache.call(depth0, "witness.issue", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> <div class=\"four wide right column\"> ");
  stack1 = helpers['if'].call(depth0, "witness.file", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <button class=\"ui small red button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "remove", {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Delete</button> </div> </div> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":editing :row :slide witness.editing::hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"sixteen wide column\"> <form class=\"ui fluid form\"> <div class=\"field\"> ");
  data.buffer.push(escapeExpression((helper = helpers['file-upload'] || (depth0 && depth0['file-upload']),options={hash:{
    'oldFile': ("witness.file"),
    'change': ("fileSelected")
  },hashTypes:{'oldFile': "ID",'change': "STRING"},hashContexts:{'oldFile': depth0,'change': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "file-upload", options))));
  data.buffer.push(" </div> <div class=\"four fields\"> <div class=\"field\"> <label>Volume</label> <div class=\"ui left labeled input\"> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("witness.volume")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "errors.volume", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> <div class=\"field\"> <label>Issue</label> <div class=\"ui left labeled input\"> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("witness.issue")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "errors.issue", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> <div class=\"date field\"> <label>From Date</label> <div class=\"ui left labeled input\"> ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Fumc.DateField", {hash:{
    'date': ("witness.from")
  },hashTypes:{'date': "ID"},hashContexts:{'date': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "errors.from", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> <div class=\"date field\"> <label>To Date</label> <div class=\"ui left labeled input\"> ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Fumc.DateField", {hash:{
    'date': ("witness.to")
  },hashTypes:{'date': "ID"},hashContexts:{'date': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "errors.to", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> </div> <div class=\"field\"> <div class=\"ui checkbox\"> ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("witness.visible")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" <label>Publish to app/website</label> </div> </div> <div class=\"ui buttons field\"> <button class=\"ui button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Cancel</button> <div class=\"or\"></div> <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :button witness.fileUpload.isUploading:disabled")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Save</button> </div> <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":ui :blue :progress witness.fileUpload.showProgressBar::hidden witness.fileUpload.didUpload:successful")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> <div class=\"bar\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("witness.fileUpload.progressStyle")
  },hashTypes:{'style': "STRING"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></div> </div> </form> </div> </div> </div> ");
  return buffer;
  
});

Ember.TEMPLATES["witnesses"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "witness", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  data.buffer.push("<h1 class=\"ui header\">Witnesses</h1> <button class=\"ui blue button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "newWitness", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">New Witness</button> <div class=\"ui selection link divided list\"> ");
  stack1 = helpers.each.call(depth0, "witness", "in", "arrangedContent", {hash:{
    'itemController': ("witness")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> ");
  stack1 = (helper = helpers['basic-modal'] || (depth0 && depth0['basic-modal']),options={hash:{
    'class': ("file-viewer"),
    'initialize': ("registerModal"),
    'title': ("showWitnessTitle")
  },hashTypes:{'class': "STRING",'initialize': "STRING",'title': "ID"},hashContexts:{'class': depth0,'initialize': depth0,'title': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "basic-modal", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  
});
(function() {

window.Fumc = Ember.Application.create();
Fumc.ApplicationAdapter = DS.FixtureAdapter.extend();

// These requires will be appended to this file using grunt-neuter


})();

(function() {

Ember.Application.initializer({
	name: 'setup',

	initialize: function (container, application) {
		// Basic idea of an initializer
		// Do things like setup injections here
		Ember.FEATURES['ember-routing-drop-deprecated-action-style'] = true;

		Fumc.DateWithTimezoneTransform = DS.Transform.extend({
			serialize: function (value) {
				return value ? moment(value).format() : null;
			},
			deserialize: function (value) {
				return value ? new Date(value) : null;
			}
		});
		
	}
});


})();

(function() {

Fumc.BasicModalComponent = Ember.Component.extend({

  classNames: ['ui', 'basic', 'modal'],

  didInsertElement: function () {
    this.sendAction('initialize', this);
    this.$().addClass(this.get('class'));
  },

  show: function () {
    this.$().modal('show');
  }

});


})();

(function() {

Fumc.FileUploadComponent = Ember.Component.extend({

  oldFile: null,
  currentFile: null,
  input: null,


  didInsertElement: function () {
    var component = this,
        input = component.get('element').querySelector('input[type=file]');

    if (!this.get('currentFile')) {
      component.set('currentFile', this.get('oldFile'));
    }

    input.addEventListener('change', function () {
      var file = this.files[0];
      component.set('currentFile', file.name);
      console.log('just set currentFile', file.name);
      component.sendAction('change', file);
    }, false);

    this.set('input', input);
  },

  actions: {
    replace: function () {
      this.set('currentFile', null);
      this.sendAction('change', null);
    },
    triggerClick: function () {
      this.get('input').click();
    }
  }
});


})();

(function() {

Fumc.Bulletin = DS.Model.extend({
  date: DS.attr('date-with-timezone'),
  service: DS.attr('string'),
  visible: DS.attr('boolean'),
  file: DS.attr('string')
});

// Fumc.Bulletin.FIXTURES = [{
//   id: 1,
//   date: moment().startOf('week').subtract(1, 'weeks'),
//   service: 'ICON',
//   visible: true
// }];


})();

(function() {

Fumc.Feature = DS.Model.extend({
  active: DS.attr('boolean'),
  iphoneFourImage: DS.attr('string'),
  iphoneFiveImage: DS.attr('string'),
  iphoneSixImage: DS.attr('string'),
  iphoneSixPlusImage: DS.attr('string')
});


})();

(function() {

Fumc.FileUploadModel = Ember.Object.extend({

  name: '',
  size: "0 KB",
  rawSize: 0,
  fileToUpload: null,
  uploadJqXHR: null,
  uploadPromise: null,
  uploadProgress: null,
  isUploading: false,
  didUpload: false,
  base64Image: null,

  init: function() {
    this._super();
    Ember.assert("File to upload required on init.", !!this.get('fileToUpload'));
    this.set('uploadPromise', new Ember.RSVP.defer());
  },

  readFile: function() {
    var self = this;
    var fileToUpload = this.get('fileToUpload');
    var isImage = fileToUpload.type.indexOf('image') === 0;

    if (isImage) {
      var reader = new FileReader();
      reader.onload = function(e) {
        self.set('base64Image', e.target.result);
      };

      // Read in the image file as a data URL.
      reader.readAsDataURL(fileToUpload);
    }

    this.set('name', fileToUpload.name);
    this.set('rawSize', fileToUpload.size);
    // this.set('size', App.humanReadableFileSize(fileToUpload.size));

  }.on('init'),

  uploadFile: function() {
    if (this.get('isUploading') || this.get('didUpload') || this.get('didError')) {
      return this.get('uploadPromise');
    }

    var fileToUpload = this.get('fileToUpload');
    var self = this;

    this.set('isUploading', true);

    Fumc.s3.putObject({
      Key: this.get('name'),
      ContentType: fileToUpload.type,
      Body: fileToUpload
    }, function (err, data) {
      if (err) {
        self.set('isUploading', false);
        self.set('didError', true);
        self.get('uploadPromise').reject(err);
      }

      self.set('isUploading', false);
      self.set('didUpload', true);
      self.get('uploadPromise').resolve(fileToUpload.name);
    }).on('httpUploadProgress', function (progress, response) {
      self.set('progress', progress.loaded / progress.total * 100);
    });

    return this.get('uploadPromise').promise;
  },

  showProgressBar: Ember.computed.or('isUploading', 'didUpload'),

  progressStyle: function() {
    return 'width: %@%'.fmt(this.get('progress'));
  }.property('progress')

});


})();

(function() {

Fumc.Notification = DS.Model.extend({
  sendDate: DS.attr('date-with-timezone'),
  expirationDate: DS.attr('date-with-timezone'),
  message: DS.attr('string'),
  url: DS.attr('string')
});


})();

(function() {

Fumc.Witness = DS.Model.extend({
  from: DS.attr('date-with-timezone'),
  to: DS.attr('date-with-timezone'),
  volume: DS.attr('number'),
  issue: DS.attr('number'),
  visible: DS.attr('boolean'),
  file: DS.attr('string')
});


})();

(function() {

Fumc.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function (transition) {
    if (!this.controllerFor('application').get('token')) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function (transition) {
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },

  actions: {
    error: function (error, transition) {
      if (error && error.status === 401) { // Invalid token, probably expired
        this.redirectToLogin(transition);
      }
    }
  }

});


})();

(function() {

Fumc.BulletinsRoute = Fumc.AuthenticatedRoute.extend({
	model: function () {
		return this.store.find('bulletin');
	}
});


})();

(function() {

Fumc.FeaturedRoute = Fumc.AuthenticatedRoute.extend({
  model: function () {
    return this.store.find('feature');
  }
});


})();

(function() {

Fumc.NotificationsRoute = Fumc.AuthenticatedRoute.extend({
  model: function () {
    return this.store.createRecord('notification', {
      expirationDate: moment().add(1, 'weeks')
    });
  },
  actions: {
    refresh: function () {
      this.refresh();
    }
  }
});


})();

(function() {

Fumc.WitnessesRoute = Fumc.AuthenticatedRoute.extend({
  model: function () {
    return this.store.find('witness');
  }
});


})();

(function() {

Fumc.ApplicationController = Ember.Controller.extend({

  token: Cookies.get('token') === 'null' ? null : Cookies.get('token'),
  name: Cookies.get('name') === 'null' ? null : Cookies.get('name'),
  email: Cookies.get('email') === 'null' ? null : Cookies.get('email'),

  loggedIn: function () {
    return this.get('token') && this.get('name') && this.get('email');
  }.property('token', 'name', 'email'),

  init: function () {
    this.setupAWS();
  },

  tokenChanged: function () {
    Cookies.set('token', this.get('token'), { expires: 3600 });
    Cookies.set('name', this.get('name'), { expires: 3600 });
    Cookies.set('email', this.get('email'), { expires: 3600 });
    this.setupAWS();
  }.observes('token'),

  setupAWS: function () {
    AWS.config.credentials = new AWS.WebIdentityCredentials({
      RoleArn: 'arn:aws:iam::885099591831:role/content-managers',
      ProviderId: 'www.amazon.com',
      WebIdentityToken: this.get('token')
    });

    Fumc.s3 = new AWS.S3({
      params: {
        Bucket: 'fumcappfiles'
      }
    });
  },

  actions: {
    logout: function () {
      amazon.Login.logout();
      this.set('token', null);
      this.set('name', null);
      this.set('email', null);
      Cookies.expire('token');
      Cookies.expire('name');
      Cookies.expire('email');
      this.transitionToRoute('index');
    }
  }

});


})();

(function() {

Fumc.BulletinController = Ember.ObjectController.extend({

  needs: ['application', 'bulletins'],

  editing: false,
  fileUpload: null,
  initialDate: null,

  s3: Ember.computed.alias('controllers.application.s3'),
  modal: Ember.computed.alias('controllers.bulletins.modal'),

  init: function () {
    this.set('initialDate', this.get('date'));
    if (~this.get('currentState.stateName').indexOf('uncommitted')) {
      this.set('editing', true);
    }
    this._super();
  },

  formattedDate: function () {
    return moment(this.get('date')).format('MMMM D, YYYY');
  }.property('date'),

  actions: {

    toggleEditing: function () {
      this.toggleProperty('editing');
    },

    save: function () {

      var fileUpload = this.get('fileUpload'),
          model = this.get('model'),
          oldFile = this.get('file'),
          saved = function () {
            setTimeout(function () { this.set('editing', false) }.bind(this), 600);
          }.bind(this);

      if (fileUpload && fileUpload.isUploading) {
        return false;
      }

      this.set('date', new Date(this.get('date')));

      if (fileUpload) {
        if (fileUpload.name !== oldFile) {
          Fumc.s3.deleteObject({ Key: oldFile }).send();
        }
        fileUpload.uploadFile().then(function (key) {
          this.set('file', key);
          model.save().then(saved);
        }.bind(this));
      } else {
        model.save().then(saved);
      }
    },

    cancel: function () {
      var model = this.get('model');
      if (~this.get('currentState.stateName').indexOf('created.uncommitted')) {
        model.destroyRecord();
      } else {
        model.rollback();
        this.set('editing', false);
      }
    },

    remove: function () {
      var file = this.get('file');
      if (file) {
        Fumc.s3.deleteObject({ Key: file }).send();
      }
      this.get('model').destroyRecord();
    },

    fileSelected: function (file) {
      if (!file) {
        this.set('fileUpload', null);
        return;
      }

      this.set('currentFile', file.name);

      var date = new Date(file.name
        .replace(/[-–—_]/g, '/')
        .replace(/[^0-9\/]/g, '')
        .replace(/^\//, '')
        .replace(/\/$/, '')
      );

      if (moment(this.get('initialDate')).isSame(this.get('date'), 'day')) { // Only do it if it hasn't been changed manually
        if (!isNaN(date.getDate()) && date.getFullYear() - new Date().getFullYear() <= 1) {
          this.set('date', date);
        }
      }

      if (!this.get('service')) {
        if (~file.name.toLowerCase().indexOf('icon')) {
          this.set('service', 'ICON');
        } else if (date.getDay() === 0) {
          this.set('service', 'Traditional services');
        }
      }

      this.set('fileUpload', Fumc.FileUploadModel.create({
        fileToUpload: file
      }));
    },

    viewFile: function () {
      var modal = this.get('modal');
      modal.show();
      Fumc.s3.getSignedUrl('getObject', { Key: this.get('file') }, function (err, url) {
        // TODO make this not suck so hard
        modal.$('.content').html('<object class="pdf" type="application/pdf" data="' + url + '"></object>');
      }.bind(this));
    }
  }
})


})();

(function() {

Fumc.BulletinsController = Ember.ArrayController.extend({

	//itemController: 'bulletin',

	modal: null,

	sortAscending: false,
	sortProperties: ['id'],

	actions: {

		newBulletin: function () {
			var bulletin = this.store.createRecord('bulletin', {
				date: moment().startOf('week').add(1, 'week')
			});
		},

		registerModal: function (modal) {
			this.set('modal', modal);
		}

	}
});


})();

(function() {

Fumc.CalendarsController = Ember.Controller.extend({

  calendarURL: function () {
    return 'webcal://fumc.herokuapp.com/api/calendars/' + (this.get('calendarName') || '').replace(/[^A-Za-z0-9]/g, '') + '.ics';
  }.property('calendarName')

});


})();

(function() {

Fumc.FeatureController = Ember.ObjectController.extend({

  needs: ['application', 'featured'],

  editing: false,
  iphoneFiveFileUpload: null,
  initialDate: null,
  isKindOfDirty: false,
  devices: ['iphoneFour', 'iphoneFive', 'iphoneSix', 'iphoneSixPlus'],

  s3: Ember.computed.alias('controllers.application.s3'),
  featuredController: Ember.computed.alias('controllers.featured'),

  iphoneFourShowingImage: Ember.computed.or('iphoneFourFileUpload', 'iphoneFourImage'),
  iphoneFiveShowingImage: Ember.computed.or('iphoneFiveFileUpload', 'iphoneFiveImage'),
  iphoneSixShowingImage: Ember.computed.or('iphoneSixFileUpload', 'iphoneSixImage'),
  iphoneSixPlusShowingImage: Ember.computed.or('iphoneSixPlusFileUpload', 'iphoneSixPlusImage'),

  isUploading: Ember.computed.or('iphoneFourFileUpload.isUploading', 'iphoneFiveFileUpload.isUploading', 'iphoneSixFileUpload.isUploading', 'iphoneSixPlusFileUpload.isUploading'),
  isControllerDirty: Ember.computed.or('isDirty', 'isKindOfDirty'),

  _setImageURL: function (device, key) {
    Fumc.s3.getSignedUrl('getObject', { Key: this.get(device + 'Image') }, function (err, url) {
      if (!err) {
        this.set(device + 'ImageURL', url);
      }
    }.bind(this));
  },

  setIphoneFourImageURL: function (key) {
    window.controller = this;
    this._setImageURL('iphoneFour', key);
  }.observes('iphoneFourImage').on('init'),

  setIphoneFiveImageURL: function (key) {
    this._setImageURL('iphoneFive', key);
  }.observes('iphoneFiveImage').on('init'),

  setIphoneSixImageURL: function (key) {
    this._setImageURL('iphoneSix', key);
  }.observes('iphoneSixImage').on('init'),

  setIphoneSixPlusImageURL: function (key) {
    this._setImageURL('iphoneSixPlus', key);
  }.observes('iphoneSixPlusImage').on('init'),

  toggledActive: function () {
    var self = this;
    if (this.get('active')) {
      this.get('featuredController').forEach(function (f) {
        if (f !== self.get('model')) {
          f.set('active', false);
        }
      });
    }
  }.observes('active'),

  _fileSelected: function (device, file) {
    if (!file) {
      this.set(device + 'FileUpload', null);
      return;
    }

    if (file.name !== this.get(device + 'Image')) {
      this.set('isKindOfDirty', true);
    }

    this.set(device + 'CurrentFile', file.name);
    this.set(device + 'FileUpload', Fumc.FileUploadModel.create({
      fileToUpload: file
    }));
  },

  actions: {

    iphoneFourFileSelected: function (file) {
      this._fileSelected('iphoneFour', file);
    },

    iphoneFiveFileSelected: function (file) {
      this._fileSelected('iphoneFive', file);
    },

    iphoneSixFileSelected: function (file) {
      this._fileSelected('iphoneSix', file);
    },

    iphoneSixPlusFileSelected: function (file) {
      this._fileSelected('iphoneSixPlus', file);
    },

    save: function () {

      if (this.get('isUploading')) {
        return false;
      }

      var self = this,
          model = this.get('model'),
          devices = this.get('devices'),
          uploads = [];

      for (var i = 0; i < devices.length; i++) {
        var device = devices[i],
            fileUpload = this.get(device + 'FileUpload'),
            oldFile = this.get(device + 'Image');

        console.log(fileUpload);
        if (fileUpload) {
          if (fileUpload.name !== oldFile) {
            Fumc.s3.deleteObject({ Key: oldFile }).send();
          }
          uploads.push(new Ember.RSVP.Promise(function (resolve, reject) {
            fileUpload.uploadFile().then(function (d) {
              return function (key) {
                console.log(d);
                self.set(d + 'Image', key);
                resolve();
              };
            }(device));
          }));
        }
      }

      Ember.RSVP.Promise.all(uploads).then(function () {
        model.save().then(function () {
          self.set('isKindOfDirty', false);
          setTimeout(function () {
            for (var j = 0; j < devices.length; j++) {
              self.set(devices[j] + 'FileUpload', null);
            }
          }, 500);
        });
      });
    }

  }

});


})();

(function() {

Fumc.FeaturedController = Ember.ArrayController.extend({

  sortAscending: false,
  sortProperties: ['id'],

  actions: {

    newFeature: function () {
      var feature = this.store.createRecord('feature');
    }

  }
});


})();

(function() {

Fumc.LoginController = Ember.Controller.extend({

  needs: ['application'],
  queryParams: ['access_token'],
  access_token: null,
  attemptedTransition: null,

  token: Ember.computed.alias('controllers.application.token'),
  name: Ember.computed.alias('controllers.application.name'),
  email: Ember.computed.alias('controllers.application.email'),

  actions: {
    login: function () {
      options = { scope: 'profile' };
      amazon.Login.authorize(options, '/#/authenticate');
    }
  }

});

Fumc.AuthenticateRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    var token = transition.queryParams.access_token;
    if (token) {
      Ember.$.post('/authenticate', { access_token: token }).then(function (response) {
        if (response.success) {

          var loginController = this.controllerFor('login'),
              attemptedTransition = loginController.get('attemptedTransition');
          loginController.setProperties({
            name: response.name,
            email: response.email,
            token: response.token
          });

          if (attemptedTransition) {
            attemptedTransition.retry();
            loginController.set('attemptedTransition', null);
          } else {
            this.transitionTo('index');
          }
        }
      }.bind(this));
    }
  }
})


})();

(function() {

Fumc.NotificationsController = Ember.ObjectController.extend({

  init: function () {
    window.controller = this;
  },

  expirationDateIsValid: function () {
    var exp = this.get('expirationDate');
    return exp && moment(exp).isValid() && exp > Date.now();
  }.property('expirationDate'),

  messageIsValid: function () {
    return (this.get('message') || '').trim().length;
  }.property('message'),

  urlIsValid: true,

  testURL: function () {
    Ember.run.debounce(this, function () {
      var url = this.get('url'),
          self = this;
      if (!url) {
        this.set('urlIsValid', true);
        return;
      }

      $.get('/api/url/test', {
        url: url
      }).done(function (response) {
        self.set('urlIsValid', response.found);
      });
    }, 500);
  }.observes('url'),

  isValid: Ember.computed.and('expirationDateIsValid', 'messageIsValid', 'urlIsValid'),

  actions: {
    test: function () {

    },

    send: function () {
      var self = this;
      this.set('loading', true);
      if (this.get('isValid') && confirm('This will be sent immediately to every person who has downloaded the app and accepted push notifications, and cannot be undone.')) {
        this.set('sendDate', new Date());
        var model = this.get('model');
        model.save().then(function () {
          $.ajax({
            url: '/api/notify/everyone',
            type: 'POST',
            data: { notification: model.toJSON({ includeId: true }) },
            beforeSend: function (xhr) {
              xhr.setRequestHeader('token', Cookies.get('token'));
            }
          }).done(function () {
            alert('Notification sent.');
          }).fail(function () {
            alert('Notification failed to send. Deleting from server.');
            model.destroyRecord();
          }).always(function () {
            self.send('refresh');
          });
        }, function (reason) {
          alert('Notification failed to send. Will not attempt to save to server.');
          console.error(reason);
          self.send('refresh');
        });
      }
    }
  }

});


})();

(function() {

Fumc.WitnessController = Fumc.BulletinController.extend({

  needs: ['application', 'witnesses'],

  modal: Ember.computed.alias('controllers.witnesses.modal'),

  formattedDateRange: function () {
    return moment(this.get('from')).format('MMMM D') + " – " + moment(this.get('to')).format('MMMM D, YYYY');
  }.property('from', 'to'),

  updateVolume: function () {
    this.set('volume', moment(this.get('from')).year() - 1820);
  }.observes('from'),

  updateTo: function () {
    this.set('to', moment(this.get('from')).add(1, 'weeks').endOf('week').startOf('day'));
  }.observes('from'),

  actions: {

    save: function () {

      var fileUpload = this.get('fileUpload'),
          model = this.get('model'),
          oldFile = this.get('file'),
          saved = function () {
            setTimeout(function () { this.set('editing', false) }.bind(this), 600);
          }.bind(this);

      if (fileUpload && fileUpload.isUploading) {
        return false;
      }

      this.set('from', new Date(this.get('from')));
      this.set('to', new Date(this.get('to')));

      if (fileUpload) {
        if (fileUpload.name !== oldFile) {
          Fumc.s3.deleteObject({ Key: oldFile }).send();
        }
        fileUpload.uploadFile().then(function (key) {
          this.set('file', key);
          model.save().then(saved);
        }.bind(this));
      } else {
        model.save().then(saved);
      }
    },

    fileSelected: function (file) {
      if (!file) {
        this.set('fileUpload', null);
        return;
      }

      this.set('currentFile', file.name);

      var date = new Date(file.name
        .replace(/[-–—_]/g, '/')
        .replace(/[^0-9\/]/g, '')
        .replace(/^\//, '')
        .replace(/\/$/, '')
      );


      if (!isNaN(date.getDate()) && date.getFullYear() - new Date().getFullYear() <= 1) {
        this.set('from', date);
      }

      this.set('fileUpload', Fumc.FileUploadModel.create({
        fileToUpload: file
      }));
    }

  }

});


})();

(function() {

Fumc.WitnessesController = Fumc.BulletinsController.extend({

  actions: {

    newWitness: function () {
      this.store.createRecord('witness', {
        from: moment().add(1, 'weeks').startOf('week'),
        to: moment().add(1, 'weeks').endOf('week').startOf('day'),
        volume: moment().add(1, 'weeks').startOf('week').year() - 1820
      });
    },

    registerModal: function (modal) {
      this.set('modal', modal);
    }

  }

});


})();

(function() {

Fumc.ApplicationView = Ember.View.extend({

});


})();

(function() {

Fumc.AuthenticateView = Ember.View.extend({
  templateName: 'authenticate',
  didInsertElement: function () {
    $('.ui.basic.modal').modal('setting', 'closable', false).modal('show');
  },
  willDestroyElement: function () {
    $('.ui.basic.modal').modal('hide');
  }
});


})();

(function() {

Fumc.BulletinView = Ember.View.extend({

  templateName: 'bulletin',
  classNames: ['item', 'bulletin'],
  classBindings: ['editing'],

  didInsertElement: function () {
    this.$('.ui.checkbox').checkbox();
  }

});


})();

(function() {

Fumc.DateField = Ember.TextField.extend({
  picker: null,

  updateValue: function () {
    var date = moment(this.get('date'));
    if (date.isValid() && !this.$().is(':focus')) {
      this.set('value', date.format('L'));
      this.get('picker').setDate(date.format('L'));
    }
  }.observes('date'),

  updateDate: function () {
    var date = moment(new Date(this.get('value')));
    if (date.isValid()) {
      this.set('date', date.toDate());
    } else {
      this.set('date', null);
    }
  }.observes('value'),

  didInsertElement: function () {
    var picker = new Pikaday({
      field: this.$()[0],
      format: 'MM/DD/YYYY'
    });
    this.set('picker', picker);
    this.updateValue();
  },

  willDestroyElement: function (){
    var picker = this.get('picker');
    if (picker) {
      picker.destroy();
    }
    this.set('picker', null);
  }
});


})();

(function() {

Fumc.FeatureView = Ember.View.extend({

  templateName: 'feature',
  classNames: ['item', 'feature'],
  classBindings: ['editing'],

  didInsertElement: function () {
    this.$('.ui.checkbox').checkbox();
  }

});


})();

(function() {

Fumc.WitnessView = Fumc.BulletinView.extend({

  templateName: 'witness',
  classNames: ['item', 'witness']

});


})();

(function() {

Fumc.ApplicationAdapter = DS.RESTAdapter.extend({

	namespace: 'api',

	headers: function () {
		return {
			token: Cookies.get('token')
		};
	}.property().volatile(),

	ajaxError: function(jqXHR) {
		var error = this._super(jqXHR);

		if (jqXHR && jqXHR.status === 422) {
			var errors = Ember.$.parseJSON(jqXHR.responseText)["errors"];

			return new DS.InvalidError(errors);
		} else {
			return error;
		}
	}
});

Fumc.ApplicationSerializer = DS.RESTSerializer.extend({
	extractSingle: function(store, type, payload, id, requestType) {
		var finalPayload = {};
		finalPayload[type.typeKey] = payload;
		return this._super(store, type, finalPayload, id, requestType);
	},

	extractArray: function(store, type, payload, id, requestType) {
		var finalPayload = {};
		finalPayload[Ember.String.pluralize(type.typeKey)] = payload;
		return this._super(store, type, finalPayload, id, requestType);
	},

	serializeIntoHash: function(data, type, record, options) {
		var serializedData = this.serialize(record, options);
		for (var key in serializedData) {
			if (Ember.isArray(serializedData[key]) && !serializedData[key].length) {

			} else {
				data[key] = serializedData[key];
			}
		}
	},

	keyForRelationship: function(key, kind) {

		key = Ember.String.decamelize(key);
		if (kind === "belongsTo") {
			return key + "_id";
		} else {
			return key;
		}
	},

	normalizeRelationships: function(type, hash) {
		var payloadKey, key, objList, idList = [];

		if (this.keyForRelationship) {
			type.eachRelationship(function(key, relationship) {
				payloadKey = this.keyForRelationship(key, relationship.kind);

				objList = hash[payloadKey] || [];

				objList.forEach(function(item) {
					idList.push(Ember.get(item, 'id'));
				});

				hash[key] = idList;
				delete hash[payloadKey];
			}, this);
		}
	}
});


})();

(function() {

Fumc.Router.map(function () {
	this.route('login');
	this.route('authenticate');
	this.resource('bulletins');
	this.resource('witnesses');
	this.resource('featured');
	this.resource('notifications');
	this.route('calendars');
	this.route('error404', { path: '*:' });
});


})();