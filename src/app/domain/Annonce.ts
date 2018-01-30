import { Collaborateur } from './Collaborateur';
import { StatusCovoit } from './StatusCovoit';
import { VehiculeCovoit } from './VehiculeCovoit';

export class Annonce {
  constructor(
    public adresseDepart?: string,
    public adresseArrive?: string,
    public dateDepart?: Date,
    public vehicule?: VehiculeCovoit,
    public auteur?: Collaborateur,
    public dateArrive?: Date,
    public statusCovoit?: string,
    public dureeTrajet?: number,
    public distance?: number,
    public passagers?: Collaborateur[],
    public annulations?: Collaborateur[],
    public id?: number,
    public nbPlacesRestantes?: number
  ) {}
}
