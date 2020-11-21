const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'calendario-eventos', component: () => import('pages/calendario-eventos.vue') },
      { path: 'proximos-eventos', component: () => import('pages/proximos-eventos.vue') },
      { path: 'formulario-entrada', component: () => import('components/FormularioEntrada.vue') },
      { path: 'formulario-evento', component: () => import('components/FormularioEvento.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
