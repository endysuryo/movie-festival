<template>
  <main>
    <div class="d-flex justify-space-between align-center py-4">
      <h1>Movies</h1>
      <v-btn elevation="2" color="success" @click="$router.push('/movies/form')"
        >Create</v-btn
      >
    </div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="movies"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
    >
      <template #[`item.likes`]="{ item }">
        <span>{{ item.likes.length }}</span>
      </template>
      <template #[`item.dislikes`]="{ item }">
        <div>{{ item.dislikes.length }}</div>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editMovie(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteMovie(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </main>
</template>

<script>
import { deleteMoviesApi, getMoviesApi } from '~/api/movies.api'

export default {
  name: 'Movie',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        // { text: 'Description', value: 'description' },
        { text: 'Duration', value: 'duration' },
        // { text: 'Artists', value: 'artists' },
        { text: 'Genres', value: 'genres' },
        { text: 'Views', value: 'views' },
        { text: 'Likes', value: 'likes' },
        { text: 'Dislikes', value: 'dislikes' },
        // { text: 'URL', value: 'url' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      movies: [],
    }
  },
  mounted() {
    this.getMovies()
  },
  methods: {
    async getMovies() {
      this.movies = await getMoviesApi()
    },
    editMovie(id) {
      this.$router.push(`/movies/form?id=${id}`)
    },
    deleteMovie(id) {
      deleteMoviesApi(id).then(() => this.getMovies())
    },
  },
}
</script>
