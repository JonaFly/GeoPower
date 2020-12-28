<script>
export default {
	created() {
		// #ifdef APP-PLUS
		plus.navigator.closeSplashscreen();
		// #endif
	},
	onLaunch: function() {
		this.$store.dispatch('WEBSOCKET_INIT', this.WebSocketURL);
		this.getLocation();
		this.sendSocket();
		uni.startAccelerometer();
		let state = false;
		uni.onAccelerometerChange(function(res) {
			if (res.z.toFixed(0) > 25) {
				// let i = 10;
				// setInterval(
				// 	() => {
				// 		if (i > 0) {
				// 			i = i - 1;
				// 		}
				// 	},
				// 	1,
				// 	i
				// );
				// uni.showModal({
				// 	title: '提示',
				// 	content: `还有${i}将发送短信`,
				// 	showCancel: false,
				// 	cancelText: '',
				// 	confirmText: '',
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				// #ifdef APP-PLUS
				let msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
				let us = uni.getStorageSync('userInfo');
				let ads = uni.getStorageSync('address');
				msg.to = [uni.getStorageSync('phone')];
				msg.body = `${us.name}摔倒了,在${ads}`;
				msg.silent = true;
				if (state) {
					return false;
				}
				state = true;
				if (uni.getStorageSync('userInfo') && uni.getStorageSync('userInfo').auth == 1) {
					plus.messaging.sendMessage(
						msg,
						() => {
							state = false;
						},
						() => {
							state = false;
						}
					);
				} else {
					state = false;
				}
				// #endif
			}
		});
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif

				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});
	},
	methods: {
		sendSocket() {
			setInterval(() => {
				this.getLocation();
			}, 60000);
		},
		getLocation() {
			let ptsObj = {
				user_id: uni.getStorageSync('userInfo').id,
				latitude: 0,
				longitude: 0,
				address: ''
			};
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					const { latitude, longitude } = res;
					ptsObj.latitude = latitude;
					ptsObj.longitude = longitude;
					let point = new plus.maps.Point(longitude, latitude);
					plus.maps.Map.reverseGeocode(
						point,
						{},
						event => {
							ptsObj.address = event.address; // 转换后的地理位置
							let point = event.coord; // 转换后的坐标信息
							let coordType = event.coordType; // 转换后的坐标系类型
							uni.setStorageSync('address', ptsObj.address);
							// console.log(address, 'address-----');
							this.$store.dispatch('WEBSOCKET_SEND', ptsObj);
							//  let reg = /.+?(省|市|自治区|自治州|县|区)/g;
							//  console.log(address.match(reg));
							//  this.userLct.address = address
							//   .match(reg)
							//   .toString();
						},
						function(e) {}
					);
				}
			});
		}
	},
	onShow: function() {
		console.log('App 开启');
	},
	onHide: function() {
		console.log('App 关闭');
	},
	destroyed() {
		this.$store.dispatch('WEBSOCKET_CLOSE', this.WebSocketURL);
		uni.stopAccelerometer();
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
