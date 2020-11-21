<template>
  <div class="flex justify-center items-center">
    <div class="lista-principal">
      <q-list bordered padding>
        <q-item-label header>Próximos eventos</q-item-label>
        <div v-for="evento in eventos" :key="evento.id">
          <q-item clickable v-ripple @click="venderEntradas(evento)">
            <q-item-section top avatar>
              <q-avatar text-color="white" :color="solicitarColor(evento)" :icon="solicitarIcono(evento)" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ evento.nombre }}</q-item-label>
              <q-item-label caption lines="2">{{ evento.detalle }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ evento.fecha }}</q-item-label>
              <div class="row">
                <q-icon v-for="(index) in evento.calificacion" :key="index" name="star" color="yellow" />
              </div>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      eventoSeleccionado: ''
    }
  },

  computed: {
    eventos () {
      return this.$store.state.evento.registro
    }
  },

  methods: {
    listarEventos () {
      return this.$store.state.evento.registro
    },
    venderEntradas (evento) {
      this.$router.push('formulario-entrada')
    },
    solicitarColor (evento) {
      let color = ''

      if (evento.tipo === 'concierto') {
        color = 'blue'
      } else if (evento.tipo === 'deportivo') {
        color = 'teal'
      } else if (evento.tipo === 'festival') {
        color = 'red'
      } else {
        color = 'gray'
      }

      return color
    },
    solicitarIcono (evento) {
      let icono = ''

      if (evento.tipo === 'concierto') {
        icono = 'audiotrack'
      } else if (evento.tipo === 'deportivo') {
        icono = 'sports'
      } else if (evento.tipo === 'festival') {
        icono = 'wine_bar'
      } else {
        icono = 'fiber_new'
      }

      return icono
    }
  }
}
</script>

<style lang="sass">
  .lista-principal
    min-width: 400px
    max-width: 800px
    width: 100%
    height: 100%
    background-color: white
</style>
