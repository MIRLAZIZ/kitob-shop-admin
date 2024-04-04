import { $api } from '@/utils/api'
import { defineStore } from 'pinia'


export const useProduct = defineStore('pro', {

  state: () =>({
    getProduct: [],  
    getProducts: 0,

  }),
  actions: {
    async fetchProduct(page) {  
      return await $api(`product?page=${page}`)  
        .then(res => {
          
          this.getProduct = res.result.data
          this.getProducts = res.result.total
        })
    },


    async createProduct(data) {
      return await $api('product/create', {
        method: 'Post', 
        body: data,
      })
    },
    async deleteProduct(id) {
      return await $api(`product/delete/${id}`, {
        method: 'Delete',
      })
    },
    async updateProduct(id, data) {
      return await $api(`product/update/${id}`, {
        method: 'Put',
        body: data,
      })
    },
    async getProductById(id) {
      return await $api(`product/${id}`)
      
    },
    async fielUpload(data) {
      return await $api('file/create', {
        method: 'Post',
        body: data,
      })
    },
    async searchProduct(data) {
      return await $api(`product/search?name=${data}`)
        .then(res => {
          this.getProduct = res.result
        })
      
    },

    

  },
})
