<template>
  <v-app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650">
      <v-list subheader>
      <v-subheader>Ya squad</v-subheader>

      <v-list-item
        v-for="u in users"
        :key="u.id"
        @click.prevent
      >
        <v-list-item-content>
          <v-list-item-title>{{u.name}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="u.id == user.id ? 'deep-purple accent-4' : 'grey'">mdi-chat</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
      <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>room {{user.room}}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import {mapState, mapMutations} from "vuex"
export default {
data: () => ({
  drawer: true
  // users: [
  //   {id: 1, name: 'raddude55'},
  //   {id: 2, name: 'tvoynosochek'},
  //   {id: 3, name: 'den777'},
  //   {id: 4, name: 'wlwpower'},
  //   {id: 5, name: 'noelle33'},
  //   {id: 6, name: 'yOUrpRobLeM'}
  // ]
}),
computed: mapState(["user", "users"]),
methods: {
  ...mapMutations(["clearData"]),
  exit () {
    this.$socket.emit('userLeft', this.user.id, () => {
      this.$router.push("/?message=leftChat")
      this.clearData()
    })
    
  }
}
};
</script>
