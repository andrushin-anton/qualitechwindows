


//register modal component
Vue.component('login', {
  props: {
	  sitename: String,
	  logon_url: String, 
	//  pass: String
  },
  template:'\
	  <div id="modal-mask">\
	  <div name="modal" class="modal-open">\
  <div id="login-overlay" class="modal-dialog">\
  <div class="modal-content">\
      <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\
          <h4 class="modal-title" id="myModalLabel">Login to {{sitename}} </h4>\
      </div>\
      <div class="modal-body">\
          <div class="row">\
              <div class="col-xs-6">\
                  <div class="well">\
	  					 <div class="form-group">\
                              <label for="username" class="control-label">Username</label>\
                              <input type="text" class="form-control" id="username" name="username" v-model:value="user" required="" title="Please enter you username" placeholder="example@gmail.com">\
                              <span class="help-block"></span>\
                          </div>\
                          <div class="form-group">\
                              <label for="password" class="control-label">Password</label>\
                              <input type="password" class="form-control" id="password" name="password" v-model:value="pass" required="" title="Please enter your password">\
                              <span class="help-block"></span>\
                          </div>\
                          <div  v-if="msg" id="loginErrorMsg" class="alert alert-error" style="color:red">{{msg}}</div>\
                          <div class="checkbox">\
                              <label>\
                                  <input type="checkbox" name="remember" id="remember"> Remember login\
                              </label>\
                              <p class="help-block">(if this is a private computer)</p>\
                          </div>\
                          <button type="submit" class="btn btn-success btn-block"  v-on:click="_login">Login</button>\
                          <a href="#forgot" class="btn btn-default btn-block">Help to login</a>\
                  </div>\
              </div>\
              <div class="col-xs-6">\
                  <p class="lead">Register now for <span class="text-success">FREE</span></p>\
                  <ul class="list-unstyled" style="line-height: 2">\
                      <li><span class="fa fa-check text-success"></span> See all your customers</li>\
	  				  <li><span class="fa fa-check text-success"></span> See all your sellers(for superusers) </li>\
                      <li><span class="fa fa-check text-success"></span> Make appointments</li>\
                      <li><span class="fa fa-check text-success"></span> Close all your deals</li>\
                      <li><span class="fa fa-check text-success"></span> Check all customers docs</li>\
                      <li><a href="#read-more"><u>Read more</u></a></li>\
                  </ul>\
                  <p><a href="#new-customer" class="btn btn-info btn-block">Yes please, register now!</a></p>\
              </div>\
          </div>\
      </div>\
  </div>\
      <p class="lead"><span class="text-fail">{{msg}}</span></p>\
</div>\
	  </div>\
	  </div>\
	  ',
  data: function () {
	  return { user: '' , pass: '', msg: '' }
  },
  
  methods: {
	  _login: function (){
		    var login = this
		     axios.get(this.logon_url, {
		     	//    withCredentials: true, // use cookies or not ?
		     	    auth: {
		     	      username: this.user,
		     	      password: this.pass
		     	    }
		     	  }) 
		      .then(function (response) {
		      	  // populate global variable quickbill
		      	 console.log(response.data)
		      	 // app instace already created
		      	 //TODO fix bug with reactivity of Array
		      	 if( isString(response.data) ) {
		      		login.$emit('loginfail', response.data)
		      		login.msg = response.data
		      	 } 
		      	 else  if( response.data.login ){
		      	    // login == true
		      		login.$emit('logedin', response.data)
	      	     } 

		      })
		      .catch(function (error) {
		     	 showError(error)
		  		 login.$emit('loginfail', error)
		  		 login.msg = error

		      })
		}

  }	  
})
