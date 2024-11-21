import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonRouterLink,
  IonRouterLinkWithHref,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  Platform,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';


import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/data-access/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon, NgIf, IonMenu, IonItem, IonMenuToggle, IonList, IonContent, IonTitle, IonToolbar, IonHeader, IonSplitPane, IonRouterOutlet, IonMenuButton, IonRouterLink, IonButton, IonRouterLinkWithHref, RouterLink, RouterLinkActive, IonItemDivider],
})
export class TabsComponent {
  platform = inject(Platform);
  authService = inject(AuthService);
}
