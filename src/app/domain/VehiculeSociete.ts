export class VehiculeSociete {
  constructor(
    public id: number,
    public immatriculation: string,
    public marque: { id: number; libelle: string },
    public modele: { id: number; libelle: string },
    public categorie: { id: number; libelle: string },
    public nbPlaces: number,
    public photo: string,
    public disponible?: boolean
  ) {}
}
