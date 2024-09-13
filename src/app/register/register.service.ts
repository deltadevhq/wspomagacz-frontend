import { inject, Injectable } from '@angular/core';
import { AuthService } from '../shared/data-access/auth.service';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private authService = inject(AuthService);
}
