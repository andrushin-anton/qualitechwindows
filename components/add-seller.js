Vue.component('add-seller', {
	  props: {
		  seller: Object,
		  url: String
	  },
  template:
	  '<div id="sidebar-wrapper" style="background-color:white">\
		<div class="col-md-12">\
		<div class="content" style="padding: 25px;">\
		  <form method="get" action="/" class="form-horizontal">\
		  <legend  v-if="seller.ID == undefined">Add New Seller</legend>\
		  <legend v-else>Seller</legend>\
			<fieldset>\
			  <div class="form-group">\
		        <div class="col-sm-10">\
				  <div class="input-group">\
					<span class="input-group-addon">Name</span>\
					<input  type="text" class="form-control" v-model="seller.NAME">\
					<span class="input-group-addon">Last Name</span>\
					<input  type="text" class="form-control" v-model="seller.LASTNAME">\
				  </div>\
				</div>\
			  </div>\
			</fieldset>\
			<fieldset>\
		      <div class="form-group">\
				<div class="col-sm-10">\
				  <div class="input-group">\
					<span class="input-group-addon">Login</span>\
					<input type="text" class="form-control" v-model="seller.LOGINNAME">\
					<span class="input-group-addon">PASSWORD</span>\
					<input type="text" class="form-control" v-model="seller.PASSWORD">\
				  </div>\
				</div>\
			  </div>\
			</fieldset>\
			<fieldset>\
			  <div class="form-group">\
		        <div class="col-sm-10">\
				  <div class="input-group">\
					<span class="input-group-addon">Phone</span>\
					<input  type="text" class="form-control" v-model="seller.PHONE">\
					<span class="input-group-addon">E-Mail</span>\
					<input  type="text" class="form-control" v-model="seller.EMAIL">\
				  </div>\
				</div>\
			  </div>\
			</fieldset>\
			<fieldset>\
			  <div class="form-group">\
		        <div class="col-sm-10">\
				  <div class="input-group">\
					<span class="input-group-addon">Notes</span>\
					<textarea rows="5" cols="25"  type="text" class="form-control">{{seller.MISC}}</textarea>\
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
		  <button class="btn btn-primary btn-fill" @click="saveSeller">Save</button>\
		<!--  <button class="btn btn-primary btn-fill" @click="prevSeller">Previous</button>\
		  <button class="btn btn-primary btn-fill" @click="nextSeller">Next</button>-->\
		  <button class="btn btn-primary btn-fill" @click="closeSeller">Close</button>\
		  </a>\
		</div>\
		<br>\
		<br>\
	  </div>\
	  <div id="result"></div>\
	</div>'
	  ,


	  methods: {   	
		
	    closeSeller: function () {
	    	showTogglePanel()
		},
		nextSeller: function () {
			  seller = this.$parent.nextSeller(seller.ID);
		},
		prevSeller:  function () {		  
			  seller = this.$parent.prevSeller(seller.ID);
		},
		saveSeller: function () {
			 var vm = this
			 axios.post(vm.url,  vm.seller)  
			      .then(function (response) {
			      	  // populate global variable quickbill
			      	 console.log(response.data)
			      	 if( isString(response.data) ) {
			      		showError(response.data)
			      	 } else {  // refresh grid only if we  add new user
			      	   if( vm.seller.ID == undefined ) showSellers()
			      	  }

			      })
			      .catch(function (error) {
			     	 showError(error)
			      })
	      showTogglePanel()
		},
		
	  }  	
  
})