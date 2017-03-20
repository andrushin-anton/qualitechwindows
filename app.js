Vue.config.debug = true;
Vue.config.silent = false;
Vue.config.async = false;
Vue.config.devtools = true;


const  customers_txt = "Customer";
const  sellers_txt = "Seller";
const  appointments_txt = "Appointment";
const app_name = "qualitechwindows";
//const host_name = "http://localhost";
//TODO remove to '' on production
const host_name = ""; 


const  logon_url = host_name + "logon.php";
const  customers_url = host_name + "customers.php";
const  sellers_url = host_name + "sellers.php";
const  appointments_url =  host_name + "appointments.php"
const  mergecustomer_url = host_name + "mergecustomer.php";
const  mergeseller_url = host_name + "mergeseller.php";
const  mergeappointment_url = host_name + "mergeappointment.php";
const  executestmnt_url= host_name + "executestmnt.php"; 


// Standard default message
const msg_header =  "Connection to Cloud service failed";
const msg = "Please make sure login/password is correct ";
const msg_footer = "For all technical questions call +1(800)-XXXXXXX";

var _taskDetails = [];

var actionStack = []

const dummyAppoint  = {

	 };

const new_customer = {"NAME":"","LASTNAME":"","ADDRESS":"appt, house - street", "MISC":"Enter some notes here ...","PHONE":"(780)-","EMAIL":"","POSTAL_CODE":"T5Y ","CITY":"Edmonton","BLOB":""};
const new_seller = {"LOGNNAME":"","PASSWORD":"","LASTNAME":"","NAME":"", "MISC":"Enter some notes here ...","PHONE":"(780)-","EMAIL":""};
const new_appointment = {"WEEKDAY": "", "START_TIME": "","END_TIME": "", "TITLE": "","DETAILS": ""}

// global functions
function isString(par) {
	 return  typeof par == "string" 
}	

function showError(error,onFooterClck) {
	  app.showModal = true
	  app.msg_header = "Server exception"
	  if(isString(error) ) app.msg = error 	   
	  else if ( error.data != undefined )  app.msg =  error.data.Message
	  else if (error.message != undefined) app.msg =  error.message
	  if(onFooterClck) app.actionStack.push(onFooterClck)
}

function showMessage(header, msg , footer, onFooterClck){
	  app.showModal = true
	  app.msg_header = header
	  app.msg = msg
	  app.msg_footer = footer
	  if(onFooterClck) app.actionStack.push(onFooterClck)
}

function showTogglePanel(){
 		//do the double toggling if new not default toggle panel opened
	 	//if( $("#wrapper.toggled")[0] && app.togglePanel != app.defaultPanel) $("#wrapper") .toggleClass("toggled")
	 	$("#wrapper") .toggleClass("toggled")
 		console.log('  app.togglePanel : ' + app.togglePanel );
	
}

function exequteSQLstmnt(sql){
	 this.loading = true
	 axios.post(executestmnt_url,sql)
     .then(function (response) {
     	  // populate global variable quickbill
     	 console.log(response.data)
     	 if( isString(response.data) ) {
     		showError(response.data)
     	 } else {  // refresh grid
     	  showClients()
     	  }
       app.loading = false
     })
     .catch(function (error) {
    	 showError(error)
    	 app.loading = false
     })
}

function doAxiosGet(url,data,callback,converter) {
	 this.loading = true
     axios.get(url) 
     .then(function (response) {
     	  // populate global variable quickbill
     	 console.log(response.data)
     	 // app instace already created
     	 //TODO fix bug with reactivity of Array
     	 if( isString(response.data) ) {
     	     app.showModal = true
     	 } 
     	 else {
  			 if(data.length) data.splice(0, data.length)
     		 if(converter){
     			data = data.push(... converter.call(data, response.data))
     		 } else {
      			data.push(... response.data)
     		 }	 
     			 
 	     } 
     	 app.loading = false
		     	
     })
     .catch(function (error) {
    	 showError(error)
         app.loading = false;
     })
	 if(callback) callback()
}

