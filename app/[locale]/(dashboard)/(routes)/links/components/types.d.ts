export enum LinkType {
  youtube = "youtube",
  whatsApp = "whatsapp",
  website = "website",
}

export interface ILink {
  type: LinkType;
  url: string;
}

type Links = {
  links: ILink[];
};
