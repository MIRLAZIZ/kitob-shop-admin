<script setup>
import { useInvoice } from '@/@core/stores/invoice'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import ViewsInvoice from '@/views/invoice/viewsInvoce.vue'
import DelateDialog from '@/@core/components/DelateDialog.vue'
import { useConfigStore } from '@/@core/stores/config'

const store = useInvoice()
const options = ref({ page: 1, itemsPerPage: 12 })
const loading = ref(false)
const isDialogVisible = ref(false)
const viewsItem = ref({})
const deleteId = ref(null)
const delateModal = ref(false)

const storeConfig = useConfigStore()

const refresh = () => {
  loading.value = true
  store.fetchInvoice(options.value.page)
    .then(() => {
      loading.value = false
    })
}

const headers = [

  { title: "Total Amount", key: "total_amount" },
  { title: "Discount", key: "discount" },
  { title: "Payment Method", key: "payment_method" },
  { title: "Delivery Type", key: "delivery_type" },
  { title: "Delivery Addess", key: "delivery_addess" },
  { title: 'Status', key: 'status' },
  { title: "Action", key: "actions" },
  
  
]

const deleteItem = () => {
  if(deleteId.value) {
    store.deleteInvoice(deleteId.value).then(() => {
      refresh()

      delateModal.value = false

      storeConfig.successToast()
    })
      .catch(error => {
        if(error.response.status >= 500) {
          storeConfig.errorToast('Serverda xatolik')
        
        }
      })
  }
}

const deleteInviece =id => {
  deleteId.value = id
  delateModal.value = true

}





const resolveStatusVariant = status => {
  if (status === 'pending')
    return { color: 'primary', text: 'Pending' }
  else if (status === 'completed')
    return { color: 'success', text: 'completed' }
  else if (status === 'canceled')
    return { color: 'error', text: 'Canceled' }
  else if (status === 'inprocess')
    return { color: 'warning', text: 'Inprocess' }  
  else if (status === 'draft')
    return { color: 'info', text: 'Draft' }
  else
    return { color: 'info', text: 'Delivered' }
}

const viewItem = item => {
  viewsItem.value = item
  isDialogVisible.value = true
}

onMounted(() => {
  refresh()})
</script>
    
<template>
  <div>
    <VDataTable 
      :headers="headers"
      :items="store.getInvoice?.data"
      :items-per-page="options.itemsPerPage"
      :page="options.page"
      
    
    
      >

                    <!-- Actions -->
      <template #item.actions="{ item }">
      <div class="d-flex gap-1">
        <IconBtn @click="deleteInviece(item.id)">
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

    <!-- status -->
    <template #item.status="{ item }">
        <VChip
        :color="resolveStatusVariant(item.status).color"
          class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
      </template>

      <template #bottom
      >
        <VCardText class="pt-2">
          <div class="d-flex justify-end">
            <VPagination
            v-if="store.getInvoice && store.getInvoice.total"

              v-model="options.page"
              :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(store.getInvoice?.total / options.itemsPerPage)"
              @click="refresh"
            />
          </div>
        </VCardText>
      </template>

    </VDataTable>

    <ViewsInvoice
     v-model:isDialogVisible="isDialogVisible" 
     :viewsItem="viewsItem"/>

     <DelateDialog 
     v-model:delateModal="delateModal" 
     @deleteElement="deleteItem" />
   
  </div>
</template>


