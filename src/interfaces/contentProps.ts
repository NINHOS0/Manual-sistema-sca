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
  content?: itens[];
  routes?: subsection[];
}

export interface subsection {
  id: string;
  name: string;
  content: itens[];
}

export type itens = (textItem | linkItem | galleryItem | listItem)