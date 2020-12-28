<template>
	<view class="forget">
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">{{ !state ? '若你忘记了密码，可在此重置新密码。' : '若你想修改个人信息，可在此修改个人信息' }}</view>
				<wInput v-if="state" v-model="userInfo.name" type="text" maxlength="11" placeholder="请输入姓名"></wInput>
				<wInput v-if="state" v-model="userInfo.phone" type="number" maxlength="11" placeholder="请输入手机号码"></wInput>
				<wInput v-if="!state" v-model="password" type="password" maxlength="11" placeholder="请输入新密码" isShowPass></wInput>

				<!-- 	<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码"
					
					isShowCode
					codeText="获取重置码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput> -->
			</view>

			<wButton :text="!state ? '重 置 密 码' : '修 改 信 息'" :rotate="isRotate" @click.native="startRePass()"></wButton>
		</view>
	</view>
</template>

<script>
var _this;
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button
import { updateUserInfo } from '../../api/user.js';
export default {
	data() {
		return {
			// phoneData: "", //电话
			// passData: "", //密码
			// verCode:"", //验证码
			isRotate: false, //是否加载旋转
			userInfo: uni.getStorageSync('userInfo'),
			password: '',
			state: false
		};
	},
	components: {
		wInput,
		wButton
	},
	onLoad(option) {
		this.state = option.state || false;
		uni.setNavigationBarTitle({
			title: this.state ? '修改个人信息' : '修改密码'
		});
	},
	mounted() {
		_this = this;
	},
	methods: {
		getVerCode() {
			//获取验证码
			if (_this.phoneData.length != 11) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '手机号不正确'
				});
				return false;
			}
			console.log('获取验证码');
			this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '模拟倒计时触发'
			});

			setTimeout(function() {
				_this.$refs.runCode.$emit('runCode', 0); //假装模拟下需要 终止倒计时
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '模拟倒计时终止'
				});
			}, 3000);
		},
		startRePass() {
			//重置密码
			if (this.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			const {name, password, phone} = uni.getStorageSync('userInfo')
			if (this.state) {
				if (this.userInfo.name == null || this.userInfo.name.length <= 0) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不可为空'
					});
					return false;
				}
				if (this.userInfo.phone == null ||this.userInfo.phone.length <= 0) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不要为空'
					});
					return false;
				}
				if (this.userInfo.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				if (this.userInfo.name == name && this.userInfo.phone == phone){
					return false
				}
			} else { 
				if (this.password.length <= 0) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不可为空'
					});
					return false;
				} else if (this.password == password) {
					return false
				} else {
					this.userInfo.password = this.password;
				}
			}
			_this.isRotate = true;
			updateUserInfo(this.userInfo)
				.then(res => {
					_this.isRotate = false;
					uni.showToast({
						title: this.state ? '修改个人信息成功' : '修改密码成功',
						duration: 3000,
						success: () => {
							uni.setStorageSync('userInfo', this.userInfo)
						},
						complete: () => {
							uni.navigateBack()
						}
					});
				})
				.catch(e => {
					_this.isRotate = false;
				});
			//    if (this.passData.length < 6) {
			//        uni.showToast({
			//            icon: 'none',
			// 		position: 'bottom',
			//            title: '密码不正确'
			//        });
			//        return false;
			//    }
			// if (this.verCode.length != 4) {
			//     uni.showToast({
			//         icon: 'none',
			// 		position: 'bottom',
			//         title: '验证码不正确'
			//     });
			//     return false;
			// }
			setTimeout(function() {
				_this.isRotate = false;
			}, 3000);
		}
	}
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./css/main.css');
</style>
