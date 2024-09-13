import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import {
    PreloadAllModules,
    provideRouter,
    RouteReuseStrategy,
    withPreloading,
} from '@angular/router';
import { routes } from './app.routes';
import {
    IonicRouteStrategy,
    provideIonicAngular,
} from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
    ],
};
