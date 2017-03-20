const appntmHeight = 50; // Height of 1 hour appointment in pixels

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

schedule = Vue.component('appointments', {
	props: {
    currApp: Object,
    sellers: Array,
    filterKey: String,
    year: {
		type: Number,
    	default(){ return (new Date()).getFullYear() }
    },
    weekNum: {
		type: Number,
		default(){ return (new Date()).getWeek() }
	},
		timeGround: {
    	type: Array,
   		default: function () {
             return [
						"09:00",
						"10:00",
						"12:00",
						"14:00",
						"16:00",
						"18:00",
						"20:00",
						"21:00",
					]
        }
		},
		weekGround: {
			type: Array,
				default: function () {
             return [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			]
     }
		},
		taskDetails: {
			type: Array,
				default(){return [] }
		},
		color: {
			type: Array,
			default(){
				return [
					"#2B2E4A",
					"#521262",
					"#903749",
					"#53354A",
					"#40514E",
					"#537780",
				]

			}
		}
	},
	
	template:'\
  <div>\
		 <h2>Appointments</h2>\
		  <p>\<a href="#" @click="toggleAppointments">{{ checked? \'show\': \'hide\'}} appointments</a>\</p>\
		<table style="width:100%">\
		</table>\
		  <table class="table-responsive table-bordered" border="1">\
		     <thead>\
		      <tr>\
		        <td style="width:4%"></td>\
		        <td v-for="(week, weekIndx) in weekGround" >\
					<p>{{getDateOfTheWeek(weekIndx,weekNum, 2017)}}</p>\
				</td>\
			  </tr>\
			</thead>\
		    <!-- to debug only week: {{weekIndx}} -->\
	        <tr v-for="(time, tfIndx) in timeGround" v-if="tfIndx != timeGround.length-1">\
		        <td style="width:4%">\
		          <span>{{time}} - {{timeGround[tfIndx+1]}} </span>\
		          <p :style="timeListSty"></p>\
		        </td>\
		        <td v-for="(week, weekIndx) in weekGround" style="width:14.3%">\
		             <a href="#" v-if="checkAvailability(time,weekIndx)" @click="addApp(tfIndx,week,weekIndx)">{{checkAvailability(time,weekIndx)}} Available app</a>\
	              	 <!-- <template  v-for="seller in sellers">\
		                <a href="#" v-if="checkAvailability(timeGround[tfIndx],weekIndx,week,seller)" @click="addApp(tfIndx,week,weekIndx,seller.ID)">{{seller.LASTNAME}}</a></br>\
		             </template>-->\
		             <template  v-for="detail in filteredData[weekIndx]">\
		   				 <div  v-if="detail.START_TIME==time" v-show="!checked" :style="detail.styleObj" @click="showDetail(detail, week)">\
							<bold>{{detail.TITLE}}</bold>\
							<bold v-if="detail.SELLER_ID">{{sellerLastName(detail.SELLER_ID)}}</bold>\
		                  </div>\
						</template>\
		        </td>\
			  </tr>\
		</table>\
     </div>'
	,
	data() {
		return {

      checked:false, 
			showModal: false,
	/*		showModalDetail:  {
			    WEEKDAY: 'Friday',
				START_TIME: '15:30',
				END_TIME: '17:30',
				TITLE: 'Metting',
				DETAILS: 'TEST.'
			},
	*/		
			taskListSty: {
				height:   appntmHeight * this.timeGround.length - 50 + 'px'
			},
			timeListSty: {
				width: '100%'
			}	
		}
	},
	computed : {
	    filteredData: function () {
	    	  var filterKey = this.filterKey && this.filterKey.toLowerCase()
	          var  data = this.genAppntmnts()
 	         if (filterKey) {
	           let _data = []
	           for( var i = 0; i < data.length; i++ ){
    	        	_data[i] = data[i].filter(function (row) {
    		           return Object.keys(row).some(function (key) {
    		            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
    		          })
    		        })
    		         
    		     }
	           data = _data
	          }

/*		      if (sortKey) {

		        data = data.slice().sort(function (a, b) {
		          a = a[sortKey]
		          b = b[sortKey]
		          return (a === b ? 0 : a > b ? 1 : -1) * order
		        })
		      }
*/
	          return data
		    },
	    

	},
	
	created() {
	//	this.genAppntmnts()
	},
	compiled() {
		this.taskListSty.height = (this.timeGround.length - 1) * appntmHeight + 'px';
		this.timeListSty.width = this.weekGround.length * 20 + '%';
		
		// console.log(this.taskDetails);
		// console.log(this.weekGround);
	},
	methods: {
		sellerLastName(sellerId) {
			if(sellerId)
			for(let i = 0; i < this.sellers.length ; i++) {
				if(this.sellers[i].ID == sellerId) return this.sellers[i].LASTNAME;
			} 
		},
		genAppntmnts: function(){
			// console.log(this.ta)
			let maxTime = this.timeGround[this.timeGround.length - 1];
			let minTime = this.timeGround[0];

			let maxMin = maxTime.split(':')[0] * 60 + maxTime.split(':')[1] * 1;
			let minMin = minTime.split(':')[0] * 60 + minTime.split(':')[1] * 1;

			// console.log(maxMin);
			// console.log(minMin);

			// console.log(maxTime);
			for (let i = 0; i < this.taskDetails.length; i++) {
			    for (let j = 0; j < this.taskDetails[i].length; j++) {

			    	// console.log(this.taskDetails[i][j]);
			    	
			    	if( this.taskDetails[i][j] == null ) continue

			        let startMin = this.taskDetails[i][j].START_TIME.split(':')[0] * 60 + this.taskDetails[i][j].START_TIME.split(':')[1] * 1;
			        let endMin = this.taskDetails[i][j].END_TIME.split(':')[0] * 60 + this.taskDetails[i][j].END_TIME.split(':')[1] * 1;

			        if(startMin < minMin || endMin > maxMin) {
			        	this.taskDetails[i].splice(j, 1);
			        	j--;
			        	continue
			        };
			        // console.log(endMin);

			        let difMin = endMin - startMin;
			        // console.log(startMin);
			        // console.log(endMin);

			        this.taskDetails[i][j].styleObj = {
			           // height: difMin * appntmHeight / 60 + 'px',
			            height: '50px',
			            marginTop: '2px' ,
			            top: ((startMin - (this.timeGround[0].split(":")[0] * 60 + this.timeGround[0].split(":")[1] * 1)) * appntmHeight / 60) + appntmHeight/2 + 'px',
			            // backgroundColor: this.color[~~(Math.random() * this.color.length)]
			            backgroundColor: this.taskDetails[i][j].STATUS
			        }

			        // console.log(this.color[~~(Math.random() * 4)]);
			        // console.log(this.taskDetails);
			        // console.log(this.timeGround);
			    }
			}
			console.log(this.taskDetails);
			return this.taskDetails
		},
/*		
	     checkAvailability: function(timeFrame, weekDayIndx, weekDay,seller) {
		     // console.log('checkAvblt => timeFrame: '+ timeFrame +  ' weekDayIndx:' + weekDayIndx + ' weekDay:' + weekDay + " seller:" + seller.ID)
		     let ret = true 
		     if( this.taskDetails[weekDayIndx] && seller.ID ) 
	    	 for(let j=0; j< this.taskDetails[weekDayIndx].length; j++ )
	    	 {
	    	    if( this.taskDetails[weekDayIndx][j].SELLER_ID != null && this.taskDetails[weekDayIndx][j].START_TIME != timeFrame) continue	 
	    	    if( this.taskDetails[weekDayIndx][j].SELLER_ID == seller.ID){ 
	    		   ret = false
	    		   console.log('found for  timeFrame: '+ timeFrame +  ' weekDayIndx:' + weekDayIndx + ' weekDay:' + weekDay + " seller:" + seller.ID)
	    		   break
	    	    }
	    	 }	  
	      return ret
	     },	
*/
	     checkAvailability: function(timeFrame, weekDayIndx) {
		      console.log('checkAvblt => timeFrame: '+ timeFrame +  ' weekDayIndx:' + weekDayIndx )
		     let totalApps = 0 
		     
			     if( this.taskDetails[weekDayIndx] ) 
		    	 for(let j=0; j< this.taskDetails[weekDayIndx].length; j++ )
		    	 {
		    	    if( this.taskDetails[weekDayIndx][j].START_TIME != timeFrame) continue
		    	    totalApps++
		    	    if( totalApps >= this.sellers.length){ 
		    		   ret = 0
		    		   break
		    	    }
		    	 }
	      return  this.sellers.length - totalApps
	     },	

	     
	     
		getDateOfTheWeek: function(dayshift,w,y) {
		    let str = (new Date(y, 0, (1 + (w - 1) * 7) + 1 + dayshift)).toString()
		    let res = str.split(" ", 3)
		    console.log(res[0] +', '+ res[1] +' ' + res[2])   
		    return (res[0] +', '+ res[1] +' ' + res[2])
		},
		showDetail: function (obj, week){
			// console.log(week);
			obj.week = week;
		//	this.showModalDetail = obj;
			// this.showModalDetail.week = week;
        	msg_body = obj.week + "   " + obj.START_TIME + "-" + obj.END_TIME + "    " + obj.DETAILS
        	//this.currApp = obj
        	//this.currApp = Object.assign({}, this.currApp, obj)
        	// Prepare app for further saving
        	this.currApp.YEAR = this.year
        	this.currApp.WEEK = this.weekNum
        	this.currApp.WEEKDAY = obj.week
        	this.currApp.START_TIME = obj.START_TIME
        	this.currApp.END_TIME = obj.END_TIME
        	this.currApp.DETAILS = obj.DETAILS
        	this.currApp.TITLE = obj.TITLE
        	this.currApp.STATUS = obj.STATUS
			showMessage(obj.TITLE, msg_body,"Modify", showTogglePanel)
			console.log(this.showModalDetail);      
			// console.log(week);
		},
    toggleAppointments: function() {
      console.log ( 'toggleAppointments was clicked' )
      this.checked = !this.checked
     // this.$parent.$emit('showAppointments',this.checked)
    },
    
    addApp: function(tfIndx,weekDay,weekDayIndx){
      event.currentTarget.style.visibility = 'hidden'
      console.log(' add => timeFrame: '+ this.timeGround[tfIndx-1] + ' ,weekDay: ' + weekDay + " weekDayIndx:" + weekDayIndx )
      let newapp = { "WEEKDAY": "", "START_TIME": "","END_TIME": "", "TITLE": "","DETAILS": ""}
      newapp.START_TIME = this.timeGround[tfIndx]    
      newapp.END_TIME =  this.timeGround[tfIndx + 1]
      newapp.STATUS = 'brown'
    // newapp.SELLER_ID = sellerId
       	  
      if( newapp.START_TIME == "20:00" ) newapp.END_TIME = "21:00"
        else if( newapp.START_TIME == "09:00" ) newapp.END_TIME = "10:00"
    	  
      newapp.WEEKDAY = weekDay //this.weekGround[weekDayIndx - 1]
      this.taskDetails[weekDayIndx].push(newapp)
      showTogglePanel()
      
    },
    

	}
	  
})
