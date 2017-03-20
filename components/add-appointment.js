Vue.component('add-appointment', {
	  props: {
		  appointment: Object,
		  url: String
	  },
  template:
	  '<div id="sidebar-wrapper" style="background-color:white">\
		<div class="col-md-12">\
		<div class="content" style="padding: 25px;">\
		  <form method="get" action="/" class="form-horizontal">\
		  <legend  v-if="appointment.ID == undefined">Add New Appointment</legend>\
		  <legend v-else>Appointment</legend>\
		  <fieldset>\
			  <div class="form-group">\
		        <div class="col-sm-10">\
				  <div class="input-group">\
					<span class="input-group-addon">Title</span>\
					<input  type="text" class="form-control" v-model="appointment.TITLE">\
				  </div>\
				</div>\
			  </div>\
			</fieldset>\
			<fieldset>\
			  <div class="form-group">\
		        <div class="col-sm-10">\
				  <div class="input-group">\
					<!--<span class="input-group-addon">Day</span>-->\
					<input  type="text" class="form-control" v-model="appointment.WEEKDAY">\
					<span class="input-group-addon">Start time</span>\
					<input  type="text" class="form-control" v-model="appointment.START_TIME">\
					<span class="input-group-addon">End time</span>\
					<input  type="text" class="form-control" v-model="appointment.END_TIME">\
				  </div>\
				</div>\
			  </div>\
			</fieldset>\
	        <!--<fieldset>\
	  			<select id="sellers" data-placeholder="Choose a Seller..." class="chosen-select" multiple style="width:350px;" tabindex="4">\
	  				<option value=""></option>\
	  				<option value="United States">United States</option>\
	  				<option value="United Kingdom">United Kingdom</option>\
	  				<option value="Afghanistan">Afghanistan</option>\
	  				<option value="Albania">Albania</option>\
	  				<option value="Algeria">Algeria</option>\
	  				<option value="American Samoa">American Samoa</option>\
	  				<option value="Andorra">Andorra</option>\
	  				<option value="Angola">Angola</option>\
	  				<option value="Anguilla">Anguilla</option>\
	  			</select>\
	  		<br /><br />\
	  		<select id="first" data-placeholder="Choose a Country..." class="chosen-select" multiple style="width:350px;" tabindex="4">\
	  				<option value=""></option>\
	  				<option value="United States">United States</option>\
	  				<option value="United Kingdom">United Kingdom</option>\
	  				<option value="Afghanistan">Afghanistan</option>\
	  				<option value="Albania">Albania</option>\
	  				<option value="Algeria">Algeria</option>\
	  				<option value="American Samoa">American Samoa</option>\
	  				<option value="Andorra">Andorra</option>\
	  				<option value="Angola">Angola</option>\
	  				<option value="Anguilla">Anguilla</option>\
	  		</select>\
	        <br/><br/>\
		    </fieldset>-->\
	        <fieldset>\
			  <div class="form-group">\
		        <div class="col-sm-10">\
				  <div class="input-group">\
					<span class="input-group-addon">Details</span>\
					<textarea rows="5" cols="25"  type="text" class="form-control">{{appointment.DETAILS}}</textarea>\
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
		  <button class="btn btn-primary btn-fill" @click="saveAppointment">Save</button>\
		<!--  <button class="btn btn-primary btn-fill" @click="prevSeller">Previous</button>\
		  <button class="btn btn-primary btn-fill" @click="nextSeller">Next</button>-->\
		  <button class="btn btn-primary btn-fill" @click="close">Close</button>\
		  </a>\
		</div>\
		<br>\
		<br>\
	  </div>\
	  <div id="result"></div>\
	</div>'
	  ,


	  methods: {   	
		
	    close: function () {
	    	showTogglePanel()
		},

		saveAppointment: function () {
			 var vm = this
			 axios.post(vm.url,  vm.appointment)  
			      .then(function (response) {
			      	  // populate global variable quickbill
			      	 console.log(response.data)
			      	 if( isString(response.data) ) {
			      		showError(response.data)
			      	 } else {  // refresh grid only if we  add new user
			      	   if( response.data.success ) showAppointments()
			      	  }

			      })
			      .catch(function (error) {
			     	 showError(error)
			      })
	      showTogglePanel()
		},
		
	  }  	
  
})