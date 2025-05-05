export interface IInformation {
  id: number;
  titre?: string | null;
  imageInfos?: string | null;
  imageInfosContentType?: string | null;
  contenu?: string | null;
}

export type NewInformation = Omit<IInformation, 'id'> & { id: null };
