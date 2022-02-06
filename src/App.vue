<template>
	<div id="app">
		<div class="message" v-show="show_message">{{message}}</div>
		<div :class="'haro ' + animation ">
			<img class="left" src="images/left.png"/>
			<img class="body" src="images/body.png"/>
			<img class="right" src="images/right.png"/>
			<div :class="'eyes ' + eye_animation">				
				<div></div>
				<div></div>
			</div>			
		</div>				
	</div>
</template>

<script>

export default {
	name: 'App',  
	data () {
		return {
			animation: 'idle',
			eye_animation: '',
			show_message: false,
			message: '',
			delay: null,
			follow_state: false,
			queue: [],
			doit: true
		}
	},
	mounted () {
		let $this = this

		this.ws()

		setInterval(function(){
			if ($this.eye_animation != 'blink') {
				$this.eye_animation = 'blink'				
			} else {
				$this.eye_animation = ''				
			}
		}, 5000)

		setInterval(() => {
			if($this.doit && $this.queue.length) {
				$this.check_queue()
			}
		}, 500)		
	},
	methods: {		
		ws: function () {
			let $this = this			
			
			console.log("Connecting to monty WebSocket Server")			
			this.connection = new WebSocket('ws://localhost:1880/event')

			setInterval(function(){
				if ($this.connection.readyState == 3) {
					console.log('reloading')
					location.reload()
				}
			}, 5000)
			
			this.connection.onmessage = function(event) {
				let msg_data = JSON.parse(event.data)
				$this.queue.push(msg_data)
				console.log($this.queue)									
			}

			this.connection.onopen = function() {				
				console.log("Successfully connected to monty websocket server...")
			}
		},
		check_queue: function() {
			let $this = this
			if($this.doit && $this.queue.length) {				
				console.log($this.queue.length)
				console.log('entered')
				$this.show_message = true
				$this.queue.forEach((data, i) => {						
					if (data.event == 'first_chat' && $this.doit) {
						$this.doit = false
						$this.message = ''	
						let message = `Haro, haro, wassup ${data.name}!`

						let letters = message.split('')
						letters.forEach((letter, i) => {		
							if (!$this.follow_state) {
								setTimeout(function(){
									$this.message = `${$this.message}${letter}`								
								}, i*50)
							} else {
								return 
							}					
						});


						setTimeout(function(){
							$this.queue.splice(i, 1); 	
							console.log('removed')
							$this.show_message = false
							$this.message = ''
							$this.doit = true
						}, 6000)
						console.log(data.name)

					} else if (data.event == 'message' && $this.doit) {	
						$this.message = ''											
						$this.doit = false
						let letters = data.message.split('')
						letters.forEach((letter, i) => {		
							if (!$this.follow_state) {
								setTimeout(function(){
									$this.message = `${$this.message}${letter}`								
								}, i*50)
							} else {
								return 
							}					
						});
						$this.delay = setTimeout(function(){
							$this.queue.splice(i, 1); 	
							$this.show_message = false
							$this.message = ''
							$this.doit = true
						}, 5000)							
					} else if (data.event == 'follow' && $this.doit) {
						$this.follow_state = true
						$this.message = ''
						setTimeout(function(){						
							$this.animation = 'jump'

							let letters = `Thanks for following ${data.user}!`.split('')
							letters.forEach((letter, i) => {									
								setTimeout(function(){
									$this.message = `${$this.message}${letter}`								
								}, i*50)							
							});
						}, 1000)
						
						setTimeout(function(){
							$this.follow_state = false
							$this.animation = 'idle'
							$this.show_message = false
							$this.message = ''
							$this.doit = true
						}, 6000)
					} else if (data.event == 'jump') {
						$this.animation = 'jump'
						setTimeout(function(){						
							$this.animation = 'idle'						
						}, 6000)
					}											
					console.log($this.queue)
					console.log($this.doit)
				});
			}
		}
	}
}
</script>

<style lang="scss">

@font-face {
	font-family: 'amuroregular';
    src: url('./assets/fonts/amuro-82yn-webfont.woff2') format('woff2'),
         url('./assets/fonts/amuro-82yn-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

body {
	background: #000;		
}

#app {
	font-family: 'amuroregular';
	position: relative;
}

.haro {
	position: relative;    
	margin-left: 250px;
	margin-top: 260px;
	width: 501px; /* Important for bounce looking right */                
	height: 692px;
}

.jump {
	align-self: flex-end;
	animation-duration: 1s;
	animation-iteration-count: infinite;                                
	transform-origin: bottom;                
	animation-name: jump;
	animation-timing-function: ease;
}

.idle {          
	animation-duration: 2s;
	animation-iteration-count: infinite;     
	animation-name: idle;
	animation-timing-function: ease;        
	transform: rotate(46deg);           
}

.idle .right, .jump .right {
	animation-duration: 1s;
	animation-iteration-count: infinite;     
	animation-name: flap-right;
	animation-timing-function: ease;        
	transform: rotate(0deg);
	transform-origin: 0 0;                
}

.idle .left, .jump .left {
	animation-duration: 1s;
	animation-iteration-count: infinite;     
	animation-name: flap-left;
	animation-timing-function: ease;   
	transform: rotate(0);
	transform-origin: 162px 0;
}

.left {
	position: absolute;
	left: 10px;
	top: 16px;
}

.right {
	position: absolute;
	left: 318px;
	top: 14px;
}

.body {
	position: absolute;
	left: 0;
	top: 0;
}

.eyes {
	display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    z-index: 3;
    padding: 160px 190px 0;
    box-sizing: border-box;
	
	&.blink {
		& div {
			box-shadow: none;
			animation-duration: 0.5s;
			animation-iteration-count: infinite;     
			animation-delay: 2s;
			animation-name: blink;			
		}
	}

	& > div {
		background: rgb(143, 39, 39);
		width: 20px;
		height: 40px;		       
		border-radius: 20px / 50px;
	}
}

.message {
	position: absolute;
	left: 50px;
    top: -270px;  
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 10em;
    z-index: 5;
	background: #dd803e;
    color: #fff;
}

@keyframes jump {
	0%   { transform: scale(1,1)      translateY(0); }
	10%  { transform: scale(1.1,.9)   translateY(0); }
	30%  { transform: scale(.9,1.1)   translateY(-100px); }
	50%  { transform: scale(1.05,.95) translateY(0); }
	57%  { transform: scale(1,1)      translateY(-7px); }
	64%  { transform: scale(1,1)      translateY(0); }
	100% { transform: scale(1,1)      translateY(0); }
}

@keyframes idle {
	0%   {     transform: rotate(-30deg); }         
	50%   {     transform: rotate(30deg); }                
	100%   {     transform: rotate(-30deg); }
}

@keyframes flap-right {
	0%   {     transform: rotate(0deg); }         
	50%   {     transform: rotate(-70deg); }                
	100%   {     transform: rotate(0deg); }
}

@keyframes flap-left {
	0%   {     transform: rotate(0deg); }         
	50%   {     transform: rotate(70deg); }                
	100%   {     transform: rotate(0deg); }
}

@keyframes blink {
	0%   {  
		box-shadow: 0px 0px 15px 6px red; 
		background: rgb(233, 58, 58);
	}      
	100%   {
		box-shadow: none; 
		background: rgb(143, 39, 39);
	}   
}
</style>
