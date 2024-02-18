<template>
  <div>
    <h1>目前在前台</h1>
    <RouterLink to="/home">首頁</RouterLink> |
    <RouterLink to="/products">前台產品列表</RouterLink> |
    <RouterLink to="/carts">前台購物車</RouterLink> |
    <RouterLink to="/admin">前往後台</RouterLink> |
    <RouterLink to="/admin-login">管理者登入</RouterLink>
    <RouterView></RouterView>
  </div>
</template>
