import { Collaborateur } from './Collaborateur';
import { VehiculeSociete } from './VehiculeSociete';

export class ReservationVehicule {
  constructor(
    public passager?: Collaborateur,
    public chauffeur?: Collaborateur,
    public vehicule?: VehiculeSociete,
    public optionChauffeur?: boolean,
    public disponible?: boolean,
    public dateReservation?: Date,
    public dateRetour?: Date,
    public toConfirm?: boolean
  ) {}
}
