<template>
	<view>
		<view v-if="!userState">
			<view class="footer">
				<!-- <navigator url="forget" open-type="navigate">找回密码</navigator>
			<text>|</text> -->
				<navigator>未获取到您的钱包（Wallet）</navigator>
			</view>
			<wButton text="获取钱包" :rotate="isRotate" @click.native="getEthAct()" class="wbutton"></wButton>
		</view>
		<uni-list v-else>
			<uni-icons type="map-filled" color="#1296db" size="120"></uni-icons>
			<!-- <uni-tag :text="userState.name"></uni-tag> -->
			<uni-list-item title="地址" @click.native="handleClipboard(userState.address)">
				<view slot="right" class="list-note-right">{{ userState.address }}</view>
			</uni-list-item>
			<uni-list-item title="私钥" right="userState.privateKey" @click.native="handleClipboard(userState.privateKey)">
				<view slot="right" class="list-note-right">{{ userState.privateKey }}</view>
			</uni-list-item>
			<!-- <uni-list-item v-if="!userState.auth" title="添加用户" @click.native="handleClipboard()"></uni-list-item> -->
			<!-- <uni-list-item @click.native="handleLogout()" title="退出登录"></uni-list-item> -->
		</uni-list>
	</view>
</template>

<script>
import wButton from '../../components/watch-login/watch-button.vue'; //button
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniTag from '@/components/uni-tag/uni-tag.vue';
import { getEthAccount } from '@/api/user.js';
export default {
	components: {
		wButton,
		uniIcons,
		uniTag
	},
	data() {
		return {
			userState: {},
			isRotate: false
		};
	},
	onShow() {
		this.userState = uni.getStorageSync('userInfo');
	},
	methods: {
		getEthAct() {
			getEthAccount()
				.then(res => {
					this.userState = res.data;
					uni.setStorageSync('userInfo', res.data);
					debugger;
				})
				.catch(e => {});
		},
		handleClipboard(data) {
			uni.setClipboardData({
				data,
				success: function() {
					uni.showToast({
						icon: 'success',
						position: 'bottom',
						title: '复制成功'
					});
				}
			});
		},
		handleLogout() {
			uni.showModal({
				title: '提示',
				content: '您确定要退出登录嘛',
				showCancel: true,
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						wx.clearStorage();
						wx.reLaunch({
							url: '/pages/login/login'
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		handleCreateUser() {
			uni.navigateTo({
				url: '/pages/login/register?nav=添加用户'
			});
		},
		handleEditUserInfo() {
			uni.navigateTo({
				url: '/pages/login/forget?state=true'
			});
		},
		handleEditPass() {
			uni.navigateTo({
				url: '/pages/login/forget'
			});
		}
	}
};
</script>

<style scoped>
@import url('../../components/watch-login/css/icon.css');
@import url('../login/css/main.css');
.footer {
	margin-top: 300rpx;
}
.list-note-right {
	font-size: 24rpx;
	max-width: 400rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #999;
}
</style>
