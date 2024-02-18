<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '../stores/cartStore';

export default {
  data() {
    return {
      cartsInput: [],
      loadingBtn: '',
    };
  },
  methods: {
    ...mapActions(cartStore, ['getCarts', 'delFromCart', 'delAllCarts', 'editCart']),
    checkQty(index, id, productId) {
      const targetValue = Number.parseInt(this.$refs.cartInput[index].value, 10);
      if (targetValue >= 1) {
        this.editCart(id, productId, targetValue);
      } else {
        alert('修改數量必須大於 1');
        this.$refs.cartInput[index].value = this.carts[index].qty;
      }
    },
    teleportLoading(btnName) {
      this.loadingBtn = `#${btnName}`;
    },
  },
  mounted() {
    this.getCarts();
  },
  computed: {
    ...mapState(cartStore, ['carts', 'finalTotal', 'inputIsAble', 'isDelingFromCart']),
    isOnSale() {
      return this.carts.map((cart) => cart.product.origin_price > cart.product.price);
    },
  },
};
</script>

<template>
  <div class="bg-light">
    <div class="container text-center py-4">
      <h2>我的購物車</h2>
      <div class="text-end mb-2">
        <button
          v-if="carts.length"
          @click="delAllCarts(), teleportLoading('delAllBtn')"
          type="button"
          class="btn btn-outline-danger btn-sm text-end"
          id="delAllBtn"
        >
          清空購物車
        </button>
      </div>
      <p v-if="!carts.length" class="my-5">目前購物車沒有商品喔！</p>
      <table v-else class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col" width="60"></th>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col" width="" class="text-end">單價</th>
            <th scope="col" width="100" class="text-end">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart, index) in carts" :key="cart.id">
            <th scope="row">
              <button
                @click="delFromCart(cart.id), teleportLoading(`delBtn${cart.id}`)"
                type="button"
                class="btn btn-outline-secondary"
                :disabled="isDelingFromCart"
                :id="`delBtn${cart.id}`"
              >
                <i v-if="loadingBtn !== `#delBtn${cart.id}`" class="bi bi-trash3-fill"></i>
              </button>
            </th>
            <td>{{ cart.product.title }}</td>
            <td>
              <div class="d-flex justify-content-center">
                <div class="input-group" style="max-width: 120px">
                  <input
                    @change="checkQty(index, cart.id, cart.product_id)"
                    type="number"
                    min="1"
                    class="form-control"
                    :value="cart.qty"
                    ref="cartInput"
                    :disabled="inputIsAble"
                  />
                  <span class="input-group-text">{{ cart.product.unit }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <p class="mb-0">
                <span v-if="isOnSale[index]" class="text-danger fw-bold">
                  <span
                    class="d-none d-md-inline-block badge rounded-pill text-bg-warning fw-normal"
                    >特價中</span
                  >
                  {{ cart.product.price }}
                </span>
                <span v-else>
                  {{ cart.product.origin_price }}
                </span>
              </p>
            </td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
        </tbody>
        <tfoot class="text-end">
          <tr>
            <td colspan="4" class="py-3">總計</td>
            <td>{{ finalTotal }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  <teleport v-if="isDelingFromCart" :to="loadingBtn">
    <span class="spinner-border spinner-border-sm" role="status"></span>
  </teleport>
</template>
