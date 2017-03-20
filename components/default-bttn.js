// register the grid component


Vue.component('default-bttn', {
		  props: {
			    name: String,
			  },
		 template: '\
		  <div>\
		   <a href="#menu-toggle" v-if="name == this.$parent.customers_txt">\
			   <img src="assets/images/btn_quick_bil_mini.png" v-on:click ="bttnClick" style="padding-left: 5px;">\
		   </a>\
		   <a href="#menu-toggle" v-if="name == this.$parent.sellers_txt">\
			 <img src="assets/images/btn_b_paragraph.png" v-on:click ="bttnClick" style="padding-left: 5px;">\
		   </a>\
		  <div>'
			 ,
			 
			 created: function(){
			//	console.log("--------------- Vue.component(default-bttn) registration On create -------- " )
			//	console.log(' name: ' + this.name)
			//	console.log(' quickbill_txt: ' + this.quickbill_txt)
			 },
			    methods: {
			    	// calling "parent" instance method
			      	 bttnClick: function () {
		//	      		console.log("--------------- Vue.component(default-bttn) bttnClick method -------- " )
		//	      		console.log(' bttnClick: ' + this.name)
			      		this.$parent.bttnClick();
			      	 }
			       }	 
	});		 