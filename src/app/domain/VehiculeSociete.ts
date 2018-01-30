export class VehiculeSociete {
  constructor(
    public id: number,
    public immatriculation: string,
    public nbPlaces: number,
    public marque: string,
    public modele: string,
    public photo: string,
    public disponible?: boolean
  ) {}
}
