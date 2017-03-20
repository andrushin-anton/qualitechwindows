Vue.component('quick-bill', {
  props: {
	  qb: Object

  },
  template:'\
  <div id="sidebar-wrapper" style="background-color:white">\
	<div class="col-md-12">\
	<div class="content" style="padding: 25px;">\
	  <form method="get" action="/" class="form-horizontal">\
		<fieldset>\
		  <legend>Quick Bill</legend>\
		  <div class="form-group">\
			<label class="col-sm-2 control-label">ID</label>\
			<div class="col-sm-10">\
			  <p class="form-control-static">{{qb.InvoiceId}}</p>\
			</div>\
		  </div>\
		  <div class="form-group"> \
			<label class="col-sm-2 control-label"> Mark + / -</label>\
			<div class="col-sm-10">\
			  <input type="number" v-model="qb.Mark" @keyup="qb.AmountBilled=qb.Amount+qb.Mark; calculateQuickBill(qb)"  class="form-control">\
			</div>\
		  </div>\
		</fieldset>\
		<fieldset>\
		  <div class="form-group">\
		  <label class="col-sm-2 control-label">Final Bill Total</label>\
			<div class="col-sm-4">\
			  <div class="input-group">\
				<span class="input-group-addon">$</span>\
				<input type="number" class="form-control" v-model="qb.Amount" disabled="true">\
				<span class="input-group-addon"></span>\
			  </div>\
			</div>\
		  </div>\
		  <div class="form-group">\
			<label class="col-sm-2 control-label">Final Bill At</label>\
			<div class="col-sm-4">\
			  <div class="input-group">\
				<span class="input-group-addon">$</span>\
				<input  type="number" class="form-control" v-model="qb.AmountBilled" @keyup="calculateQuickBill(qb);qb.Mark = qb.AmountBilled - qb.Amount">\
				<span class="input-group-addon"></span>\
			  </div>\
			</div>\
		  </div>\
		</fieldset>\
		<fieldset>\
		  <legend>Tax Assignment</legend>\
		  <div class="form-group">\
			<div class="col-sm-10">\
			  <div class="row">\
				<div class="col-md-3">\
				  <h5>{{qb.TaxLabels[0]}}</h5>\
				  <input type="text" v-model="qb.Taxes[0]" class="form-control">\
				</div>\
				<div class="col-md-4">\
				  <h5>{{qb.TaxLabels[1]}}</h5>\
				  <input type="text" v-model="qb.Taxes[1]" class="form-control">\
				</div>\
				<div class="col-md-5">\
				  <h5>{{qb.TaxLabels[2]}}</h5>\
				  <input type="text"  v-model="qb.Taxes[2]" class="form-control" title="asa">\
				</div>\
			  </div>\
			</div>\
		  </div>\
		</fieldset>\
		<fieldset>\
		  <legend>Invoice Information</legend>\
		  <div class="form-group">\
			<label class="col-sm-2 control-label">Invoice Number</label>\
			<div class="col-sm-10">\
			  <input type="text" class="form-control" v-bind:placeholder="qb.InvoiceNum">\
			</div>\
		  </div>\
		</fieldset>\
	 </form>\
  </div>\
  </div>\
  <div class="col-md-12">\
	<hr>\
	<div class="content">\
	  <button class="btn btn-primary btn-fill" @click="saveBillParagraph">Save</button>\
	  <button class="btn btn-primary btn-fill" @click="prevQuickBill">Previous</button>\
	  <button class="btn btn-primary btn-fill" @click="showBillParagraph">Next</button>\
	  <button class="btn btn-primary btn-fill" @click="closeQuickBill">Close</button>\
	  </a>\
	</div>\
	<br>\
	<br>\
	<br>\
	<br>\
  </div>\
  <div id="result"></div>\
</div>\
',


  methods: {   	
	calculateQuickBill: function(qb){
	 console.log("qb: "+ qb);
	 qb.Taxes[0] =  (qb.TaxAmounts.Taxable[0]) ? qb.Amount * qb.ClientsTaxRates[0]: 0.0;
	 qb.Taxes[1] =  (qb.TaxAmounts.Taxable[1]) ? (qb.Amount + qb.Taxes[0]) * qb.ClientsTaxRates[1]: 0.0;
	 qb.Taxes[2] =  (qb.TaxAmounts.Taxable[2]) ? qb.Amount * qb.ClientsTaxRates[2]: 0.0;
  },
    closeQuickBill: function () {
		$("#wrapper").toggleClass("toggled");
	},
	showBillParagraph: function () {
		  var id = this.qb.ClientEngagmentIds[0];
	      this.$parent.showBillParagraph(id);
	},
	saveBillParagraph: function () {
		  var id = 0;
	     // this.$parent.saveBillParagraph(id);
	},
	prevQuickBill:  function () {
		  var id = 0;
		     // this.$parent.saveBillParagraph(id);
	}
  } 
,
 created: function() {

	 console.log("qb: "+ this.qb);
 	    this.qb.AmountBilled=this.qb.Amount+this.qb.Mark;
		this.calculateQuickBill(this.qb);
		console.log("qb: " + this.qb);
	}
	
  
})

