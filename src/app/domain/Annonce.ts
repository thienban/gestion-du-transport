import { Collaborateur } from './Collaborateur';
import { Adresse } from './Adresse';
import { StatusCovoit } from './StatusCovoit';

export class Annonce {
  constructor(
    private _auteur: Collaborateur,
    private _dateDepart: Date,
    private _dateArrive: Date,
    private _nbPlacesDispos: number,
    private _status: StatusCovoit,
    private _adresseDepart: string,
    private _adresseArrive: string,
    private _dureeTrajet: number,
    private _distance: number,
    private _passagers: Collaborateur[]
  ) {}

  get auteur() {
    return this._auteur;
  }

  get dateDepart() {
    return this._dateDepart;
  }

  get dateArrive() {
    return this._dateArrive;
  }

  get nbPlacesDispos() {
    return this._nbPlacesDispos;
  }

  get status() {
    return this._status;
  }

  get adresseDepart() {
    return this._adresseDepart;
  }

  get adresseArrive() {
    return this._adresseArrive;
  }

  get dureeTrajet() {
    return this.dureeTrajet;
  }

  get distance() {
    return this.distance;
  }

  get passagers() {
    return this._passagers;
  }
}
