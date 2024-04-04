import { $api } from '@/utils/api'
import { defineStore } from 'pinia'

export const useInvoice = defineStore('invoice', {
  state: () => ({
    getInvoice: [],
  }),
  actions: {

    // get invoice
    async fetchInvoice(page) {
      return await $api(`payment/invoices?page=${page}`)
        .then(res => {
          this.getInvoice = res.result
        })
    },
  
    async createInvoice(data) {
      return await $api('invoice/create', {
        method: 'Post',
        body: data,
      })
    },

  },
})
