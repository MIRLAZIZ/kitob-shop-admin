<script setup>
const props = defineProps({
  viewsItem: {
    type: Object,
    required: true,
  },
 
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
])







const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 500"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
    persistent

    
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3">
          Edit User Information
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <!-- <pre> {{ props.viewsItem}}</pre> -->
        <div class="border rounded pa-3" >
          <p>Umumiy son: {{ props.viewsItem.total_amount}}</p>
          <p>Soni :{{ props.viewsItem.discount}}</p>
          <p>To'lov turi: {{ props.viewsItem.payment_method}}</p>
          <p>Yetkazib berish turi: {{ props.viewsItem.delivery_type}}</p>
          <p>Yetkazib berish manzili: {{ props.viewsItem.delivery_address}}</p>
          <p>Holati: {{ props.viewsItem.status}}</p>
        </div>
      </VCardText >
      <VCol class="d-flex justify-end" >
        <VBtn 
                color="secondary"
                variant="tonal"
                @click="dialogModelValueUpdate(false)"
              >
                Cancel
          </VBtn>
      </VCol>
    </VCard>  


       
  </VDialog>
</template>
