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
    public status?: StatusCovoit,
    public dureeTrajet?: number,
    public distance?: number,
    public passagers?: Collaborateur[],
    public id?: number,
    public nbPlacesRestantes?: number
  ) {}
}
