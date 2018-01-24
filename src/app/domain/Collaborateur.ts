export class Collaborateur {
  constructor(
    public matricule?: string,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public role?: string,
    public photo?: string
  ) {}
}
