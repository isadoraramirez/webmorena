import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Inicio = React.lazy(() => import('./users/users'));
const Notificaciones = React.lazy(() => import('./users/alert'));

const routes = [
    { path: '/inicio', exact: true, name: 'inicio', component: Inicio },
    { path: '/notificaciones', exact: true, name: 'notificaciones', component: Notificaciones }

];
export default routes;