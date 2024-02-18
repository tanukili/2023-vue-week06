<template>
        <div class="container-md">
        <div class="text-end mt-4">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#productModal"
          >
            建立新的產品
          </button>
        </div>
        <table class="table table-borderless mt-4 mb-3">
          <thead>
            <tr class="border-bottom">
              <th width="100">分類</th>
              <th>產品名稱</th>
              <th width="100">原價</th>
              <th width="100">售價</th>
              <th width="100">是否啟用</th>
              <th width="140">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-bottom" v-for="product in products" :key="product.id">
              <th scope="row">
                <h3 class="fs-6 fw-normal lh-base">{{ product.category }}</h3>
              </th>
              <td>{{ product.title }}</td>
              <td class="text-end">{{ product.origin_price }}</td>
              <td class="text-end">{{ product.price }}</td>
              <td>
                <span
                  :class="{
                    'text-success': product.is_enabled,
                    'text-danger' : !(product.is_enabled * 1) }"
                  >{{ product.is_enabled * 1 ? '啟用' : '未啟用' }}</span
                >
              </td>
              <td class="btn-group" role="group">
                <button
                  class="btn btn-outline-primary"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                  @click="getSpecificProduct(product.id)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#delModal"
                  @click="getSpecificProduct(product.id)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <AdminPagination :pagination="pagination" :get-products="getProducts"></AdminPagination>
      </div>
      <DelModal :title="temp.title" :id="temp.id" :get-products="getProducts"></DelModal>
      <product-Modal
        :temp="temp"
        :get-products="getProducts"
        @temp="resetProductModal"
      ></product-Modal>
</template>

<script>
import AdminPagination from '../../components/admin/AdminPagination.vue';
import DelModal from '../../components/admin/DelModal.vue';
import productModal from '../../components/admin/ProductModal.vue';

export default {
  components: {
    AdminPagination,
    DelModal,
    productModal,
  },
  data() {
    return {
      url: '',
      path: '',
      temp: {
        category: '',
        content: '',
        description: '',
        imageUrl: '',
        imagesUrl: [],
        is_enabled: 0,
        origin_price: 0,
        price: 0,
        title: '',
        unit: '',
        id: '',
        recommendation: 0,
      },
      // productModal: '',
      // delModal: '',
      // fileInput: null,
      products: [],
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      this.axios
        .get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
        .then((res) => {
          this.pagination = res.data.pagination;
          this.products = Object.values(res.data.products);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 新增 / 編輯
    // editProduct(id = '') {
    //   let method = 'post';
    //   let apiPath = `${this.url}/api/${this.path}/admin/product`;
    //   if (id) {
    //     method = 'put';
    //     apiPath = `${apiPath}/${id}`;
    //   }
    //   const obj = { data: { ...this.temp } };

    //   this.axios[method](`${apiPath}`, obj)
    //     .then((res) => {
    //       alert(res.data.message);
    //       this.resetModal('productModal');
    //       this.getProducts();
    //     })
    //     .catch((err) => {
    //       alert(err.response.data.message);
    //     });
    // },
    getSpecificProduct(id) {
      const product = this.products.find((ele) => ele.id === id);
      Object.keys(product).forEach((ele) => {
        this.temp[ele] = product[ele];
      });
    },
    delProduct(id) {
      this.axios
        .delete(`${this.url}/api/${this.path}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          // this.resetModal('delModal');
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    resetProductModal(emitTemp) {
      this.temp = emitTemp;
    },
    // resetModal(name = '') {
    //   if (name) {
    //     this[name].hide();
    //   }
    //   // 將資料初始化：參考文章 - Vue.js 重設或還原 data 初始值的小技巧
    //   this.temp = this.$options.data().temp;
    //   this.fileInput.value = null;
    // },
    // getFileValue(dom) {
    //   this.fileInput = dom;
    // },
  },
  mounted() {
    this.url = import.meta.env.VITE_APP_API_URL;
    this.path = import.meta.env.VITE_APP_API_NAME;
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)adminToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // 預設帶入驗證資訊
    this.axios.defaults.headers.common.Authorization = token;
    this.getProducts();
    console.log(this.$refs);

    // 取得 modal 物件（為了手動操作）
    // this.productModal = new bootstrap.Modal(document.getElementById('productModal'));
    // this.delModal = new bootstrap.Modal(document.getElementById('delModal'));
    // // 監聽 modal 隱藏事件
    // this.productModal.element.addEventListener('hidden.bs.modal', () => {
    //   this.resetModal();
    // });
    // this.delModal.element.addEventListener('hidden.bs.modal', () => {
    //   this.resetModal();
    // });
  },
};
</script>

<style scoped></style>
