<template>
  <!--<Tutorial/>-->
  <div>
    {{ predicted_country }}
    <form class="w-full mx-auto flex flex-wrap items-center justify-center">
      <Range
        class="my-4"
        label-left="Never justifiable"
        label-right="Always justifiable"
        :range-value.sync="inputSlider"
      />
    </form>
  </div>
</template>

<script>
import KNN from 'ml-knn'
import Range from '~/components/Range'

var train_dataset = [
  [0, 0, 0],
  [0, 1, 1],
  [1, 1, 0],
  [2, 2, 2],
  [1, 2, 2],
  [2, 1, 2],
]
var train_labels = [0, 0, 0, 1, 1, 1]
var knn = new KNN(train_dataset, train_labels, { k: 2 }) // consider 2 nearest neighbors

var test_dataset = [
  [0.9, 0.9, 0.9],
  [1.1, 1.1, 1.1],
  [1.1, 1.1, 1.2],
  [1.2, 1.2, 1.2],
]
var ans = knn.predict(test_dataset)

export default {
  name: 'IndexPage',
  data(){
    return {
      predicted_country: -1,
      inputSlider_value: null
    }
  },
  computed: {
    inputSlider: {
      // can't use shorthand () => {} because we need the correct scope
      get() {
        return this.inputSlider_value
      },
      set(rating) {
        this.inputSlider_value = rating
        this.predicted_country = rating
      },
    }
  }
}
</script>
