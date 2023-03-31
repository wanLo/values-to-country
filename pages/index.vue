<template>
  <!--<Tutorial/>-->
  <div>
    {{ vector }}
    {{ predicted_country }}
    <form class="w-full mx-auto flex flex-wrap items-center justify-center">
      <div
        v-for="(item, index) in survey"
        :key="item.question"
      >
        <h3 class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap text-left mb-4 mt-8">
          {{ item.question }}
        </h3>
        <Range
          class="my-4"
          label-left="Never justifiable"
          label-right="Always justifiable"
          :range-value="get_answer(index)"
          @update:rangeValue="set_answer(index, $event)"
        />
      </div>
    </form>
  </div>
</template>

<script>
import KNN from 'ml-knn'
import Range from '~/components/Range'
import * as d3 from "d3"

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
      survey: [
        {
          question: 'Claiming government benefits to which you are not entitled',
          value: null
        },
        {
          question: 'Avoiding a fare on public transport',
          value: null
        },
        {
          question: 'Stealing property',
          value: null
        },
        {
          question: 'Cheating on taxes if you have a chance',
          value: null
        },
        {
          question: 'Someone accepting a bribe in the course of their duties',
          value: null
        },
        {
          question: 'Homosexuality',
          value: null
        },
        {
          question: 'Prostitution',
          value: null
        },
        {
          question: 'Abortion',
          value: null
        },
        {
          question: 'Divorce',
          value: null
        },
        {
          question: 'Sex before marriage',
          value: null
        },
        {
          question: 'Suicide',
          value: null
        },
        {
          question: 'Euthanasia',
          value: null
        },
        {
          question: 'For a man to beat his wife',
          value: null
        },
        {
          question: 'Parents beating children',
          value: null
        },
        {
          question: 'Violence against other people',
          value: null
        },
        {
          question: 'Terrorism as a political, ideological or religious mean',
          value: null
        },
        {
          question: 'Having casual sex',
          value: null
        },
        {
          question: 'Political violence',
          value: null
        },
        {
          question: 'Death penalty',
          value: null
        }
      ]
    }
  },
  /*async fetch() {
    this.data = await fetch('~/static/questions_cleaned.csv')
    const parser = parse({delimiter: ',', from_line: 2})
    parser.on('readable', (row) => {
      console.log(row)
    })
  },*/
  async mounted() {
    const d = await d3.csv("questions_cleaned.csv")
    console.log(d[0])
  },
  methods: {
    get_answer(n) {
      return this.survey[n].value
    },
    set_answer(n, val) {
      this.survey[n].value = val
    }
  },
  computed: {
    vector: {
      get() {
        return this.survey.map(({value}) => value)
      }
    },
    predicted_country: {
      get() {
        return null
      }
    }
  }
}
</script>
