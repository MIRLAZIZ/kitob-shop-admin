import { $api } from '@/utils/api'
import { defineStore } from 'pinia'

export const useLogin = defineStore('login', {
  actions: {
    async login(data) {
      return await $api(`/client/login`, {
        method: 'Post',
        body: data,
      })
    },

  },
})
