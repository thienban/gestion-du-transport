export class VehiculeSociete {
  constructor(
    public immatriculation: string,
    public marque: string,
    public modele: string,
    public categorie: { id: number; libelle: string },
    public nbPlaces: number,
    public photo: string,
    public disponible?: boolean,
    public id?: number
  ) {}
}
