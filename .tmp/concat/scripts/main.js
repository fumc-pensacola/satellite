Ember.TEMPLATES["components/basic-modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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

Ember.TEMPLATES["components/file-upload"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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

Ember.TEMPLATES["about"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>About</h1>");
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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
  
  var buffer = '', stack1;
  data.buffer.push(" <div class=\"right menu\"> <div class=\"item\"> <i class=\"user icon\"></i> Hello, ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> <a class=\"item\" href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Log out</a> </div> ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push(" <div class=\"right menu\"> ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("item")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "login", options) : helperMissing.call(depth0, "link-to", "login", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> ");
  return buffer;
  }
function program8(depth0,data) {
  
  
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
  stack1 = helpers['if'].call(depth0, "loggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> </div> <div class=\"ui one column page grid\"> <div class=\"column\"> ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </div> </div> ");
  return buffer;
  
});

Ember.TEMPLATES["authenticate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"ui active inline loader\"></div> Authenticating ");
  
});

Ember.TEMPLATES["bulletin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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

  data.buffer.push(" <div class=\"ui grid\"> <div class=\"row\" ");
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
  data.buffer.push(" <label>Publish to app/website</label> </div> </div> <div class=\"ui buttons field\"> <button class=\"ui button\" ");
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

Ember.TEMPLATES["bulletins"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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
  stack1 = helpers.each.call(depth0, "bulletin", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
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

Ember.TEMPLATES["contact"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Contact</h1>");
  
});

Ember.TEMPLATES["error404"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1>Error 404: <small>Page not found</small></h1>");
  
});

Ember.TEMPLATES["failure"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h1 clas=\"ui header\">Index</h1> ");
  
});

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<a href=\"#\" id=\"LoginWithAmazon\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("> <img alt=\"Login with Amazon\" src=\"http://g-ecx.images-amazon.com/images/G/01/lwa/btnLWA_drkgry_152x64._CB372226054_.png\"> </a> ");
  return buffer;
  
});

Ember.TEMPLATES["showPDF"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push(" <object ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'data': ("showBulletinUrl")
  },hashTypes:{'data': "STRING"},hashContexts:{'data': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Your browser doesn&rsquo;t support embedded PDFs. Time to upgrade.</object> ");
  return buffer;
  }

  stack1 = (helper = helpers['basic-modal'] || (depth0 && depth0['basic-modal']),options={hash:{
    'title': ("showBulletinTitle")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "basic-modal", options));
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
    component.set('currentFile', this.get('oldFile'));
    input.addEventListener('change', function () {
      console.log('file change event', this);
      var file = this.files[0];
      component.set('currentFile', file.name);
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
  date: DS.attr('date'),
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

Fumc.FileUploadModel = Ember.Object.extend({

  // Name is used for the upload property
  name: '',

  // {Property} Human readable size of the selected file
  size: "0 KB",

  // {Property} Raw file size of the selected file
  rawSize: 0,

  // {Property} Will be an HTML5 File
  fileToUpload: null,

  // {Property} Will be a $.ajax jqXHR
  uploadJqXHR: null,

  // {Property} Promise for when a file was uploaded
  uploadPromise: null,

  // {Property} Upload progress 0-100
  uploadProgress: null,

  // {Property} If a file is currently being uploaded
  isUploading: false,

  // {Property} If the file was uploaded successfully
  didUpload: false,

  init: function() {
    this._super();
    Ember.assert("File to upload required on init.", !!this.get('fileToUpload'));
    this.set('uploadPromise', new Ember.RSVP.defer());
  },

  readFile: function() {
    var self = this;
    var fileToUpload = this.get('fileToUpload');

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
  showBulletinUrl: Ember.computed.alias('controllers.bulletins.showBulletinUrl'),

  init: function () {
    this.set('initialDate', this.get('date'));
    if (~this.get('currentState.stateName').indexOf('uncommitted')) {
      this.set('editing', true);
    }
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
      console.log('fileSelected', file);
      if (!file) {
        this.set('fileUpload', null);
        return;
      }

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
	itemController: 'bulletin',
	sortProperties: ['date', 'service'],
	sortAscending: false,

	modal: null,
	showBulletingUrl: null,

	pdfChanged: function () {
		this.get('modal').$('object.pdf').trigger('change');
	}.observes('showBulletinUrl'),

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

Fumc.ApplicationView = Ember.View.extend({

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
	this.route('about');
	this.route('contact');
	this.route('error404', { path: '*:' });
});


})();