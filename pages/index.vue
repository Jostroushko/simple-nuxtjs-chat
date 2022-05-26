<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400px">
        <v-card-title>
          <h1>Чат</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Введите Ваш никнейм"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Введите номер комнаты"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >Войти в комнату</v-btn>
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
      title: "Чат"
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
        v => !!v || 'пустое поле',
        v => (v && v.length <= 16) || 'имя слишком большое. имя не может превышать 16 символов',
      ],
      room: '',
      roomRules: [
        v => !!v || 'ошибка ввода комнаты'
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
