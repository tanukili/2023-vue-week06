<template>
  <div>
    <h1>已進入後台</h1>
    <RouterLink to="/home">返回前台</RouterLink> |
    <RouterLink to="/admin/products">後台產品列表</RouterLink> |
    <RouterLink to="/admin/orders">後台訂單</RouterLink> |
    <a href="#">後台登出</a>
    <RouterView></RouterView>
  </div>
</template>
