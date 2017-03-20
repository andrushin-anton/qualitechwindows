
// register the grid component
	Vue.component('sellers-grid', {
		  props: {
			    header: String,
			    data: Array,
			    columns: Array,
			    labelColumns: Array,
			    labels: Array,
			    filterKey: String
			  },
	  template: '<table id="list-tps" class="table table-striped table-hover" style="border-collapse:collapse;">\
		  <paginate name="filteredData" :per="7" :list="filteredData"></paginate>\
		  <thead>\
		<tr id=links>\
		 <td :colspan="labelColumns.length">\
		    <paginate-links for="filteredData" :limit="2" :show-step-links="true" class="pagination"></paginate-links>\
		   <!-- <paginate-links for="filteredData" :simple="{next: \'Next »\', prev: \'« Back\'}"></paginate-links>-->\
		 </td>\
		</tr>\
			<tr class="toolbar">\
		 <h4>&nbsp;&nbsp;<b>{{header}}</b> <img src="assets/images/icon_billing_title.png"></h4>  <!--        Here you can write extra buttons/actions for the toolbar              -->\
		</tr>\
		    <tr>\
		     <th v-for="(key, index) in labelColumns"\
		        @click="sortBy(key)"\
		        :class="{ active: sortKey == key }">\
		        {{ labels[index] | capitalize }}\
		        <span class="arrow" :class="sortOrders[key] > 0 ? \'asc\' : \'dsc\'">\
		        </span>\
		      </th>\
		    </tr>\
		  </thead>\
		  <tbody>\
		<template v-for="(entry, index) in paginated(\'filteredData\')">\
		     <tr data-toggle="collapse" :data-target="\'#demo\'+ index" class="accordion-toggle">\
				 <td style="padding-left: 10px;"><strong>{{entry[\'LOGINNAME\']}}</strong></td>\
			 	 <td class="text-important"> {{entry[\'LASTNAME\']}}</td>\
				 <td class="text-important"> {{entry[\'NAME\']}}</td>\
				 <td class="text-important"> {{entry[\'PHONE\']}}</td>\
			    </tr>\
		      <tr>\
					<td :colspan="labelColumns.length"  class="hiddenRow">\
					   <div :id="\'demo\'+index" class="accordion-body collapse"  style="padding-left: 5px; padding-top:15px;  background: #fff;border-left: 3px solid #379AFF; ">\
						 <ul class="text-muted" style="list-style: none;columns: 2;-webkit-columns: 2;-moz-columns: 2;width:100%;padding-right: 50%;padding-left: 3%;">\
		             <!--	<li><h6>Address:  {{entry[\'ADDRESS\']}} </h6></li>\
							<li><h6>Email:  {{entry[\'EMAIL\']}} </h6></li> -->\
						 </ul>\
		                   <a title="Seller"  class="btn btn-simple btn-info table-action edit">\
					       <i class="fa fa-edit" @click="showSeller(entry);"></i>\
					       <i class="fa fa-book" @click="showSeller(entry);"></i>\
					       <i class="fa fa-ellipsis-h" @click="showSeller(entry);"></i>\
					       <i class="fa fa-bar-chart" @click="showSeller(entry);"></i>\
					       <i class="fa fa-trash-o" @click="deleteRecord(entry[\'ID\']);"></i>\
					     </a>\
				      </div>\
					</td>\
				</tr>\
		  </template>\
		</tbody>\
		</table>',
	
	  data: function () {
	    var sortOrders = {}
	    this.columns.forEach(function (key) {
	      sortOrders[key] = 1
	    })
	    return {
	      sortKey: '',
	      paginate: ['filteredData'],	
	      sortOrders: sortOrders
	    }
	  },
	  components: {
		  Paginate: VuePaginate 
	  },
	
	  computed: {
	    filteredData: function () {
	      var sortKey = this.sortKey
	      var filterKey = this.filterKey && this.filterKey.toLowerCase()
	      var order = this.sortOrders[sortKey] || 1

          var data = this.data

	      if (filterKey) {
	        data = data.filter(function (row) {
	          return Object.keys(row).some(function (key) {
	            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
	          })
	        })
	      }
	      if (sortKey) {

	        data = data.slice().sort(function (a, b) {
	          a = a[sortKey]
	          b = b[sortKey]
	          return (a === b ? 0 : a > b ? 1 : -1) * order
	        })
	      }
	      return data
	    }
	  },
	  filters: {
	    capitalize: function (str) {
	      return str.charAt(0).toUpperCase() + str.slice(1)
	    }
	  },
	  methods: {
		deleteRecord: function (id) {
			exequteSQLstmnt("DELETE FROM login WHERE SELLER_ID="+ id)
			exequteSQLstmnt("DELETE FROM sellers WHERE ID="+ id)
		},
		showSeller: function (seller) {
	      this.$parent.newseller = seller
	      showTogglePanel()
 		},  
	    sortBy: function (key) {
	      this.sortKey = key
	      this.sortOrders[key] = this.sortOrders[key] * -1
	    }
	  }
	})
