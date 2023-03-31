<template>
  <div class="max-w-xl mx-auto px-1 items-center justify-center">
    <h1 class="text-4xl text-gray-700 font-bold text-center mt-6">
      Values to <br> Country 🌏
    </h1>
    <div class="my-8 mx-2 text-gray-800">
      This tool predicts the country closest to your values, judged by some questions
      from the <a href="https://www.worldvaluessurvey.org/wvs.jsp" class="underline">World Value Survey</a>.
      The prediction is performed on your device, none of your data is sent anywhere.
    </div>
    <h2 class="my-8 mx-2 text-gray-800 font-medium">
      Please tell me for each of the following actions whether you think it can always be justified, never be justified, or something in between.
    </h2>
    <form>
      <div
        v-for="(item, index) in survey"
        :key="item.question"
      >
        <hr v-if="index===0"/>
        <h3 class="text-sm text-gray-700 font-medium sm:whitespace-no-wrap text-left mb-6 mt-4 mx-2">
          {{ item.question }}
        </h3>
        <Range
          class="my-4 mx-1"
          label-left="Never justifiable"
          label-right="Always justifiable"
          :range-value="get_answer(index)"
          @update:rangeValue="set_answer(index, $event)"
        />
        <hr />
      </div>
    </form>
    <div class="mt-16 mx-2 text-gray-800 font-medium text-center">
      {{ (predicted_country != null) ? 'The country closest to your values is:' : 'Please fill in all answers to get a prediction.' }}
    </div>
    <h2 class="mb-8 mx-2 text-3xl text-gray-700 font-bold text-center">
      {{ predicted_country }}
    </h2>
    <div class="mb-8 text-sm text-gray-400 text-center">
      Check out the code on my <a href="https://github.com/wanLo/values-to-country" class="underline" target="_blank">GitHub</a>.
    </div>
  </div>
</template>

<script>
import KNN from 'ml-knn'
import Range from '~/components/Range'
import * as d3 from "d3"
import {iso31661} from 'iso-3166'

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
    //console.log(this.knn)
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
          return null
        }
        else {
          const country = this.knn.predict(vector)
          const full_name = iso31661.find(c => c.alpha3 === country)
          const codePoints = full_name.alpha2
            .toUpperCase()
            .split('')
            .map(char =>  127397 + char.charCodeAt())
          const flag = String.fromCodePoint(...codePoints)
          return full_name.name + ' ' + flag
        }
      }
    }
  }
}
</script>
