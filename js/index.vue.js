var app = new Vue({
		el: '#app',
		data: {
			isChoose: -1,
			players: 0,
			timeID: 0, //定时器ID，保证单击和双击事件间的时间
			available: 1, //确保单击事件后可否进行双击事件
			animals: [{
				id: 1,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			}, {
				id: 2,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			}, {
				id: 3,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 4,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 5,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 6,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 7,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 8,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 9,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 10,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 11,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 12,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 13,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 14,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 15,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 16,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 17,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 18,
				level: 0,
				name: '兵',
				player: 2,
				show: 1,
			},
			{
				id: 19,
				level: 1,
				name: '炮',
				player: 1,
				show: 1,
				img:'img/pao100.png'
			},
			{
				id: 20,
				level: 1,
				name: '炮',
				player: 1,
				show: 1,
				img:'img/pao100.png'
			}]
		},
		created: function() {
		},
		methods: {
			result: function(info) {
				this.$confirm('' + info, '游戏结果', {
					confirmButtonText: '再来一局',
					cancelButtonText: '关闭',
				}).then(() => {
					location.reload();
				}).catch(() => {
				});
			},
			gernerateId: function(index) {
				return "back_" + index;
			},
			gernerateBtmId: function(index) {
				return "btm_" + index;
			},
			gernerateItemId: function(index) {
				return index;
			},
			moveitem: function(e) {
				$target_top = e.target.style.top; //单击目标位置
				$target_left = e.target.style.left;
				$target_id = e.target.getAttribute('id'); //单击目标id
				$item_self = document.getElementsByClassName('choose'); //已选中DOM
				if(this.available == 0) { //快速点击时，进入以下逻辑
					if($item_self[0] != undefined) {
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
					}
				}else if($item_self[0] == undefined) {
					clearTimeout(this.timeID);
					this.available = 0;
					if(this.animals[$target_id].player != this.players) {
						this.isChoose = $target_id;
					}
					this.timeID = setTimeout(function() { //保证双击或多击事件只触发单击操作
						app.available = 1;
					}, 500); //500毫秒后恢复记录值，确保可进行正常操作

				} else {
					$item_id = $item_self[0].getAttribute('id'); //获取目标id
					if((this.animals[$item_id].level > this.animals[$target_id].level) && this.animals[$item_id].player != this.animals[$target_id].player) {
						this.animals[$target_id].show = 0; //目标被干掉
						this.isChoose = -1; //移除选中
						$item_self[0].style.top = $target_top;
						$item_self[0].style.left = $target_left;
						this.players = this.animals[$item_id].player; //记录玩家id
						$item_self[0].classList.remove('choose');
					} else { //不符合规则的操作到此
						this.isChoose = -1;
						$item_self[0].classList.remove('choose');
					}
				}
			},
			moveblank: function(e) { //点击空白处触发事件
				$target_top = e.target.style.top; //获取目的地的坐标地址
				$target_top=$target_top.substring(0,$target_top.length-2)-20+'px';
				$target_left = e.target.style.left;
				$target_left = $target_left.substring(0,$target_left.length-2)-20+'px';
				$item_self = document.getElementsByClassName('choose'); //获取已选中的DOM
				if($item_self[0] == undefined) {} else {
					$item_id = $item_self[0].getAttribute('id'); 
					this.isChoose = -1; 
					$item_self[0].style.top = $target_top;
					$item_self[0].style.left = $target_left;
					$item_self[0].classList.remove('choose');
					this.players = this.animals[$item_id].player; //记录玩家操作
				}
			}
		},
		mounted: function() {
			var u = navigator.userAgent;
			if(u.indexOf('Android') > -1 || u.indexOf('iPhone') > -1 || u.indexOf('Windows Phone') > -1 || u.indexOf('iPod') > -1) {
				var width = window.screen.width;
				var height = window.screen.height;
				var top = parseInt((height - width) / 2);
				if(top > 0) {
					document.getElementById('backbox').style.marginTop = top + 'px';
				}
			}
			$target_19=document.getElementById('19');
			$target_19.style.top=530+'px';
			$target_19.style.left=400+'px';
			$target_19.style.height=90+'px';
			$target_19.style.backgroundImage='url(' + this.animals[19].img + ')';		
			$target_18=document.getElementById('18');
			$target_18.style.top=530+'px';
			$target_18.style.left=280+'px';
			$target_18.style.height=90+'px';
			$target_18.style.backgroundImage='url(' + this.animals[18].img + ')';
		}
	}
)

function gameResult() {
	var data = app.animals;
	var plays1 = 0;
	var plays2 = 0;
	for(var i = 0; i < data.length; i++) {
		if(data[i]['show'] == 0 && data[i]['player'] == 1) {
			plays1++;
		} else if(data[i]['show'] == 0 && data[i]['player'] == 2) {
			plays2++;
		}
		if(plays1 == plays2 && plays1 == 8) {
			clearInterval(restltID);
			app.result('平局！');
		} else if(plays1 == 8) {
			clearInterval(restltID);
			app.result('大炮胜出！');
		} else if(plays2 == 8) {
			clearInterval(restltID);
			app.result('小兵胜出！');
		}
	}
}