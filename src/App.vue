<template>
	<div id="app">
		<div :class="'haro ' + animation ">
			<img class="left" src="images/left.png"/>
			<img class="body" src="images/body.png"/>
			<img class="right" src="images/right.png"/>
			<div :class="'eyes ' + eye_animation">				
				<div></div>
				<div></div>
			</div>			
		</div>		
		<div class="message" v-show="show_message">{{message}}</div>
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
			message: ''
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
				let data = JSON.parse(event.data)
				console.log(data)
				if (data.event == 'first_chat') {
					$this.show_message = true
					$this.message = `Haro, haro, wassup ${data.name}!`
					setTimeout(function(){
						$this.show_message = false
					}, 3000)
					console.log(data.name)

				} else if (data.event == 'message') {
					// if (!$this.show_message) {
						// $this.message = data.message
						$this.show_message = true

						let letters = data.message.split('')
						letters.forEach((letter, i) => {							
							setTimeout(function(){
								$this.message = `${$this.message}${letter}`								
							}, i*50)
						});
						setTimeout(function(){
							$this.show_message = false
							$this.message = ''
						}, 3000)
					// }
				} else if (data.event == 'follow') {
					$this.message = `Thanks for following ${data.user}!`
					$this.show_message = true
					$this.animation = 'jump'
					setTimeout(function(){
						$this.animation = 'idle'
						$this.show_message = false
					}, 6000)
				}
			}

			this.connection.onopen = function() {				
				console.log("Successfully connected to monty websocket server...")
			}
		},
	}
}
</script>

<style lang="scss">
#app {
	font-family: 'Front Page Neue';	
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
		background: red;
		width: 20px;
		height: 40px;		       
		border-radius: 20px / 50px;
	}
}

.message {
	position: absolute;
    left: 20%;
    bottom: 200px;
    background: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 3em;
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
	0%   {  box-shadow: 0px 0px 15px 6px red; }      
	100%   {  box-shadow: none; }   
}
</style>
