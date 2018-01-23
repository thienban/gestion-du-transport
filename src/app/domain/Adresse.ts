export class Adresse {
  constructor(
    private _numero: number,
    private _rue: string,
    private _codePostal: number,
    private _ville: string
  ) {}

  get numero() {
    return this._numero;
  }

  get rue() {
    return this._rue;
  }

  get codePostal() {
    return this._codePostal;
  }

  get ville() {
    return this._ville;
  }
}
