
<!-- eslint-disable camelcase -->
<!-- eslint-disable camelcase -->
<!-- eslint-disable vue/no-restricted-class -->
<template>
  <div>
    <div>
      <VTextField
        v-model="search"
        :label="$t('search')"
        density="compact"
       
        class="w-50 mb-4"
      />
    </div>
    <VBtn
      class="mb-5"
      @click="addFile(null)"
    >
      {{ $t('add category') }}
    </VBtn>

    <div
      v-if="!loading"
      class="d-flex justify-center"
    >
      <VProgressCircular
        :size="50"
        color="primary"
        indeterminate
      />
    </div>
    <div v-else>
      <div
        v-for="node in flattenedTreeData"
        :key="node.id"
        class="d-flex justify-space-between   categoryWidth cursor-pointer"
      >
        <div
          :class="{child: node.parent_id}"
          class="d-flex"
        >
          <div
            v-if="!node.parent_id"
            class="mr-1"
          >
            <VIcon
              v-if="node.id == toggleId"
              icon="tabler-caret-down-filled" 
              size="24"
              color="#838996"
              :class="{displayVisibil: !node.items.length > 0}"
              @click="openFile(node.id)"
            />

            <VIcon
              v-else
              icon="tabler-caret-right-filled" 
              size="24"
              color="#838996"
              :class="{displayVisibil: !node.items.length > 0}"
              @click="openFile(node.id)"
            />
          </div>
          <div class="d-flex align-end">
            <span class="mr-1">
              <VIcon
                v-if="!node.parent_id"
                icon="tabler-folder-filled"
                size="20"
                color="#FFD764"
              />

              <VIcon
                v-else
                icon="tabler-file"
                size="18"
                color="#9B93F4"
                :class="{fileNone: node.parent_id !== toggleId && node.parent_id}"
              />


            </span>
            <span :class="{fileNone: node.parent_id !== toggleId && node.parent_id}">

              <span v-if="showCategoryInput !== node.id"> {{ node?.name_uz }}</span>
              <span v-else>  
                <input
                  v-model="categoryName"
                  autofocus
                  type="text"
                  class="border rounded editInput px-1"
                  @keydown.enter="updateCategory(node)"
                ></span>
          
          
          
            </span>
          </div>
        </div>


        <!-- action -->
        <div
          v-if="node.parent_id == toggleId || !node.parent_id"
          class="d-flex"
        >
          <div
            v-if="!node.parent_id"
            class=" px-1 "
            @click="addFile(node.id)"
          >
            <VIcon
              icon="tabler-file-plus"
              color="#FFD764"
            />
          </div>
          <div
            class="mx-2  px-1"
            @click="editCategory(node)"
          >
            <VIcon
              icon="tabler-pencil" 
              color="#00b341"
            />
          </div>
          <div
            class=" px-1 "
            @click="dealteCategory(node.id)"
          >
            <VIcon
              icon="tabler-trash"
              color="#ff4500"
            />
          </div>
        </div>
      </div>
    </div>
    
    
    <DelateDialog
      v-model:delate-modal="delateModal"
      @delete-element="deletefile"
    />
  </div>
</template>




<script setup>
import DelateDialog from '@/@core/components/DelateDialog.vue'
import { useCategory } from '@/@core/stores/category'
import { useConfigStore } from '@/@core/stores/config'
import { watch } from 'vue'

definePage({
  meta: {
    action: 'create',
    subject: 'all',
  },
})

// variables
const store = useCategory()
const flattenedTreeData = ref([])
const toggleId = ref(null)
const delateModal = ref(false)
const categoryId = ref(null)
const storeConfig = useConfigStore()
const categoryName = ref(null)
const showCategoryInput = ref(null)
const lang = ref('uz')
const search = ref(null)
const loading = ref(true)


const treeRecursion = data => {
  data.forEach(node => {
   
    const element = { ...node }

    flattenedTreeData.value.push(element)

    if (node.items) {
      treeRecursion(node.items)
    }
   
  })
}

const refresh = () => {
  loading.value = false

  store.fetchCategory()
    .then(() => {
      flattenedTreeData.value = []
      treeRecursion(store.getCategory)
      loading.value = true


    })
}

const deletefile = () => {
  if(categoryId.value) {
    
    store.delateCategory(categoryId.value).then(() => {
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

const editCategory = item => {
  let name = 'name_' + lang.value
  showCategoryInput.value = item.id
  categoryName.value = item[name]
}

const openFile = id => {
  if(toggleId.value == id) {
    toggleId.value = null
  }else {
    toggleId.value = id
  }
  
}

const addFile = id=> {

  const data = {
    // eslint-disable-next-line camelcase
    name_uz: 'yangi fayl',
    // eslint-disable-next-line camelcase
    name_ru: 'новый файл',
    // eslint-disable-next-line camelcase
    name_en: 'new file',
    // eslint-disable-next-line camelcase
    parent_id: id,
  }

  store.createCategory(data).then(() => {
    storeConfig.successToast()
    refresh()    
  }).catch(error => {
    if(error.response.status >= 500) {
      storeConfig.errorToast('Serverda muammo chiqdi iltimos keyinroq xarakat qilib ko\'ring!')
      
    }
  })
}

const dealteCategory = id => {
  delateModal.value = true
  categoryId.value = id
}

// update category
const updateCategory = item => {
  let name = 'name_' + lang.value
  let data = {
    id: item.id,
    // eslint-disable-next-line camelcase
    name_uz: item.name_uz,
    // eslint-disable-next-line camelcase
    name_ru: item.name_ru,
    // eslint-disable-next-line camelcase
    name_en: item.name_en,
    // eslint-disable-next-line camelcase
    parent_id: item.parent_id,
  }
  data[name] = categoryName.value
  store.updateCategory(data).then(() => {
    refresh()
    storeConfig.successToast()
    showCategoryInput.value = null
  }).catch(error => {
    if(error.response.status >= 500) {
      storeConfig.errorToast('Serverda xatolik')
      
    }
  })
}

watch(search, newValue => {
  console.log(flattenedTreeData.value)

  // flattenedTreeData.value = flattenedTreeData.value.filter(item => {
  //   return item.name_uz.toLowerCase().includes(search.value.toLowerCase())})
  

}, { deep: true })



// const filteredList = computed(() => {
//   return itemList.filter(item => {
//     return item.name.toLowerCase().includes(search.value.toLowerCase())
//   })
// })




onMounted(() => {
  refresh()
  
})
</script>

<style scoped>
.child {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  margin-left: 50px;
}

.fileNone {
  display: none;
}


.displayVisibil {
  visibility: hidden;

} 

.categoryWidth {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  width: 30%;
}
/* stylelint-disable-next-line rule-empty-line-before */
.categoryWidth:hover {
  outline: 1px solid #9B93F4;
  /* stylelint-disable-next-line order/properties-order */
  border-radius: 5px;
}
/* stylelint-disable-next-line rule-empty-line-before */
.editInput:focus {
  outline: none;
}
</style>


<!--
  category                                        GET
  category/{id}                                GET
  category/create                           POST
  category/update/{id}                  UPDATE
  category/delete/{id}                   DELETE 
-->
