import { Collaborateur } from './collaborateur';
export class Annonce {
  statut: string;
  nbPlacesDispos: number;
  adresseDepart: string;
  adresseArrive: string;
  dureeTrajet: number;
  distance: number;
  dateDepart: Date;
  dateArrivee: Date;
  auteur: Collaborateur;
  passagers: Collaborateur;
}
