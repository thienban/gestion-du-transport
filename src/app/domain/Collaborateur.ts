export class Collaborateur {
  constructor(
    private _matricule: string,
    private _nom: string,
    private _prenom: string,
    private _email: string,
    private _photo: string
  ) {}

  get matricule() {
    return this._matricule;
  }
}
