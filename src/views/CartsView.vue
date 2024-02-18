<template>
    <CartsList></CartsList>
    <OrderForm></OrderForm>
</template>

<script>
import OrderForm from '../components/OrderForm.vue';
import CartsList from '../components/CartsList.vue';

export default {
  components: {
    OrderForm,
    CartsList,
  },
};
</script>

<style scoped></style>
