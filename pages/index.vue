<template>
  <main>
    <h1>Watch</h1>
    <v-container fluid>
      <v-data-iterator
        :items="movies"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
      >
        <template #header>
          <v-toolbar dark class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn depressed color="blue" :value="false">
                  <v-icon>mdi-sort-ascending</v-icon>
                </v-btn>
                <v-btn depressed color="blue" :value="true">
                  <v-icon>mdi-sort-descending</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template #default="props">
          <v-row class="mt-4">
            <v-col
              v-for="item in props.items"
              :key="item.title"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ item.title }}
                  <v-chip class="ml-auto" color="orange" small>
                    {{ item.genres }}
                  </v-chip>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content class="font-weight-light grey--text">
                      {{ item.description }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content class="font-italic indigo--text">
                      Artists: {{ item.artists }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-icon small>mdi-eye</v-icon
                    ><span class="text-sm-body-2 ml-2">{{ item.views }}</span>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content class="text-sm-body-2"
                      >{{ item.duration }}
                    </v-list-item-content>
                    <v-btn elevation="2" icon>
                      <v-icon
                        dark
                        color="success"
                        @click="play(item.id, item.views, item.url)"
                        >mdi-play</v-icon
                      ></v-btn
                    >
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </main>
</template>

<script>
import { getMoviesApi, updateMoviesApi } from '~/api/movies.api'
export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'title',
      keys: ['Title', 'Genres', 'Artists', 'Views'],
      movies: [],
    }
  },
  computed: {
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name')
    },
  },
  mounted() {
    this.getMovies()
  },
  methods: {
    async getMovies() {
      this.movies = await getMoviesApi()
    },
    async play(id, views, url) {
      await updateMoviesApi(id, {
        views: views + 1,
      }).then(() => {
        this.getMovies()
        if (url) {
          window.open(url, '_blank')
        }
      })
    },
  },
}
</script>
