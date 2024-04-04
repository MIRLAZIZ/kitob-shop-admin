<script setup lang="ts">
const props = defineProps({

  isDialogVisible: {
    type: Boolean,
    required: true,

  },
  viewsItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  "update:isDialogVisible",
])

const url = import.meta.env.VITE_API_BASE_URL
</script>

<template>
  <VDialog
    max-width="1000"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />
    <VCard class="pa-5 pa-sm-8">
      <VRow>
        <VCol
          class="d-flex justify-center "
          cols="12"
        > 
          <img
            :src="url+props.viewsItem.image"
            class="imgProduct "
          >
        </VCol>
        <!--
          <pre>        {{ props.viewsItem }}
          </pre> 
        -->



       
        <!-- name uz -->
        <VCol cols="4">
          <label>Name uz</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.name_uz }}
          </p>
        </VCol>
        <!--
          name
          ru 
        -->
        <VCol cols="4">
          <label>Name ru</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.name_ru }} 
          </p>
        </VCol>
        <!-- name en -->
        <VCol cols="4">
          <label>Name en</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.name_en }}
          </p>
        </VCol>


        <!-- description -->
        
        <!-- description uz -->
        <VCol
          v-if="props.viewsItem.description_uz"
          cols="4"
        >
          <label>description uz</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.description_uz }}
          </p>
        </VCol>

        <!-- description ru -->
        <VCol
          v-if="props.viewsItem.description_ru"
          cols="4"
        >
          <label>description ru</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.description_ru }}
          </p>
        </VCol>

        <VCol
          v-if="props.viewsItem.description_en"
          cols="4"
        >
          <label>description en</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.description_en }}
          </p>
        </VCol>

        <!-- price  -->
        <VCol cols="4">
          <label>price</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.price }}
          </p>
        </VCol>

        <!-- quantity -->
        <VCol cols="4">
          <label>quantity</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.quantity }}
          </p>
        </VCol>
        <!-- discount -->
        <VCol cols="4">
          <label>discount</label>
          <p class="border  rounded pa-1">
            {{ props.viewsItem.discount }}%
          </p>
        </VCol>





        <!--
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
        -->
      </VRow>
      <div class="d-flex justify-end mt-5">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="$emit('update:isDialogVisible', false)"
        >
          Cancel
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.imgProduct {
  border-radius: 15px;
  block-size: 200px;
  inline-size: 200px;
}
</style>
