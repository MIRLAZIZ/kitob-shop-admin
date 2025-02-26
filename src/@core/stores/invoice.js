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
  
    async deleteInvoice(id) {
      return await $api(`payment/delete/${id}`, {
        method: 'Delete',
      })
    },

  },
})










