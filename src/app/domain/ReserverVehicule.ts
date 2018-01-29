import { Collaborateur } from './Collaborateur';
import { VehiculeSociete } from './VehiculeSociete';

export class ReserverVehicule {
  constructor(
    public dateReservation: Date,
    public dateRetour: Date,
    public passager?: Collaborateur,
    public chauffeur?: Collaborateur,
    public vehicule?: VehiculeSociete,
    public optionChauffeur?: boolean,
    public disponible?: boolean
  ) {}
}
