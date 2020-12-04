import React from 'react';


const SignUp1 = React.lazy(() => import('./login/login'));

const route = [
    { path: '/auth2', exact: true, name: 'Signup 1', component: SignUp1 }
];



export default route;