Vue.component('b-paragraph', {
  props: ['bp','pi'],
  template:'\
	  <div class="col-md-12">\
	  <div class="content" style="padding: 25px;">\
	      <fieldset>\
	        <legend>Billing Paragraphs</legend>\
	      </fieldset>\
	      <!-- plain taxt tabs -->\
	      <!-- tabs with icons -->\
	      <ul role="tablist" class="nav nav-tabs">\
	        <li role="presentation" class="active">\
	          <a href="#description" data-toggle="tab"><i class="fa fa-clock-o"></i> Descriptions</a>\
	        </li>\
	        <li>\
	          <a href="#library" data-toggle="tab"><i class="fa fa-cube"></i> Library of Paragraphs</a>\
	        </li>\
	        <li>\
	          <a href="#past-invoices" data-toggle="tab"><i class="fa fa-hdd-o"></i> Past Invoices</a>\
	        </li>\
	      </ul>\
	      <br>\
	      <br>\
	      <div class="tab-content">\
	        <div id="description" class="tab-pane active">\
	          <table class="table table-bordered ">\
	            <thead>\
	              <tr>\
	                <th class="text-center">Date</th>\
	                <th>Employee</th>\
	                <th>Work Code</th>\
	                <th class="text-right">Hours</th>\
	                <th class="text-right">Amount</th>\
	              </tr>\
	            </thead>\
	            <tbody>\
	  			 <template v-for="entry in bp.BillDetails">\
	              <tr>\
	                <td class="text-center" rowspan="2">{{entry.TimesEntry.Start}}</td>\
	                <td>{{entry.TimesEntry.EmployeeId}}</td>\
	                <td>{{entry.TimesEntry.WorkCode}}</td>\
	                <td class="text-right">{{entry.TimesEntry.Hours}}</td>\
	                <td class="text-right">{{entry.TimesEntry.Amount}}</td>\
	              </tr>\
	              <tr>\
	                <td colspan="4">\
	                  <label>Work Code Description\
	                    <button type="button" rel="tooltip" title="Send Down" class="btn btn-simple btn-xs disabled">\
	                      <i class="fa fa-arrow-down"></i>\
	                    </button>\
	                  </label>\
	                  <br> {{entry.TimesEntry.Description}}</td>\
	              </tr>\
	             </template>\
	            </tbody>\
	          </table>\
	          <hr>\
	          <div class="control-group">\
	            <div class="controls">\
	              <div class="input-append">\
	                <label class="control-label">Billed Amount</label><span class="add-on" name="loanAmount1Cur"> $ </span>\
	                <input class="span2" name="loanAmount1" v-model:value="bp.FinalBill" type="text">\
	                <br>\
	                <label class="control-label">Amount Remaining</label><span class="add-on" name="loanAmount1Cur"> $ </span>\
	                <input class="span2" name="loanAmount1" type="text" v-model:value="bp.FinalBillAt">\
	              </div>\
	            </div>\
	          </div>\
	          <hr>\
	          <table class="table table-bordered table-hover">\
	            <thead>\
	              <tr>\
	                <th class="text-center">Number</th>\
	                <th>Description</th>\
	                <th>Amount</th>\
	                <th class="text-right">Actions</th>\
	              </tr>\
	            </thead>\
	            <tbody>\
	              <tr>\
	                <td class="text-center">1</td>\
	                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>\
	                <td class="text-right">$ 99,22</td>\
	                <td class="td-actions text-right">\
	                  <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">\
	                    <i class="fa fa-times"></i>\
	                  </button>\
	                </td>\
	              </tr>\
	            </tbody>\
	          </table>\
	        </div>\
	        <div id="library" class="tab-pane">\
	          <table class="table table-bordered table-hover">\
	            <thead>\
	              <tr>\
	                <th class="text-center">Paragraph ID</th>\
	                <th>Description</th>\
	              </tr>\
	            </thead>\
	            <tbody>\
	              <tr v-for="entry in bp.ParagraphsLibrary">\
	                <td class="text-center">{{entry.ID}}</td>\
	                <td>{{entry.Description}}</td>\
	              </tr>\
	            </tbody>\
	          </table>\
	        </div>\
	        <div id="past-invoices" class="tab-pane">\
	          <table class="table table-bordered ">\
	            <thead>\
	              <tr>\
	                <th class="text-center">Invoice #</th>\
	                <th>Paragraph Description</th>\
	                <th>Amount</th>\
	                <th class="text-right">Date</th>\
	              </tr>\
	            </thead>\
	            <tbody>\
	              <tr v-for="entry in pi">\
	                <td class="text-center">{{entry.InvoiceNum}}-{{entry.InvoiceCode}}</td>\
	                <td>{{entry.Description}}</td>\
	                <td>$ {{entry.Amount}} </td>\
	                <td class="text-right">{{entry.BillDate}}</td>\
	              </tr>\
	            </tbody>\
	          </table>\
	        </div>\
	      </div>'
	  ,


  methods: {   	
 
  } 
,
 created: function() {

  }
	
  
})