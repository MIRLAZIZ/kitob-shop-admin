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

const url = import.meta.env.VITE_API_BASE_URL







const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 677"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
    persistent

  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VCardTitle class="text-h3 mb-3 text-center">
        Edit User Information
      </VCardTitle>

        
    

      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="12"
          > 
            <div
              v-if="!props.viewsItem.image"
              class="d-flex justify-center align-center border rounded "
              style="block-size: 133px; inline-size: 98px;"
            >
              <p class="text-center">
                rasmi yo'q
              </p>
            </div>
            
            <VImg
              v-else
              class="rounded border"
              :width="100"
              :src="url + props.viewsItem.image"
            />
          </VCol>


          <!-- 👉 First Name -->
          <VCol
            v-if="props.viewsItem.full_name"
            cols="12"
            md="6"
            class="py-0"
          >
            <label>First Name</label>
            <p class="border  rounded pa-1">
              {{ props.viewsItem.full_name }}
            </p>
          </VCol>

          <!-- 👉 phone -->
          <VCol
            v-if="props.viewsItem.phone"
            cols="12"
            md="6"
            class="py-0"
          >
            <label>Phone</label>
            <p class="border  rounded pa-1">
              {{ props.viewsItem.phone }}
            </p>
          </VCol>

          <!-- 👉 Email -->
          <VCol
            v-if="props.viewsItem.email"
            cols="12"
            md="6"
            class="py-0"
          >
            <label>Email</label>
            <p class="border  rounded pa-1">
              {{ props.viewsItem.email }}
            </p>
          </VCol>

          <!-- 👉 gender -->
          <VCol
            v-if="props.viewsItem.gender"
            cols="12"
            md="6"
            class="py-0"
          >
            <label>Gender</label>
            <p class="border  rounded pa-1">
              {{ props.viewsItem.gender }}
            </p>
          </VCol>

          <!-- 👉 address  -->
          <VCol
            v-if="props.viewsItem.address"
            cols="12"
            md="6"
            class="py-0"
          >
            <label>Address</label>
            <p class="border  rounded pa-1">
              {{ props.viewsItem.address }}
            </p>
          </VCol>

          <!-- 👉 birth_date -->
          <VCol
            v-if="props.viewsItem.birth_date"
            cols="12"
            md="6"
            class="py-0"
          >
            <label>Birth Date</label>
            <p class="border  rounded pa-1">
              {{ props.viewsItem.birth_date }}
            </p>
          </VCol>

          <!-- 👉 type  -->
          <VCol
            v-if="props.viewsItem.type"
            cols="12"
            md="6"
            class="py-0"
          >
            <label>Type</label>
            <p class="border  rounded pa-1">
              {{ props.viewsItem.type }}
            </p>
          </VCol>

           

            

          <!-- 👉 Submit and Cancel -->
          <VCol
            cols="12"
            class="d-flex justify-end"
          >
            <VBtn
              color="secondary"
              variant="tonal"
              @click="dialogModelValueUpdate(false)"
            >
              Cancel
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>



