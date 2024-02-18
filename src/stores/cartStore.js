import { defineStore } from 'pinia';
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;
const path = import.meta.env.VITE_APP_API_NAME;

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    finalTotal: 0,
    inputIsAble: false,
    isAddingToCart: false,
    isDelingFromCart: false,
  }),
  getters: {},
  actions: {
    getCarts() {
      axios
        .get(`${url}/api/${path}/cart`)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.finalTotal = res.data.data.final_total;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(id, qty = 1, modal = null) {
      this.isAddingToCart = true;
      const data = {
        data: {
          product_id: id,
          qty,
        },
      };
      axios
        .post(`${url}/api/${path}/cart`, data)
        .then((res) => {
          alert(res.data.message);
          this.isAddingToCart = false;
          this.getCarts();
          if (modal) {
            modal.hide();
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.isAddingToCart = false;
        });
    },
    delFromCart(id) {
      this.isDelingFromCart = true;
      axios
        .delete(`${url}/api/${path}/cart/${id}`)
        .then((res) => {
          this.isDelingFromCart = false;
          this.getCarts();
          alert(res.data.message);
        })
        .catch((err) => {
          alert(`無法刪除單品：${err.response.data.message}`);
          this.isDelingFromCart = false;
        });
    },
    delAllCarts() {
      this.isDelingFromCart = true;
      axios
        .delete(`${url}/api/${path}/carts`)
        .then((res) => {
          this.isDelingFromCart = false;
          this.getCarts();
          alert(res.data.message);
        })
        .catch((err) => {
          this.isDelingFromCart = false;
          alert(`無法清除商品：${err.response.data.message}`);
        });
    },
    editCart(id, productId, qty) {
      this.inputIsAble = true;
      const data = {
        data: {
          product_id: productId,
          qty,
        },
      };
      axios
        .put(`${url}/api/${path}/cart/${id}`, data)
        .then((res) => {
          this.getCarts();
          alert(res.data.message);
          this.inputIsAble = false;
        })
        .catch((err) => {
          alert(`無法修改購物車：${err.response.data.message}`);
          this.inputIsAble = false;
        });
    },
  },
});
