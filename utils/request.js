function Request(data, url, method) {
	return new Promise((resolve, reject) => {
		uni.request({
			// url: 'http://127.0.0.1:9999' + url,
			url: 'http://localhost:3000/api' + url,
			header: {
				// 'ZCYUN-serverkey': '68E52F2DE847455F851023FC4E533B26',
				// 'token': uni.getStorageSync('token'),
				// 'Content-Type': 'application/x-www-form-urlencoded'
			},
			method,
			data,
			success: res => {
				if (res.data.code == 1) {
					resolve(res.data)
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						position: 'bottom'
					})
					reject(res)
				}
			},
			fail: err => {
				uni.showToast({
					title: '网络异常',
					icon: 'none',
					position: 'bottom'
				})
				reject(err)
			},
			complete: () => {}
		});
	})
}

export default Request
