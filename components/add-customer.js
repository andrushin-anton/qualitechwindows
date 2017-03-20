Vue.component('add-customer', {
  props: {
	  customer: Object,
	  url: String
  },
  template:'\
  <div id="sidebar-wrapper" style="background-color:white">\
	<div class="col-md-12">\
	<div class="content" style="padding: 25px;">\
	  <form method="get" action="/" class="form-horizontal">\
	  <legend  v-if="customer.ID == undefined">Add New Customer</legend>\
	  <legend v-else>Customer</legend>\
		<fieldset>\
		  <div class="form-group">\
	        <div class="col-sm-10">\
			  <div class="input-group">\
				<span class="input-group-addon">Name</span>\
				<input  type="text" class="form-control" v-model="customer.NAME">\
				<span class="input-group-addon">Last Name</span>\
				<input  type="text" class="form-control" v-model="customer.LASTNAME">\
			  </div>\
			</div>\
		  </div>\
		</fieldset>\
		<fieldset>\
		  <div class="form-group">\
			<div class="col-sm-10">\
			  <div class="input-group">\
				<span class="input-group-addon">Address</span>\
				<input type="text" class="form-control" v-model="customer.ADDRESS">\
	  			<span class="input-group-addon"></span>\
			  </div>\
			</div>\
		  </div>\
	    </fieldset>\
		<fieldset>\
	      <div class="form-group">\
			<div class="col-sm-10">\
			  <div class="input-group">\
				<span class="input-group-addon">City</span>\
				<input type="text" class="form-control" v-model="customer.CITY">\
				<span class="input-group-addon">Postal</span>\
				<input type="text" class="form-control" v-model="customer.POSTAL_CODE">\
			  </div>\
			</div>\
		  </div>\
		</fieldset>\
		<fieldset>\
		  <div class="form-group">\
	        <div class="col-sm-10">\
			  <div class="input-group">\
				<span class="input-group-addon">Phone</span>\
				<input  type="text" class="form-control" v-model="customer.PHONE">\
				<span class="input-group-addon">E-Mail</span>\
				<input  type="text" class="form-control" v-model="customer.EMAIL">\
			  </div>\
			</div>\
		  </div>\
		</fieldset>\
		<fieldset>\
		  <div class="form-group">\
			<div class="col-sm-10">\
			  <div class="input-group">\
				<span class="input-group-addon">File Upload</span>\
	  			<input type="file"  class="form-control" @change="onFileChange">\
	            <span class="input-group-addon"></span>\
			  </div>\
			</div>\
		  </div>\
	    </fieldset>\
		<fieldset>\
		  <div class="form-group">\
	        <div class="col-sm-10">\
			  <div class="input-group">\
				<span class="input-group-addon">Notes</span>\
				<textarea rows="5" cols="25"  type="text" class="form-control">{{customer.MISC}}</textarea>\
				<span class="input-group-addon"></span>\
	  		 </div>\
		    </div>\
		   </div>\
		</fieldset>\
	 </form>\
  </div>\
  </div>\
  <div class="col-md-12">\
	<hr>\
	<div class="content">\
	  <button class="btn btn-primary btn-fill" @click="saveCustomer">Save</button>\
	<!--  <button class="btn btn-primary btn-fill" @click="prevCustomer">Previous</button>\
	  <button class="btn btn-primary btn-fill" @click="nextCustomer">Next</button>-->\
	  <button class="btn btn-primary btn-fill" @click="closeCustomer">Close</button>\
	  </a>\
	</div>\
	<br>\
	<br>\
  </div>\
  <div id="result"></div>\
</div>\
',


  methods: {   	
	
    closeCustomer: function () {
    	showTogglePanel()
	},
	nextCustomer: function () {
		  customer = this.$parent.nextCustomer(customer.ID);
	},
	prevCustomer:  function () {		  
		  customer = this.$parent.prevCustomer(customer.ID);
	},
	saveCustomer: function () {
		 var vm = this
		 axios.post(vm.url,  vm.customer)  
		      .then(function (response) {
		      	  // populate global variable quickbill
		      	 console.log(response.data)
		      	 if( isString(response.data) ) {
		      		showError(response.data)
		      	 } else {  // refresh grid only if we  add new user
		      	   if( vm.customer.ID == undefined ) showClients()
		      	  }

		      })
		      .catch(function (error) {
		     	 showError(error)
		      })
      showTogglePanel()
	},
    	onFileChange(e) {
	      var files = e.target.files || e.dataTransfer.files;
	      if (!files.length) return;
	      this.createBinaryImage(files[0]);
	    },
	    createBinaryImage(file) {
	        var image = new Image();
	        var reader = new FileReader();
	        var vm = this;
	        reader.onload = (e) => {
	          // contains Base64 encoded image	 
	          vm.customer.BLOB = e.target.result;
	        };
	        reader.readAsDataURL(file);
	      },
	      removeImage: function (e) {
	    	  this.customer.MISC.image = '';
	      } 
  }  	

})

