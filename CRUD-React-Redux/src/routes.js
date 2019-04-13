import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import UserActionPage from './pages/UserActionPage/UserActionPage';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    // {
    //     path: '/user/:id/edit',
    //     exact: false,
    //     main: ({match, history}) => <UserActionPage match={match} history={history}/>
    // },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;