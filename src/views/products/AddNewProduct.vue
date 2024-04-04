<!-- eslint-disable promise/no-nesting -->
<!-- eslint-disable camelcase -->
<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useConfigStore } from '@/@core/stores/config'
import { onMounted, watch, ref } from 'vue'
import { useProduct } from '@/@core/stores/product'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  // eslint-disable-next-line vue/prop-name-casing
  product_Id: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'refresh',
])

const store = useProduct()

const storeConfig = useConfigStore()
const url = import.meta.env.VITE_API_BASE_URL





const isFormValid = ref(false)
const refForm = ref()
const data = ref(null)

const productData = ref( {
  name_uz: null,
  name_ru: null,
  name_en: null,
  description_uz: null,
  description_ru: null,
  description_en: null,
  image: null,
  price: null,
  quantity: null,
  discount: null,
        
})

const imageError = ref(false)

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const errorData = ref(null)

// 👉 drawer close
const closeNavigationDrawer = () => {

  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
    productData.value.image = null
    errorData.value = null

  })
}

const onSubmit = () => {
  productData.value.image ? imageError.value = false : imageError.value = true
  refForm.value?.validate().then(({ valid }) => {
    if (valid && !imageError.value) {   
      if(!props.product_Id) {
        store.createProduct(productData.value)
          .then(res => {
          // storeConfig.sucessToast()

            if(res.success) {
              emit('update:isDrawerOpen', false)
              storeConfig.successToast()
            

              emit('refresh')
              nextTick(() => {
                refForm.value?.reset() 
                refForm.value?.resetValidation()
                productData.value.image = null
                errorData.value = null
              })

          
            }
          }).catch(err => {

            storeConfig.errorToast('Error while creating user. Please try again later.')

          // errorData.value = err.response._data.errors 
          })
      }
      else {
        store.updateProduct(props.product_Id, productData.value)
          .then(res => {
          // storeConfig.sucessToast()f

            if(res.success) {
              emit('update:isDrawerOpen', false)
              storeConfig.successToast()
            

              emit('refresh')
              nextTick(() => {
                refForm.value?.reset() 
                refForm.value?.resetValidation()
                errorData.value = null
                productData.value.image = null
              })

          
            }
          }).catch(err => {

            // storeConfig.errorToast('Error while creating user. Please try again later.')

          // errorData.value = err.response._data.errors 
          })
      }
      
      

     
    }
  })
}


