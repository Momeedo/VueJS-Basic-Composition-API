import { ref } from 'vue'

export default function useCart () {
    const products = ref([])    

    const addProduct = (product) => products.value.push(product)

    const removeProduct = (product) => {
        const index = products.value.findIndex(i => i.id === product.id)
        products.value.splice(index, 1)
    }

    return {
        products,
        addProduct,
        removeProduct
    }
}