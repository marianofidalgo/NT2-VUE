<template>
  <div class="flex justify-center items-center">
    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders formulario-principal">
      <q-header elevated class="bg-purple">
        <q-toolbar>
          <q-toolbar-title>
            <strong>Agregar evento</strong>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
            <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
              <q-input ref="nombre" v-model="nombre" label="Nombre" lazy-rules :dense="true"
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
              <q-input ref="detalle" v-model="detalle" label="Detalle" type="textarea" rows="4" lazy-rules :dense="true"
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio.']"
              />
              <q-input ref="precio" v-model="precio" label="Precio" type="number" lazy-rules :dense="true"
                :rules="[
                  val => val !== null && val !== '' || 'El campo es obligatorio',
                  val => val >= 0 || 'El precio debe ser mayor o igual a $0.-'
                ]"
              />
              <q-input ref="ubicacion" v-model="ubicacion" label="Ubicación" lazy-rules :dense="true"
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              />
              <q-input ref="capacidad" v-model="capacidad" label="Capacidad" type="number" lazy-rules :dense="true"
                :rules="[
                  val => val !== null && val !== '' || 'El campo es obligatorio',
                  val => val > 0 || 'La capacidad debe ser mayor a 0.'
                ]"
              />
              <q-input ref="fecha" filled v-model="fecha" label="Fecha" :dense="true"
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fecha" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="cerrar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input ref="horario" filled v-model="horario" label="Horario" :dense="true"
                :rules="[ val => val && val.length > 0 || 'El campo es obligatorio']"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time v-model="horario" mask="HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="cerrar" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-select ref="calificacion" v-model="calificacion" label="Calificacion" filled clearable
                :options="calificaciones" :dense="true"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section avatar>
                      <q-icon :name="scope.opt.icon" :color="scope.opt.color"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-html="scope.opt.label" />
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

            <q-select ref="tipo" v-model="tipo" label="Tipo" filled clearable
              :options="tipos" :dense="true"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" :color="scope.opt.color" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

              <div class="q-gutter-sm" align="right">
                <q-btn type="reset"  color="purple" label="Cancelar" flat/>
                <q-btn type="submit" color="purple" label="Agregar" />
              </div>
            </q-form>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { AGREGAR_EVENTO } from 'src/store/evento/types'

export default {
  data () {
    return {
      // id: automatico
      nombre: '',
      detalle: '',
      precio: 0,
      ubicacion: '',
      capacidad: 0,
      fecha: this.$store.state.evento.tentativo.fecha,
      horario: '12:00',
      calificacion: '',
      tipo: '',

      calificaciones: [
        {
          label: 'Malo',
          value: '1',
          icon: 'thumb_down_alt',
          color: 'blue'
        },
        {
          label: 'Regular',
          value: '2',
          icon: 'thumb_up_alt',
          color: 'blue'
        },
        {
          label: 'Bueno',
          value: '3',
          icon: 'star_outline',
          color: 'yellow'
        },
        {
          label: 'Muy bueno',
          value: '4',
          icon: 'star_half',
          color: 'yellow'
        },
        {
          label: 'Excelente',
          value: '5',
          icon: 'star',
          color: 'yellow'
        }
      ],
      tipos: [
        {
          label: 'Concierto',
          value: 'concierto',
          icon: 'audiotrack',
          color: 'blue'
        },
        {
          label: 'Deportivo',
          value: 'deportivo',
          icon: 'sports',
          color: 'teal'
        },
        {
          label: 'Festival',
          value: 'festival',
          icon: 'wine_bar',
          color: 'red'
        }
      ]
    }
  },

  methods: {
    onSubmit () {
      this.$refs.nombre.validate()
      this.$refs.detalle.validate()
      this.$refs.precio.validate()
      this.$refs.ubicacion.validate()
      this.$refs.capacidad.validate()

      if (this.$refs.nombre.hasError || this.$refs.detalle.hasError || this.$refs.precio.hasError ||
          this.$refs.ubicacion.hasError || this.$refs.capacidad.hasError) {
        this.formHasError = true
      } else {
        const evento = {
          nombre: this.nombre,
          detalle: this.detalle,
          precio: this.precio,
          ubicacion: this.ubicacion,
          capacidad: this.capacidad,
          fecha: this.fecha,
          horario: this.horario,
          calificacion: this.calificacion.value,
          tipo: this.tipo.value
        }

        console.log('tipo: ' + this.tipo)
        console.log('calificacion: ' + this.calificacion)

        this.$store.dispatch('evento/' + AGREGAR_EVENTO, evento)
        this.$router.push('calendario-eventos')
      }
    },

    onReset () {
      this.name = null
      this.age = null

      this.$refs.name.resetValidation()
      this.$refs.age.resetValidation()
    }
  }
}
</script>

<style lang="sass">
  textarea
    max-height: 80px

  .scroll
    overflow: hidden;

  .q-toolbar
    padding: 0px 24px;

  .formulario-principal
    width: 400px;
    height: 850px;
</style>
