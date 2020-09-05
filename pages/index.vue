<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400px">
        <v-card-title>
          <h1>de chat muh BOI</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="whatcha name dude"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="tell me wat de room u want"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >push dat den u ready muh boi</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    layout: "empty",
    head: {
      title: "cool chat dude"
    },
    sockets: {
    connect: function() {
      console.log("Client IO connected");
    }
  },
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'dude rly i need ya name',
        v => (v && v.length <= 16) || 'ya name too big !! cool but give meh only 16 symbs oke? bealive inya',
      ],
      room: '',
      roomRules: [
        v => !!v || 'i cant give ya watchawant withah room toldcha'
      ],
      lazy: false,
    }),

    methods: {
      ...mapMutations(["setUser"]),
      submit () {
        if(this.$refs.form.validate()) {
          const user = {
          name: this.name,
          room: this.room
          }

        this.$socket.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            console.error(data)
          }else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push("/chat")
          }
        })
        }  
      }
    }
  }
</script>
