import Dashboard from "./pages/Dashboard.tsx";
import {IRoute} from "./types/types.ts";

const routes: IRoute[] = [
    {
        key: 'home',
        title: 'Home',
        path: '/',
        component: Dashboard,
    },

];

export default routes;
