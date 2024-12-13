import { Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Equipment } from '../../../shared/models/Equipment';
import { toObservable } from '@angular/core/rxjs-interop';
import { EquipmentService } from '../../../shared/data-access/equipment.service';

@Component({
    selector: 'app-add-custom-exercise-add-equipment-list',
    templateUrl: './add-custom-exercise-add-equipment-list.component.html',
    styleUrls: ['./add-custom-exercise-add-equipment-list.component.scss'],
    standalone: true,
  imports: [
    AsyncPipe,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
    IonTitle,
    IonToolbar,
    NgForOf,

  ],
})
export class AddCustomExerciseAddEquipmentListComponent {
  equipment: Equipment[] = [];

  private equipmentService = inject(EquipmentService);
  equipment$ = toObservable(this.equipmentService.equipment);

  private modalController = inject(ModalController);

  confirm() {
    return this.modalController.dismiss(this.equipment, 'confirm');
  }

  addEquipment(equipment: Equipment) {
    const equipmentExists = this.equipment.find((eq) => eq.id === equipment.id);

    if (equipmentExists) {
      return;
    }

    this.equipment.push(equipment);
  }
}
