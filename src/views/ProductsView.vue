<script>
import * as bootstrap from 'bootstrap';
import Loading from 'vue-loading-overlay';
import { mapState, mapActions } from 'pinia';
import ProductBtnsLoading from '../components/ProductBtnsLoading.vue';
import productStore from '../stores/productStore';
import cartStore from '../stores/cartStore';

export default {
  components: {
    Loading,
    ProductBtnsLoading,
  },
  data() {
    return {
      modal: null,
      activedBtn: null,
    };
  },
  methods: {
    ...mapActions(productStore, ['getAllProducrs', 'getSingleProduct']),
    ...mapActions(cartStore, ['addToCart']),
  },
  computed: {
    ...mapState(productStore, [
      'products',
      'singleProduct',
      'isLoading',
      'isOnSale',
      'isOnSaleArr',
      'loadingContainer',
    ]),
    ...mapState(cartStore, ['isAddingToCart']),
    modalPorductNum() {
      return Number.parseInt(this.$refs.productModalinput.value, 10);
    },
  },
  mounted() {
    this.getAllProducrs();
    this.modal = new bootstrap.Modal(this.$refs.productModal);
    this.$refs.productModal.addEventListener('shown.bs.modal', () => {
      this.$refs.productModalinput.value = 1;
    });
  },
  unmounted() {
    this.modal.dispose();
  },
};
</script>

<template>
  <div class="container">
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col">產品預覽</th>
          <th scope="col">產品名稱</th>
          <th scope="col" class="text-end">價格</th>
          <th scope="col" width="200"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id" class="align-middle">
          <th scope="row">
            <img
              :src="product.imageUrl"
              :alt="product.title"
              style="height: 180px; width: 180px"
              class="img-fluid"
            />
          </th>
          <td>
            <h3 class="fs-6">{{ product.title }}</h3>
            <button
              type="button"
              class="btn btn-outline-info btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#productModal"
              @click="getSingleProduct(product.id), (this.activedBtn = index)"
              :disabled="isLoading || isAddingToCart"
              :id="`showDetailBtn${index}`"
            >
              產品資訊
            </button>
          </td>
          <td class="text-end">
            <p
              class="mb-0"
              :class="{
                'text-secondary': isOnSaleArr[index],
                'text-decoration-line-through': isOnSaleArr[index],
                small: isOnSaleArr[index],
              }"
            >
              定價 {{ product.origin_price }} 元
            </p>
            <p class="mb-0" v-if="isOnSaleArr[index]">
              現在只要 <span class="text-danger fw-bold"> {{ product.price }} </span> 元
            </p>
          </td>
          <td>
            <button
              @click="addToCart(product.id), (this.activedBtn = index)"
              type="button"
              class="btn btn-primary btn-sm"
              :disabled="isLoading || isAddingToCart"
              :id="`addToCartBtn${index}`"
            >
              加入購物車
            </button>
          </td>
        </tr>
      </tbody>
      <ProductBtnsLoading v-if="isLoading || isAddingToCart" :activedBtn="activedBtn" />
    </table>
  </div>
  <!-- 單一產品 modal -->
  <div
    ref="productModal"
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <Loading :active="isLoading" :is-full-page="false"></Loading>
      <div class="modal-content vl-parent">
        <div class="modal-header py-2 bg-info bg-opacity-50">
          <h5 class="modal-title fw-bold">{{ singleProduct.title }}</h5>
        </div>
        <div class="modal-body vl-hide">
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <img
                  :src="singleProduct.imageUrl"
                  :alt="singleProduct.title"
                  class="img-fluid w-100"
                  style="height: 240px"
                />
              </div>
              <div class="col d-flex flex-column py-2">
                <span class="badge rounded-pill bg-primary align-self-start">{{
                  singleProduct.category
                }}</span>
                <p class="mt-3">{{ singleProduct.description }}</p>
                <p>{{ singleProduct.content }}</p>
                <div class="text-end mt-auto">
                  <p
                    class="mb-1"
                    :class="{
                      'text-secondary': isOnSale,
                      'text-decoration-line-through': isOnSale,
                      small: isOnSale,
                    }"
                  >
                    定價 {{ singleProduct.origin_price }} 元
                  </p>
                  <p class="mb-0" v-if="isOnSale">
                    現在只要 <span class="text-danger fw-bold"> {{ singleProduct.price }} </span> 元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            關閉
          </button>
          <div class="input-group" style="width: 40%">
            <input type="number" min="1" value="1" class="form-control" ref="productModalinput" />
            <button
              @click="addToCart(singleProduct.id, modalPorductNum, modal)"
              class="btn btn-primary"
              type="button"
            >
              加入購物車
              <span
                v-if="isAddingToCart"
                class="spinner-border spinner-border-sm"
                role="status"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
