<template>
  <v-form ref="form">
    <h1>Create Movie</h1>
    <v-text-field v-model="title" label="Title" required></v-text-field>
    <v-text-field v-model="duration" label="Duration" required></v-text-field>
    <v-textarea v-model="description" label="Description" required></v-textarea>
    <v-text-field v-model="artists" label="Artists" required></v-text-field>
    <v-select v-model="genres" :items="items" label="Genres"></v-select>
    <v-text-field v-model="url" label="URL" required></v-text-field>

    <div class="d-flex justify-end">
      <v-btn color="primary" class="mr-4" @click="cancel">Cancel</v-btn>
      <v-btn v-if="$route.query.id" color="success" class="mr-4" @click="update"
        >Update</v-btn
      >
      <v-btn v-else color="success" class="mr-4" @click="save">Save</v-btn>
    </div>
  </v-form>
</template>

<script>
import {
  getDetailMoviesApi,
  createMoviesApi,
  updateMoviesApi,
} from '~/api/movies.api'
export default {
  data: () => ({
    id: '',
    title: '',
    duration: '',
    description: '',
    artists: '',
    genres: '',
    url: '',
    views: 0,
    likes: [],
    dislikes: [],
    items: ['Action', 'Horror', 'Romance', 'Comedy'],
  }),
  mounted() {
    this.getDetailMovies()
  },
  methods: {
    async getDetailMovies() {
      const id = this.$route.query.id || null

      if (id) {
        const result = await getDetailMoviesApi(id)
        this.id = id
        this.title = result.title
        this.duration = result.duration
        this.description = result.description
        this.artists = result.artists
        this.genres = result.genres
        this.url = result.url
        this.views = result.views
        this.likes = result.likes
        this.dislikes = result.dislikes
      }
    },
    async save() {
      await createMoviesApi({
        title: this.title,
        duration: this.duration,
        description: this.description,
        artists: this.artists,
        genres: this.genres,
        url: this.url,
        views: this.views,
        likes: [],
        dislikes: [],
      }).then(this.$router.back())
    },
    async update() {
      await updateMoviesApi(this.id, {
        title: this.title,
        duration: this.duration,
        description: this.description,
        artists: this.artists,
        genres: this.genres,
        url: this.url,
        views: this.views,
        likes: this.likes,
        dislikes: this.dislikes,
      }).then(this.$router.back())
    },
    cancel() {
      this.$router.back()
    },
  },
}
</script>
