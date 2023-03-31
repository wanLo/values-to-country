# values-to-country 🌏

This single page webapp predicts the country closest to your values, judged by questions Q177–Q195 from the [World Value Survey](https://www.worldvaluessurvey.org/wvs.jsp). Predictions are performed on the 2018-2022 wave's data using a k-nearest neighbor classifyer running locally in your browser.

Check out the demo deployed at [wanlo.github.io/values-to-country/](https://wanlo.github.io/values-to-country/). 🚀

The webapp is built with [NuxtJS](https://nuxtjs.org/), [TailwindCSS](https://tailwindcss.com/), [D3](https://d3js.org/), [ml-knn](https://github.com/mljs/knn), and [iso-3166](https://github.com/wooorm/iso-3166).

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [Nuxt documentation](https://nuxtjs.org).