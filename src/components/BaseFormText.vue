<template>
  <base-form-field-vue :title="title" :error="error">
    <input class="form__input" :type="type" :placeholder="placeholder" v-model="dataValue" />
  </base-form-field-vue>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
}
</script>
