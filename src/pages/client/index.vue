<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useClient } from '@/@core/stores/client'
import { onMounted, ref } from 'vue'
import DelateDialog from '@/@core/components/DelateDialog.vue'
import { useConfigStore } from '@/@core/stores/config'
import UserDialog from '@/views/client/ViewsClient.vue'


const store = useClient()
const options = ref({ page: 1, itemsPerPage: 12 })
const url = import.meta.env.VITE_API_BASE_URL
const clientId = ref(null)
const delateModal = ref(false)
const isDialogVisible = ref(false)
const viewsItem = ref({})
const storeConfig = useConfigStore()
const search = ref(null)



const headers = [
  
  {
    title: 'Full Name',
    key: 'full_name',
  },
  {
    title: 'Phone',
    key: 'phone',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Gender',
    key: 'gender' },
  {
    title: 'Address',
    key: 'address',
  },
 
  {
    title: 'Type',
    key: 'type',
  },

  {
    title: 'Actions',
    key: 'action',
  },

]

const refresh = () => {
  store.fetchClient(options.value.page)
}

const deleteItem = id => {
  clientId.value = id
  delateModal.value = true
}

const deleteClient = () => {
  if(clientId.value) {
    store.delateClient(clientId.value).then(() => {
      refresh()
      storeConfig.successToast()
      delateModal.value = false
    })
      .catch(error => {
        if(error.response.status >= 500) {
          storeConfig.errorToast('Serverda xatolik')
        
        }
      })
  }
}

const viewItem = item => {
  // product_Id.value = id
  isDialogVisible.value = true
  viewsItem.value = item
}


// search watch 
watch(search, newValue => {
  if(search.value.length > 3) {
    
    store.searchClient(search.value)
  }
  else if (search.value.length == 0) {
    refresh()
  }
  
})

onMounted(() => {
  refresh()
})
</script>

<template>
  <VCol cols="3">
    <AppTextField
      v-model="search"
      label="search:" 
    />
  </VCol>
  <VDataTable
    :items="store.getClient.data"
    :headers="headers"
    :items-per-page="options.itemsPerPage"
>
    <!-- full name -->
    <template #item.full_name="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.image ? '' : 'primary'"
          :class="item.image ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.image ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.image"
            :src="url+item.image"
          />
          <span v-else>{{ avatarText(item.full_name) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.full_name }}</span>
        </div>
      </div>
    </template>

    <!-- Actions -->
    <template #item.action="{ item }">
      <div class="d-flex gap-1">
        <IconBtn @click="deleteItem(item.id)">
          <VIcon
            icon="tabler-trash"
            color="error"
          />
        </IconBtn>

        <IconBtn @click="viewItem(item)">
          <VIcon
            icon="tabler-eye" 
            color="primary"
          />
        </IconBtn>
      </div>
    </template>

    <!-- email -->
    <template #item.email="{ item }">
      <span v-if="item.email">{{ item.email }}</span><span v-else>-</span>
    </template>
    <!-- address  -->
    <template #item.address="{ item }">
      <span v-if="item.address">{{ item.address }}</span><span v-else>-</span>
    </template>
    <!-- gender -->
    <template #item.gender="{ item }">
      <span v-if="item.gender">{{ item.gender }}</span><span v-else>-</span>
    </template>



    <!-- bottom -->
    
    <template
      v-if="store.getClient && store.getClient.total"
      #bottom
    >
      <VCardText class="pt-2">
        <div class="d-flex justify-end">
          <VPagination
            v-model="options.page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(store.getClient.total / options.itemsPerPage)"
            @click="refresh"
          />
        </div>
      </VCardText>
    </template>
  </VDataTable>

  <DelateDialog
    v-model:delate-modal="delateModal"
    @delete-element="deleteClient"
  />
  <UserDialog
    v-model:isDialogVisible="isDialogVisible"
    :views-item="viewsItem"
  />
</template>