function showClients() {
	doAxiosGet(customers_url, app.customers)
	app.togglePanel = app.defaultGrid = customers_txt
}

function showSellers() {
	doAxiosGet(sellers_url, app.sellers)
	app.togglePanel = app.defaultGrid = sellers_txt
}


function showAppointments() {
	doAxiosGet(appointments_url, app.appointments, function(){
	if(app.sellers.length == 0 ) doAxiosGet(sellers_url, app.sellers)
	app.togglePanel = app.defaultGrid = appointments_txt
	})
}

var taskDetailsOneDim =                [ //Monday
                     					{   WEEKDAY: 'Monday',
                    						START_TIME: '09:30',
                    						END_TIME: '10:30',
                    						TITLE: 'Customer meeting',
                    						DETAILS: 'Customer meeting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France.',
                    						STATUS: 'green'
                    							
                    					},
                         	            {
                    						WEEKDAY: 'Monday',
                    						START_TIME: '11:30',
                    						END_TIME: '13:50',
                    						TITLE: 'Customer meeting',
                    						DETAILS: 'Customer meeting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France.',
                    						STATUS: 'green'
                    					},
                    				
                    				 // Tuesday
                    					{
                    						WEEKDAY: 'Tuesday',
                    						START_TIME: '10:30',
                    						END_TIME: '12:00',
                    						TITLE: 'Customer meeting',
                    						STATUS: 'green'
                    					},
                    					{
                    						WEEKDAY: 'Tuesday',
                    						START_TIME: '12:30',
                    						END_TIME: '14:50',
                    						TITLE: 'Customer meeting',
                    						STATUS: 'green'
                    					},
                    					{
                    						
                    					},
                    					{
                    						WEEKDAY: 'Thursday',
                    						START_TIME: '12:30',
                    						END_TIME: '14:50',
                    						TITLE: 'Customer meeting',
                    						STATUS: 'green'
                    					},
                    					{
                    						WEEKDAY: 'Friday',
                    						START_TIME: '12:30',
                    						END_TIME: '14:50',
                    						TITLE: 'Customer meeting',
                    						STATUS: 'green'

                    					},
                    				,
                    				]
 

/*
function convertArrays(cubes) {
	let last = cubes[0].WEEKDAY
	let ret = []
	let j = 0
	for(var i=0; i < 7 || j < cubes.length; i++){
		let k = 0
 	    ret[i] = []
		while( j < cubes.length ){
		 if( cubes[j] == undefined || cubes[j].WEEKDAY == undefined ) { j++ ; ret[++i] = []; continue } 
		 if( cubes[j].WEEKDAY != last ) break  
		 ret[i][k++] = cubes[j] 
		 last = cubes[j].WEEKDAY
   	     j++
		}
		if(j < cubes.length) last = cubes[j].WEEKDAY
	  }
	return ret
 }
    	
  */  	
