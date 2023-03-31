<template>
  <div>
    <h2>
      Please tell me for each of the following actions whether you think it can always be justified, never be justified, or something in between.
    </h2>
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
    <h2>
      The country closest to your values is: {{ predicted_country }}
    </h2>
  </div>
</template>

<script>
import KNN from 'ml-knn'
import Range from '~/components/Range'
import * as d3 from "d3"

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
  async mounted() {
    const wvs_data = await d3.csv("questions_cleaned.csv", (d) => {
      const answers = []
      for (let i=177; i<=195; i++) {
        answers.push(parseInt(d['Q' + i]))
      }
      return {
        answers: answers,
        country: d.COUNTRY
      }
    })
    const training_data = wvs_data.map(({answers}) => answers)
    const training_labels = wvs_data.map(({country}) => country)
    this.knn = new KNN(training_data, training_labels, { k: 100 })
    console.log(this.knn)
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
        const vector = this.survey.map(({value}) => value)
        if (Object.values(vector).includes(null)) {
          return 'answers incomplete'
        }
        else {
          return this.knn.predict(vector)
        }
      }
    }
  }
}
</script>
