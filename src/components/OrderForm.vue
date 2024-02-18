<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '../stores/cartStore';

const url = import.meta.env.VITE_APP_API_URL;
const path = import.meta.env.VITE_APP_API_NAME;

export default {
  data() {
    return {
      isAddingOrder: false,
    };
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    checkoutOrder(values, actions) {
      this.isAddingOrder = true;
      const {
        name, email, tel, address, message,
      } = values;
      const data = {
        data: {
          user: {
            name,
            email,
            tel,
            address,
          },
          message,
        },
      };
      if (this.carts.length) {
        this.axios
          .post(`${url}/api/${path}/order`, data)
          .then((res) => {
            this.isAddingOrder = false;
            alert(`${res.data.message}，訂單編號為「${res.data.orderId}」`);
            actions.resetForm();
            this.getCarts();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      } else {
        this.isAddingOrder = false;
        alert('目前購物車沒有東西');
        window.scrollTo({
          top: 50,
          behavior: 'smooth', // smooth 模式
        });
      }
    },
  },
  computed: {
    ...mapState(cartStore, ['carts']),
  },
};
</script>

<template>
  <div class="container py-5">
    <h2 class="mb-3 text-center">填寫訂單資料</h2>
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <VForm v-slot="{ errors }" @submit="checkoutOrder" class="d-flex flex-column">
          <div class="mb-3">
            <span class="d-flex justify-content-between">
              <label for="email" class="form-label">信箱</label>
              <ErrorMessage name="email" v-slot="{ message }" class="invalid-feedback">
                <span class="small text-danger">{{ message.replace('email', '信箱') }}</span>
              </ErrorMessage>
            </span>
            <!-- 當錯誤訊息有對應 key 時，加入 is-invalid -->
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入信箱"
              rules="email|required"
            ></VField>
          </div>
          <div class="mb-3">
            <span class="d-flex justify-content-between">
              <label for="name" class="form-label">收件人姓名</label>
              <ErrorMessage name="name" v-slot="{ message }" class="invalid-feedback">
                <span class="small text-danger">{{ message.replace('name', '姓名') }}</span>
              </ErrorMessage>
            </span>
            <VField
              id="name"
              name="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="請輸入收件人姓名"
              rules="required"
            ></VField>
          </div>
          <div class="mb-3">
            <span class="d-flex justify-content-between">
              <label for="phone" class="form-label">收件人電話</label>
              <ErrorMessage name="tel" v-slot="{ message }" class="invalid-feedback">
                <span class="small text-danger">{{ message.replace('tel', '電話') }}</span>
              </ErrorMessage>
            </span>
            <VField
              id="phone"
              name="tel"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['tel'] }"
              placeholder="請輸入 09 開頭的手機號碼"
              :rules="{ required: true, regex: /^09\d{8}$/ }"
            ></VField>
          </div>
          <div class="mb-3">
            <span class="d-flex justify-content-between">
              <label for="address" class="form-label">收件人地址</label>
              <ErrorMessage name="address" v-slot="{ message }" class="invalid-feedback">
                <span class="small text-danger">{{ message.replace('address', '地址') }}</span>
              </ErrorMessage>
            </span>
            <VField
              id="address"
              name="address"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="請輸入收件人地址"
              rules="required"
            ></VField>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <VField
              id="message"
              name="message"
              as="textarea"
              class="form-control"
              style="height: 96px"
              placeholder="請輸入留言"
            ></VField>
          </div>
          <button type="submit" class="btn btn-primary w-75 align-self-center">
            送出訂單
            <span
              v-if="isAddingOrder"
              class="spinner-border spinner-border-sm"
              role="status"
            ></span>
          </button>
        </VForm>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
