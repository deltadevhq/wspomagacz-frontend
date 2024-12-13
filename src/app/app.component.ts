import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  alertCircle,
  alertCircleOutline,
  barbell,
  calendarOutline,
  caretBack,
  caretForward,
  checkmarkCircle,
  checkmarkCircleOutline,
  checkmarkDone,
  chevronBack,
  chevronDown,
  chevronForward,
  chevronUp,
  close,
  closeCircleOutline,
  cloudyOutline,
  compassOutline,
  copy,
  earthOutline,
  ellipse,
  ellipsisHorizontal,
  eyeOffOutline,
  flameOutline,
  flash,
  flashOutline,
  heart,
  heartOutline,
  homeOutline,
  informationCircleOutline,
  logOutOutline,
  notificationsOutline,
  pencil,
  peopleOutline,
  personAddOutline,
  personOutline,
  personRemoveOutline,
  play,
  playCircleOutline,
  remove,
  repeat,
  ribbon,
  save,
  settings,
  settingsOutline,
  shareSocialOutline,
  star,
  statsChart,
  stop,
  timeOutline,
  trashBin,
  trashBinOutline,
  trendingUpOutline,
  trophyOutline,
} from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      add,
      alertCircle,
      alertCircleOutline,
      barbell,
      calendarOutline,
      caretBack,
      caretForward,
      checkmarkCircle,
      checkmarkCircleOutline,
      checkmarkDone,
      chevronBack,
      chevronDown,
      chevronForward,
      chevronUp,
      close,
      closeCircleOutline,
      cloudyOutline,
      compassOutline,
      copy,
      earthOutline,
      ellipse,
      ellipsisHorizontal,
      eyeOffOutline,
      flameOutline,
      flash,
      flashOutline,
      heart,
      heartOutline,
      homeOutline,
      informationCircleOutline,
      logOutOutline,
      notificationsOutline,
      pencil,
      peopleOutline,
      personAddOutline,
      personOutline,
      play,
      playCircleOutline,
      repeat,
      ribbon,
      save,
      settings,
      settingsOutline,
      shareSocialOutline,
      statsChart,
      stop,
      timeOutline,
      trashBin,
      trashBinOutline,
      trendingUpOutline,
      trophyOutline,
      personRemoveOutline,
      star,
      remove
    });
  }
}
