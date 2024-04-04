import { defineStore } from "pinia"

export const useClient = defineStore("client", {
  state: () => ({
    getClient: [],
  }),
  
  actions: { 
    async fetchClient(page) {

      return await $api(`clients?page=${page}`)
        .then(res => {
          this.getClient = res.result
        })        
    },
    async delateClient(id) {
      return await $api(`client/delete/${id}`, { 
        method: 'Delete',
      })
    },

    // search
    async searchClient(data) {
      return await $api(`client/search?name=${data}`)
        .then(res => {
          this.getClient = res.result
        })
    },

  },

})
