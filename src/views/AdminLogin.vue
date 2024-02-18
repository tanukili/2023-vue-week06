<template>
  <h1>後台登入頁面</h1>
  <RouterLink to="/home">返回首頁</RouterLink>
  <div class="container" style="height: 100vh">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-6 col-md-4 col-lg-3">
            <h1 class="h3 text-center mb-3">請先登入</h1>
            <form action="#" class="py-3">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="xxx@mail.com"
                  id="adminEmail"
                  v-model="user.username"
                />
                <label for="adminEmail" class="form-label">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="xxx"
                  id="adminPassword"
                  v-model="user.password"
                />
                <label for="adminPassword" class="form-label">Password</label>
              </div>
              <button type="button" class="btn btn-primary btn-lg w-100" @click.prevent="signin">
                登入
              </button>
            </form>
            <p class="text-center text-secondary mt-5">© 2021~∞ - 六角學院</p>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      this.axios
        .post(`${this.url}/admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message);
          // 儲存登入狀態
          const { token, expired } = res.data;
          document.cookie = `adminToken=${token}; expires=${new Date(expired)};`;
          this.$router.push({ name: 'admin' });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.url = import.meta.env.VITE_APP_API_URL;
  },
};
</script>

<style scoped></style>
