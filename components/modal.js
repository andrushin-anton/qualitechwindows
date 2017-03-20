//register modal component
Vue.component('modal', {
  props: {
	  header: String,
	  body: String,
	  footer: String,
	  action: Array,
  },
  template:'\
	  <div id="modal-mask">\
	  <div name="modal" class="modal-open">\
	  <div class="modal-dialog">\
	      <div class="modal-content">\
	            <div class="modal-header">\
	  			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
              	<h4 class="modal-title">{{header}}</h4>\
          </div>\
          <div class="modal-body">\
	{{body}}\
          </div>\
          <div class="modal-footer">\
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="$emit(\'close\')">Close</button>\
              <button type="button" class="btn btn-primary"  @click="actionCall">{{footer}}</button>\
          </div>\
      </div>\
  </div>\
</div>\
</div>\
',
  
 methods : {
	 actionCall: function() {
		 this.$emit('close')
		 let func =  this.action.pop()
		 func.call(null)
		 
	 }
 }

})

