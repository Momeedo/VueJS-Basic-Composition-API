<script>
import { ref, reactive, toRefs, toRef, computed, watch, watchEffect } from 'vue'
import CartProduct from './components/CartProduct.vue';
import useCart from './useCart.js';
export default {
  props: {
    cartProduct: {
      type: Object,
      required: true
    }
  },
  components: {
    CartProduct
  },
  setup() {

    const { products, addProduct, removeProduct } = useCart()

    addProduct(
      {
        id: 1,
        name: "Prop Product",
        price: 10,
        quantity: 3
      }
    )

    //Ref
    const message = ref("Counter")
    const counter = ref(0)
    const incrementCounter = () => counter.value++
    const decrementCounter = () => counter.value--

    //Reactive
    const product = reactive({
      name: "Car",
      price: "44000",
      quentity: 1
    })
    const changeProduct = () => {
      product.name = "Boat"
    }

    //toRef
    const nameRef = toRef(product, 'name')
    console.log('nameref before change: ' + nameRef.value)
    product.name = "Plane"
    console.log('nameref after change: ' + nameRef.value)

    //toRefs
    const productRefs = toRefs(product)
    console.log('Name before change: ' + productRefs.name.value)
    console.log('Price before change: ' + productRefs.price.value)
    product.name = "Cruiser"
    product.price = 2000000
    console.log('Name after change: ' + productRefs.name.value)
    console.log('Price after change: ' + productRefs.price.value)

    const { name, price } = toRefs(product)

    //computed
    const total = computed(() => product.price * counter.value)

    //watch
    watch(total, (newVal, oldVal) => {
      console.log("Watched old value is ", oldVal)
      console.log("Watched new value is ", newVal)
    }, { immediate: true })

    //watch reactive object
    watch(() => product.name, (newVal, oldVal) => {
      console.log("Watched old value is ", oldVal)
      console.log("Watched new value is ", newVal)
    })

    //watchEffect
    watchEffect(() =>
      console.log('Name changed detected by watchEffect: ', product.name)
    )

    //props
    // const products = ref([
    //   {
    //     id: 1,
    //     name: "Prop Product",
    //     price: 10,
    //     quantity: 3
    //   }
    // ])

    //emits
    //const handleRemove = (data) => products.value.splice(0, 1)

    return {
      message,
      counter,
      incrementCounter,
      decrementCounter,
      product,
      changeProduct,
      name, price,
      total,
      products,
      //handleRemove
      removeProduct
    }
  }
}
</script>

<template>
  <h1>{{ message }} ({{ counter }}) <a href="#" @click="decrementCounter">-</a><a href="#"
      @click="incrementCounter">+</a></h1>
  <br />
  <input v-model="message" type="text" />
  <br /><br />
  <h1>{{ product.name }} : {{ product.price }}</h1>
  <br />
  <h1>{{ name }} : {{ price }}</h1>
  <br />
  <a href="#" @click="changeProduct">Rename Product</a>
  <br /><br />
  <h1>Total : {{ total }}</h1>
  <br /><br />
  <hr />
  <br /><br />
  <CartProduct v-for="product in products" :cart-product="product" :key="product.id" 
    @remove="removeProduct">
  </CartProduct>

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
