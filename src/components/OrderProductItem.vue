<template>
  <li class="cart__order">
    <h3>{{ product.product.title }}</h3>
    <b>{{ product.price }} ₽</b>
    <span>Артикул: {{ product.product.id }}</span>
  </li>
</template>
<script>
export default {
  name: 'OrderProductItem',
  props: ['product'],
}
</script>
