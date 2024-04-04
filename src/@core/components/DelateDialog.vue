<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <!-- 👉 Delete Dialog  -->
    <VDialog
      v-model="props.delateModal"
      max-width="500px"
      persistent
    >
      <VCard>
        <VCardTitle>
          Are you sure you want to delete this item?
        </VCardTitle>

        <VCardActions>
          <VSpacer />

          <VBtn
            color="error"
            variant="outlined"
            @click="emit('update:delateModal', false)"
          >
            Cancel
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="emit('deleteElement')"
          >
            OK
          </VBtn>

          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
const props =  defineProps({
  delateModal: {
    type: Boolean,
    required: true,
  }, 
})

const emit = defineEmits(['update:delateModal', 'deleteElement'])




const deleteDialog = ref(true)
</script>

