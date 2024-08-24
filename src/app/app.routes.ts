import {Routes} from '@angular/router';
import {TabsPage} from "./tabs/tabs.page";
import {HomePageComponent} from "./home/home-page.component";

export const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        component: HomePageComponent,
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full',
            },
        ]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
];