// change file product
const fileUplaoud = e => {
  console.log(e.target.files[0])


  let file = e.target.files[0]

  let formdata = new FormData()
  formdata.append('image', file)
  formdata.append('type', 'product')
  formdata.append('height', '1000')
  formdata.append('width', '1000')
  formdata.append('x', '0')
  formdata.append('y', '0')

  
  store.fielUpload(formdata)
    .then(res => {

      productData.value.image = res.files[0].path
    
    })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

watch(
  () => props.product_Id,
  () => {
    if (props.product_Id) {
      store.getProductById(props.product_Id)
        .then(res => {
          productData.value = res.data

          // productData.value.name_uz = res.data.name_uz
          // productData.value.name_ru = res.data.name_ru
          // productData.value.name_en = res.data.name_en
          // productData.value.description_uz = res.data.description_uz
          // productData.value.description_ru = res.data.description_ru
          // productData.value.description_en = res.data.description_en
          // productData.value.price = res.data.price
          // productData.value.quantity = res.data.quantity
          // productData.value.discount = res.data.discount

          

          // productData.value = res.data
        })
    }
  },
  { immediate: true })
onMounted(() => {
  if (props.product_Id) {
    store.getProductById(props.product_Id)
      .then(res => {
        productData.value = res.data

        // productData.value.name_uz = res.data.name_uz
        // productData.value.name_ru = res.data.name_ru
        // productData.value.name_en = res.data.name_en
        // productData.value.description_uz = res.data.description_uz
        // productData.value.description_ru = res.data.description_ru
        // productData.value.description_en = res.data.description_en
        // productData.value.price = res.data.price
        // productData.value.quantity = res.data.quantity
        // productData.value.discount = res.data.discount

          

        // productData.value = res.data
      })
  }
})
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add User"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VCol
            cols="12"
            class="d-flex align-center justify-center"
          >
            <div
              v-if="!productData.image"
              class="productImg border rounded d-flex align-center justify-center"
            >
              <p class="text-center">
                maxsulot rasmini yuklang
              </p>
            </div>
            <img
              v-else
              :src="url+productData.image"
              class="productImg rounded"
            >
          </VCol>
          <VCol
            v-if="imageError"
            class="pa-0"
          >
            <p
              class="text-center text-error "
              style="font-size: small;"
            >
              Maxsulot rasmini yuklash shart
            </p>
          </VCol>
         
          <VCol
            cols="12 pa-0 "
            style="height: 40px;"
          >
            <label
              for="file"
              class="w-100 h-100 d-flex align-center justify-center cursor-pointer bg-primary rounded"
            >Maxsulot rasmini yuklash </label>
            <input
              id="file"
              type="file"
              class="d-none"

              @change="fileUplaoud"
            >
          </VCol>


          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 name_uz -->
              <VCol cols="12">
                <AppTextField
                  v-model="productData.name_uz"
                  :rules="[requiredValidator]"
                  label="name_uz"
                />
                <small v-if="errorData?.name_uz">
                  <small
                    v-for="(item, idx) in errorData.name_uz"
                    :key="idx"
                    class="text-error fontSize"
                  >
                    {{ item }}</small>
                </small>
              </VCol>

              <!-- 👉 name_ru -->
              <VCol cols="12">
                <AppTextField
                  v-model="productData.name_ru"
                  :rules="[requiredValidator]"
                  label="name_ru"
                />

                <small v-if="errorData?.name_ru">
                  <small
                    v-for="(item, idx) in errorData.name_ru"
                    :key="idx"
                    class="text-error fontSize"
                  >
                    {{ item }}</small>
                </small>
              </VCol>         

              <!-- 👉 name_en -->

              <VCol cols="12">
                <AppTextField
                  v-model="productData.name_en"
                  :rules="[requiredValidator]"
                  label="name_en"
                />

                <small v-if="errorData?.name_en">
                  <small
                    v-for="(item, idx) in errorData.name_en"
                    :key="idx"
                    class="text-error fontSize"
                  >
                    {{ item }}</small>
                </small>
              </VCol> 
             
            



              <!-- description_uz -->
              <VCol cols="12">
                <label class="mb-5">description_uz</label>
                <VTextarea
                  v-model="productData.description_uz"
                  class="mt-1"
                />
                
                <small v-if="errorData?.description_uz">
                  <small
                    v-for="(item, idx) in errorData.description_uz"
                    :key="idx"
                    class="text-error fontSize"
                  >
                    {{ item }}</small>
                </small>     
              </VCol> 


              <!-- description_ru -->
              <VCol cols="12">
                <label class="mb-5">description_ru</label>

                <VTextarea
                  v-model="productData.description_ru"
                  class="mt-1"
                />
              </VCol> 


              <!-- description_en -->
              <VCol cols="12">
                <label class="mb-5">description_uz</label>

                <VTextarea
                  v-model="productData.description_en"
                  class="mt-1"
                />    
              </VCol> 
              <!-- price -->
              <VCol cols="12">
                <AppTextField
                  v-model="productData.price"
                  :rules="[requiredValidator]"
                  label="narxi"
                  type="number"
                />

                <small v-if="errorData?.price">
                  <small
                    v-for="(item, idx) in errorData.price"
                    :key="idx"
                    class="text-error fontSize"
                  >
                    {{ item }}</small>
                </small>
              </VCol> 

              <!-- quantity -->
              <VCol cols="12">
                <AppTextField
                  v-model="productData.quantity"
                  :rules="[requiredValidator]"
                  label="soni"
                  type="number"
                />

                <small v-if="errorData?.quantity">
                  <small
                    v-for="(item, idx) in errorData.quantity"
                    :key="idx"
                    class="text-error fontSize"
                  >
                    {{ item }}</small>
                </small>
              </VCol> 


              <!-- discount -->
              <VCol cols="12">
                <AppTextField
                  v-model="productData.discount"
                  :rules="[requiredValidator]"
                  label="chegirma"
                  type="number"
                />

                <small v-if="errorData?.discount">
                  <small
                    v-for="(item, idx) in errorData.discount"
                    :key="idx"
                    class="text-error fontSize"
                  >
                    {{ item }}</small>
                </small>
              </VCol> 

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style>
.productImg {
  width: 150px;
  height: 170px;
}
</style>
