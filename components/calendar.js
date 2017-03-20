Vue.component('calendar', {
	props: {
		timeGround: {
			coerce(value){
				if(value && value.length == 2){
					let startTime = value[0].split(":")[0] * 1;
					let endTime = value[1].split(":")[0] * 1;
					value = [];
					for(let i = startTime; i <= endTime; i++){
						// console.log(1);
						// value.push()
						let hour = i < 10 ? "0" + i : "" + i;
						value.push(hour + ":00");
					}

				} else{
					value = [
						"09:00",
						"10:00",
						"11:00",
						"12:00",
						"13:00",
						"14:00",
						"15:00",
						"16:00",
						"17:00",
						"18:00",
					]

				}
				return value;
			}
		},
		weekGround: {
			type: Array,
			default: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday'
			]
		},
		taskDetail: {
			type: Array,
			default: []
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
	<div class="schedule">\
	<div class="time-ground">\
		<ul>\
			<li v-for="time in timeGround">\
				<span>{{time}}</span>\
				<p :style="timeListSty"></p>\
			</li>\
		</ul>\
	</div>\
	<div class="task-ground">\
		<ul>\
			<li v-for="week in weekGround" class="task-list">\
				<p>{{week}}</p>\
					<!-- {{$index}} -->\
				 <ul :style="taskListSty">\
				    <li class="task-list-item" v-for="detail in taskDetail[$index]" :style="detail.styleObj" @click="showDetail(detail, week)">\
					<p>{{detail.dateStart}} - {{detail.dateEnd}}</p>\
						<h3>{{detail.title}}</h3>\
					</li>\
				</ul>\
			</li>\
		</ul>\
	</div>\
	<modal :show.sync="showModal" :show-modal-detail.sync="showModalDetail">\
  </div>'
	,
	components: {
		Modal: Modal
	},
	data() {
		return {
			showModal: false,
			showModalDetail: {
				dateStart: '09:30',
				dateEnd: '10:30',
				title: 'Metting',
				week: 'Monday',
				styleObj: {
					backgroundColor: "#903749"
				},
				detail: 'Metting (German: Mettingen) is a commune in the Moselle department in Grand Est in north-eastern France.'
			},
			taskListSty: {
				height: '900px'
			},
			timeListSty: {
				width: '100%'
			}	
		}
	},
	created() {
		// console.log(this.ta)
		let maxTime = this.timeGround[this.timeGround.length - 1];
		let minTime = this.timeGround[0];

		let maxMin = maxTime.split(':')[0] * 60 + maxTime.split(':')[1] * 1;
		let minMin = minTime.split(':')[0] * 60 + minTime.split(':')[1] * 1;

		// console.log(maxMin);
		// console.log(minMin);

		// console.log(maxTime);
		for (let i = 0; i < this.taskDetail.length; i++) {
		    for (let j = 0; j < this.taskDetail[i].length; j++) {

		    	// console.log(this.taskDetail[i][j]);

		        let startMin = this.taskDetail[i][j].dateStart.split(':')[0] * 60 + this.taskDetail[i][j].dateStart.split(':')[1] * 1;
		        let endMin = this.taskDetail[i][j].dateEnd.split(':')[0] * 60 + this.taskDetail[i][j].dateEnd.split(':')[1] * 1;

		        if(startMin < minMin || endMin > maxMin) {
		        	this.taskDetail[i].splice(j, 1);
		        	j--;
		        	continue
		        };
		        // console.log(endMin);

		        let difMin = endMin - startMin;
		        // console.log(startMin);
		        // console.log(endMin);

		        this.taskDetail[i][j].styleObj = {
		            height: difMin * 100 / 60 + 'px',
		            top: ((startMin - (this.timeGround[0].split(":")[0] * 60 + this.timeGround[0].split(":")[1] * 1)) * 100 / 60) + 50 + 'px',
		            backgroundColor: this.color[~~(Math.random() * this.color.length)]
		        }

		        // console.log(this.color[~~(Math.random() * 4)]);
		        // console.log(this.taskDetail);
		        // console.log(this.timeGround);
		    }
		}

		console.log(this.taskDetail);
	},
	compiled() {
		this.taskListSty.height = (this.timeGround.length - 1) * 100 + 'px';

		this.timeListSty.width = this.weekGround.length * 20 + '%';
		

		// console.log(this.taskDetail);
		// console.log(this.weekGround);
	},
	methods: {
		showDetail(obj, week){
			// console.log(week);
			obj.week = week;
			this.showModalDetail = obj;
			// this.showModalDetail.week = week;
			this.showModal = true;
			console.log(this.showModalDetail);
			// console.log(week);
		}
	}
	  
})