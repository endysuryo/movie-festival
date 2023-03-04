<template>
  <main>
    <h1>Top Movies</h1>
    <v-card class="mx-auto mt-4" max-width="400" tile>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold"
            >Most Viewed Movie By Title</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <div v-if="topsByTitle.length > 0">
        <v-list-item
          v-for="(movie, index) in topsByTitle"
          :key="index"
          two-line
        >
          <v-list-item-content>
            <v-list-item-title>{{ movie.title }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ movie.views }} viewers</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card>
    <v-card class="mx-auto mt-4" max-width="400" tile>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold"
            >Most Viewed By Genres</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <div v-if="topsByGenre.length > 0">
        <v-list-item
          v-for="(genre, index) in topsByGenre"
          :key="index"
          two-line
        >
          <v-list-item-content>
            <v-list-item-title>{{ genre[0] }}</v-list-item-title>
            <v-list-item-subtitle>{{ genre[1] }} viewers</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card>
  </main>
</template>

<script>
import { getMoviesApi } from '~/api/movies.api'
export default {
  data() {
    return {
      topsByTitle: [],
      topsByGenre: {},
    }
  },
  mounted() {
    this.getMovies()
  },
  methods: {
    async getMovies() {
      const result = await getMoviesApi()

      this.topsByTitle = result.sort((a, b) => b.views - a.views)

      const temp = {}
      result.forEach((movie) => {
        if (temp[movie.genres]) {
          temp[movie.genres] += movie.views
        } else {
          temp[movie.genres] = movie.views
        }
      })

      this.topsByGenre = Object.entries(temp)
    },
  },
}
</script>
