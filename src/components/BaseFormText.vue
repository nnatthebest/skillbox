<template>
  <base-form-field-vue :title="title" :error="error">
    <masked-input
      v-if="mask"
      :mask="mask"
      :placeholder="placeholder"
      v-model="dataValue"
      class="form__input"
      @input="rawVal = arguments[1]"
    />
    <input v-else class="form__input" :type="type" :placeholder="placeholder" v-model="dataValue" />
  </base-form-field-vue>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'
import MaskedInput from 'vue-masked-input'

export default {
  props: {
    type: {
      default: 'text',
    },
    mask: {},
  },
  components: {
    MaskedInput,
  },
  mixins: [formFieldMixin],
}
</script>
