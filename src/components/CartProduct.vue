<script>
import { reactive, toRefs, computed, onMounted, onUpdated, onUnmounted } from 'vue'

export default {
  props: {
    cartProduct: {
      type: Object,
      required: true
    }
  },
  emits: ['remove'],
  setup(props, context) {

    console.log("Props Cart Product: " + props.cartProduct)

    const product = reactive(props.cartProduct)

    const incrementQuantity = () => product.quantity++
    const decrementQuantity = () => product.quantity--

    const remove = () => context.emit('remove', product)

    //computed
    const total = computed(() => product.price * counter.value)

    const { name, price, quantity } = toRefs(product)

    //props
    console.log(props.cartProduct) 

    onMounted(() => {
      console.log("Mounted")
    })
    onUpdated(() => {
      console.log("Updated")
    })
    onUnmounted(() => {
      console.log("Unmounted")
    })

    return {
      decrementQuantity,
      incrementQuantity,
      product,
      name, price, quantity,
      total,
      remove
    }
  }
}
</script>

<template>

  <h1>{{ name }} : {{ price }} (x{{ quantity }})</h1>
  <br /><br />
  <button @click="remove">Remove</button>
</template>



<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
