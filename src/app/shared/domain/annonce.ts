import { Collaborateur } from './collaborateur';
export class Annonce {
  statut: string;
  nbPlacesDispos: number;
  adresseDepartString: string;
  adresseArriveString: string;
  dureeTrajet: number;
  distance: number;
  dateDepart: Date;
  dateArrivee: Date;
  auteur: Collaborateur;
  passagers: Collaborateur;
}
