import { Collaborateur } from './Collaborateur';

export class ReserverVehicule {
  constructor(
    public dateReservation: Date,
    public dateRetour: Date,
    public chauffeur?: Collaborateur,
    public vehicule?: VehiculeSociete,
    public optionChauffeur?: boolean,
    public disponible?: boolean
  ) {}
}