var app = new Vue({
 el: '#app',
 data() {
		return {
 taskDetails:  
	[
               [ //Monday
					{
						START_TIME: '09:30',
						END_TIME: '10:30',
						TITLE: 'Customer meeting',
						DETAILS: 'Customer meeting Meet with John Baiden.'
					},
     	            {
						START_TIME: '11:30',
						END_TIME: '13:50',
						TITLE: 'Customer meeting',
						DETAILS: 'Customer meeting  Meet with John Flaws.'
					},
				],
				[ // Tuesday
					{
						START_TIME: '10:30',
						END_TIME: '12:00',
						TITLE: 'Customer meeting',
					},
					{
						START_TIME: '12:30',
						END_TIME: '14:50',
						TITLE: 'Customer meeting',
					}
					
				],
				[ // Wendsday
					{
						START_TIME: '12:30',
						END_TIME: '13:30',
						TITLE: 'Customer meeting',
					},
					{
						START_TIME: '15:30',
						END_TIME: '16:50',
						TITLE: 'Customer meeting',
					}
					
				],
				[
					{
						START_TIME: '09:50',
						END_TIME: '10:50',
						TITLE: 'Customer meeting',
					},
					{
						START_TIME: '11:30',
						END_TIME: '13:50',
						TITLE: 'Customer meeting',
					}
					
				],
				[
					{
						START_TIME: '12:30',
						END_TIME: '13:30',
						TITLE: 'Customer meeting',
					},
					{
						START_TIME: '14:30',
						END_TIME: '15:50',
						TITLE: 'Customer meeting',
					}
				]
			],


	defaultPanel : customers_txt,
	sellers_txt : sellers_txt,
	customers_txt : customers_txt,
	appointments_txt : appointments_txt,
	
	logon_url : logon_url,
	customers_url : customers_url,
	sellers_url : sellers_url,
	mergecustomer_url : mergecustomer_url,
	mergeseller_url : mergeseller_url,
	mergeappointment_url : mergeappointment_url,
	
	// setup togglePanel to default toggle panel in this case it is  customers  
    togglePanel:  customers_txt,
    
	// new customer
	newcustomer: new_customer,
	// new seller
	newseller: new_seller,
	// new appointment 
	newappointment: new_appointment,
	
	customers: [], 
	sellers: [],
	appointments:[],
    // stack of actions which is applied for secuantual forms calls
	actionStack: actionStack,
	
	loading: false,
	isLoggedIn: false,
   // Modal message window attributes
    msg_header: msg_header,
    msg: msg,
	msg_footer: msg_footer,
	showModal:false,
	
	// grids
	defaultGrid: customers_txt,
	searchQuery: '',
	sellGridColumns: ['LOGINNAME', 'LASTNAME', 'NAME' ,'PHONE', 'MISC','EMAIL'] ,
	sellGridColumnNames: ['LOGINNAME','LASTNAME', 'NAME' ,'PHONE','EMAIL'] ,
	sellGridColumnsToShow: ['Login','Last Name', 'First Name' ,'Phone', 'E-Mail'],
	
	custGridColumns: [ 'ID', 'LASTNAME', 'NAME' ,'PHONE', 'CITY', 'POSTAL_CODE', 'ADDRESS', 'EMAIL', 'MISC'] ,
	custGridColumnNames: ['LASTNAME', 'NAME' ,'PHONE', 'CITY', 'POSTAL_CODE'] ,
	custGridColumnsToShow: ['Last Name', 'First Name' ,'Phone', 'City', 'Postal'],
   }
 },  

 
 created: function() {
	 console.log("Creation")
     },
 computed:  function()  {
    }, 
 methods: {
    	onLogedin: function(event) {
    		app.isLoggedIn = true
			showClients()	
    	},
    	onLoginfail: function(event) {
    		app.isLoggedIn = false
    	}, 
		
    	// default bttn click
      	 bttnClick: function () {
      		app.newcustomer = new_customer
      		app.newseller = new_seller
      		
      		showTogglePanel()
       	 }
       },	
 computed: {
	 populate: function () {
		  $("#wrapper") .toggleClass("toggled");
	 }
 }
       
})
/*.$on('showAppointments', function (isVisible) {
    console.log('isVisible: ' + isVisible)
    if(isVisible){ 
        _taskDetails = this.appointments
         this.appointments = [[],[],[],[],[],[],[]]
      } else {
      		//this.taskDetails = _taskDetails;
      		mergeBtoA(this.appointments, _taskDetails) // a=b
      }
})

function mergeBtoA(a,b){
		for(let i = 0 ; i< a.length; i ++ ){
  			for(let j = 0 ; j< ( b[i] && b[i].length) ; j ++ ){
  				a[i].push(b[i][j])
  			}
  		}
}
*/
/*   .$on('addAppointment', function (weekNum, weekDay, weekDayNum, time) {
    console.log('add appointmnt => weekNum:' + weekNum + ', weekDay: ' + weekDay + ' weekDayNum: '+ weekDayNum + ' time: ' + time)
    this.taskDetails[weekDayNum].push(app.newappointment)
 //   app.generateApp()
    
})

*/

