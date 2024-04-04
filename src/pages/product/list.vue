
<script setup lang="ts">
import DelateDialog from '@/@core/components/DelateDialog.vue';
import { useConfigStore } from '@/@core/stores/config';
import { useProduct } from '@/@core/stores/product';
import AddNewProduct from '@/views/products/AddNewProduct.vue';
import ProductsVuews from '@/views/products/ProductsViews.vue';
import { watch } from 'vue';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';


const url = import.meta.env.VITE_API_BASE_URL
const store = useProduct()
const options = ref({ page: 1, itemsPerPage: 12})
const isAddNewProductDrawerVisible = ref(false)
const delateModal = ref(false)
const productId = ref(null)
const product_Id = ref(null)
const isDialogVisible = ref(false)
const viewsItem = ref({})
const search = ref(null)

const storeConfig = useConfigStore()

// headers
const headers = [
  { title: 'NAME', key: 'name' },
  { title: 'description', key: 'description' },
  { title: 'price', key: 'price' },
  { title: 'discount', key: 'discount' },
  { title: 'quantity', key: 'quantity' },
  { title: 'STATUS', key: 'status' },
  {title: 'ACTION', key: 'action'}
]
const refresh = () => {
  store.fetchProduct(options.value.page)
}

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }

  else if (status === 2)
    return { color: 'success', text: 'Professional' }

  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
 
}



// edit product 
const editItem = (id: number) => {
  product_Id.value = id
  isAddNewProductDrawerVisible.value = true
  
  
}
// delete product 
const deleteItem = (id:number) => {
  productId.value = id
  delateModal.value = true
}
const deleteProduct = () => {
  if(productId.value) {
    store.deleteProduct(productId.value).then(() => {
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
// Views item 
const viewItem = (item) => {
  // product_Id.value = id
  isDialogVisible.value = true
  viewsItem.value = item
  
}
// search watch 
watch(search, (newValue) => {
  if(search.value.length > 3) {
    
    store.searchProduct(search.value)
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
  
  <VRow  class="d-flex justify-space-between mb-5">

    <VCol cols="3">
      <AppTextField
    label="search:"
    v-model="search" 
                />

    </VCol>
   
    

    <VCol cols="4" class=" d-flex justify-end align-end">
      <VBtn color="primary" @click="isAddNewProductDrawerVisible = true, product_Id = null">
       <VIcon icon="tabler-plus" size="x-large" />
       <span class="ms-2">{{ $t('add product') }}</span>
       </VBtn> 


    </VCol>

    
  </VRow>

 


 
  <VDataTable
    :headers="headers"
    :items="store.getProduct"
    
    


  >
    <!-- full name -->
    <template #item.name="{ item }">
      <!-- {{ item }} -->
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.image"
            :src="url+item.image"
          />
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item['name_'+$i18n.locale] }}</span>
        </div>
      </div>
    </template>
    <!--description-->
    <template #item.description="{ item }">
      <!-- {{ item }} -->
      <span v-if="item['description_'+$i18n.locale]">{{ item['description_'+$i18n.locale]?.length > 10 ? item['description_'+$i18n.locale].substring(0, 10) + '...' : item['description_'+$i18n.locale] }} </span>
    <span v-else>-</span>
    </template>

    <!-- Actions -->
    <template #item.action="{ item }">
      <div class="d-flex gap-1">
        <IconBtn @click="editItem(item.id)">
          <VIcon icon="tabler-edit" 
          color="#50C878"/>
        </IconBtn>
        <IconBtn @click="deleteItem(item.id)">
          <VIcon icon="tabler-trash"
          color="error" />
        </IconBtn>

        <IconBtn @click="viewItem(item)">
          <VIcon icon="tabler-eye" 
          color="primary"/>
        </IconBtn>
      </div>
    </template>

   

    <template #bottom>
      <VCardText class="pt-2">
        <div class="d-flex justify-end">
         

          <VPagination
            v-model="options.page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(store.getProducts / options.itemsPerPage)"
          />
        </div>
      </VCardText>
    </template>
  </VDataTable>
  <AddNewProduct 
      v-model:isDrawerOpen="isAddNewProductDrawerVisible" 
      @refresh="refresh"
      :product_Id="product_Id"
    
    />
    <DelateDialog
      v-model:delate-modal="delateModal"
      @delete-element="deleteProduct"
    />
    <ProductsVuews
      v-model:isDialogVisible="isDialogVisible"
      :viewsItem="viewsItem"
    />


</template>



