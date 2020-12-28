<template>
	<view>
		<view v-if="!userState">
			<view class="footer">
				<!-- <navigator url="forget" open-type="navigate">找回密码</navigator>
			<text>|</text> -->
				<navigator>您还未登录</navigator>
			</view>
			<wButton text="去 登 录" :rotate="isRotate" @click.native="startLogin()" class="wbutton"></wButton>
		</view>
		<uni-list v-else>
			<uni-icons type="map-filled" color="#1296db" size="120"></uni-icons>
			<uni-tag :text="userState.name"></uni-tag>
			<uni-list-item title="修改个人信息" @click.native="handleEditUserInfo()"></uni-list-item>
			<uni-list-item title="修改密码" @click.native="handleEditPass()"></uni-list-item>
			<uni-list-item v-if="!userState.auth" title="添加用户" @click.native="handleCreateUser()"></uni-list-item>
			<uni-list-item @click.native="handleLogout()" title="退出登录"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import wButton from '../../components/watch-login/watch-button.vue'; //button
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniTag from '@/components/uni-tag/uni-tag.vue';
export default {
	components: {
		wButton,
		uniIcons,
		uniTag
	},
	data() {
		return {
			userState: {}
		};
	},
	onShow() {
		this.userState = uni.getStorageSync('userInfo')
	},
	methods: {
		startLogin() {
			wx.navigateTo({
				url: '/pages/login/login'
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
			})
		},
		handleEditPass() {
			uni.navigateTo({
				url: '/pages/login/forget'
			})
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
</style>
