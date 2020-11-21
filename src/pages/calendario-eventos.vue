<template>
  <div class="eventos-principal">
    <div class="row">
      <div class="calendario-cabecera">
        <q-btn flat dense round icon="chevron_left" @click="anterior()"></q-btn>
        <q-btn flat dense round icon="chevron_right" @click="siguiente()"></q-btn>
        <q-separator vertical />
      </div>
      <div class="calendario-cabecera mes-titulo">{{ title }}</div>
    </div>
    <div class="calendario-principal">
      <q-calendar ref="calendar" v-model="selectedDate" view="month" animated no-active-date
        :locale="locale"
        :short-weekday-label="false"
        :short-month-label="false"
        :day-height="100"
        @click:day2="administrarDia"
        >

        <template #day="{ timestamp }">
          <template v-for="evento in eventos">
            <q-badge v-if="coincideFecha(evento, timestamp)" class="text-white full-width evento-dia'"
              :key="evento.id"
              :style="solicitarEstilos(evento)">
              <q-icon :name="solicitarIcono(evento)" class="q-mr-xs"></q-icon><span class="ellipsis">{{ evento.nombre }}</span>
            </q-badge>
          </template>
        </template>
      </q-calendar>
    </div>
  </div>
</template>

<script>
import { FECHA_TENTATIVA } from 'src/store/evento/types'

export default {
  data () {
    return {
      selectedDate: '',
      dateFormatter: undefined,
      locale: 'es-ar'
    }
  },

  beforeMount () {
    this.iniciar()
  },

  computed: {
    title () {
      if (this.dateFormatter && this.locale && this.selectedDate) {
        const date = new Date(this.selectedDate)
        return this.dateFormatter.format(date)
      }
      return ''
    },
    eventos () {
      return this.$store.state.evento.registro
    }
  },

  methods: {
    iniciar () {
      this.selectedDate = new Date()
      this.dateFormatter = new Intl.DateTimeFormat(this.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' })
    },
    anterior () {
      this.$refs.calendar.prev()
    },
    siguiente () {
      this.$refs.calendar.next()
    },
    coincideFecha (evento, timestamp) {
      return (timestamp.date === evento.fecha)
    },
    administrarDia (datos) {
      this.$router.push('formulario-evento')
      console.log(datos.scope)
      console.log(datos.scope.timestamp)
      this.$store.dispatch('evento/' + FECHA_TENTATIVA, datos.scope.timestamp.date)
    },
    solicitarEstilos (evento) {
      const s = {}

      s['background-color'] = this.solicitarColor(evento)

      return s
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
  .q-calendar-weekly
    &__day-month
      visibility: hidden;
    &__day
      padding-top: 25px

  .eventos-principal
    min-width: 800px;
    width: 100%;
    height: 100%;

  .evento-dia
    width: 100%
    cursor: pointer
    height: 16px
    max-height: 16px
    align-items: flex-start

  .calendario-cabecera
    margin: 8px;

  .calendario-principal
    border-style: solid;
    border-width: 1px;
    border-color: #BDBDBD;

  .mes-titulo
    font-size: 22px;
</style>
