<template>
  <div>
    <h1>已進入後台</h1>
    <RouterLink to="/home">返回前台</RouterLink> |
    <RouterLink to="/admin/products">後台產品列表</RouterLink> |
    <RouterLink to="/admin/orders">後台訂單</RouterLink> |
    <a href="#" @click.prevent="signOut">後台登出</a>
    <RouterView></RouterView>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
    };
  },
  methods: {
    checkLogin() {
      this.axios
        .post(`${this.url}/api/user/check`)
        .then(() => {
          alert('驗證成功');
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push({ name: 'home' });
        });
    },
    signOut() {
      document.cookie = 'adminToken=; expires=;';
      alert('管理者登出');
      this.$router.push({ name: 'home' });
    },
  },
  mounted() {
    this.url = import.meta.env.VITE_APP_API_URL;
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)adminToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // 預設帶入驗證資訊
    this.axios.defaults.headers.common.Authorization = token;
    this.checkLogin(token);
  },
};
</script>
