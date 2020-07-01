<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item"><a href="#" class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': page === 1}"
        aria-label="Предыдущая страница страница" @click.prevent="prevPage">&lt;</a></li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber"><a href="#"
        class="pagination__link" :class="{'pagination__link--current': pageNumber === page}"
        @click.prevent="paginate(pageNumber)">{{ pageNumber }}</a></li>
    <li class="pagination__item"><a href="#" class="pagination__link pagination__link--arrow"
        aria-label="Следующая страница" :class="{'pagination__link--disabled': page === pages}"
        @click.prevent="nextPage">&gt;</a></li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  name: 'BasePagination',
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    prevPage() {
      if (this.page !== 1) {
        this.$emit('paginate', this.page - 1);
      }
    },
    nextPage() {
      if (this.page !== this.pages) {
        this.$emit('paginate', this.page + 1);
      }
    },
  },
};

</script>
