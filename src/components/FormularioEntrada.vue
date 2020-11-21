<template>
  <div class="flex justify-center items-center">
    <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders formulario-principal">
      <q-header elevated class="bg-purple">
        <q-toolbar>
          <q-toolbar-title>
            <strong>Vender entradas</strong>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input lazy-rules v-model="name" label="Nombre del evento"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input lazy-rules type="number" v-model="age" label="Your age *"
                :rules="[
                  val => val !== null && val !== '' || 'Please type your age',
                  val => val > 0 && val < 100 || 'Please type a real age'
                ]"
              />

              <q-toggle v-model="accept" label="I accept the license and terms" />

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

<style lang="sass">
  .scroll
    overflow: hidden;

  .q-toolbar
    padding: 0px 24px;

  .formulario-principal
    width: 400px;
    height: 500px;
</style>
