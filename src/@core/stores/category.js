import { $api } from '@/utils/api'
import { defineStore } from 'pinia'

export const useCategory = defineStore('category', {
  state: () => ({
    getCategory: null,
  }),
  actions: {
    async fetchCategory() {
      return await $api('category/tree')
        .then(res => {
          this.getCategory = res.result
        })
    },
    async createCategory(data) {
      return await $api('category/create', {
        method: 'Post',
        body: data,
      })
    },
    async delateCategory(id) {
      return await $api(`category/delete/${id}`, {
        method: 'Delete',
      })
    },
    async updateCategory(data) {
      return await $api(`category/update/${data.id}`, {
        method: 'Put',
        body: data,
      })
    },

  },
})
