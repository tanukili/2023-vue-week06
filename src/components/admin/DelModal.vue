<template>
  <div class="modal fade" id="delModal" ref="delModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white">刪除產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">
            是否刪除
            <span class="text-danger fw-bold">{{ title }}</span> 商品(刪除後將無法恢復)。
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct(id)">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';

export default {
  props: ['title', 'id', 'getProducts'],
  data() {
    return {
      url: '',
      path: '',
      delModal: null,
    };
  },
  methods: {
    delProduct(id) {
      this.axios
        .delete(`${this.url}/api/${this.path}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.delModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.url = import.meta.env.VITE_APP_API_URL;
    this.path = import.meta.env.VITE_APP_API_NAME;

    this.delModal = new bootstrap.Modal(this.$refs.delModal);
  },
};
</script>
