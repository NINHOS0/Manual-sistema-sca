import { galleryItem, linkItem, listItem, textItem } from "./itensProps";

export interface data {
  content: content[];
}

export interface language {
  id: string;
  name: string;
}

export interface content {
  [langId: string]: section[];
}

export interface section {
  id: string;
  name: string;
  content?: (textItem | linkItem | galleryItem | listItem)[];
  routes?: subsection[];
}

export interface subsection {
  id: string;
  name: string;
  content: (textItem | linkItem | galleryItem | listItem)[];
}