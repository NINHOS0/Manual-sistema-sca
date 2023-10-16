
export interface textItem {
  type: 'text';
  fontSize?: sizes;
  fontWeight?: weights;
  value: string;
}

export interface linkItem {
  type: 'link';
  fontSize?: sizes;
  fontWeight?: weights;
  value: string;
  url: string;
}

export interface listItem {
  type: 'list';
  style: 'number' | 'point';
  list: listObject[]
}

interface listObject {
  title: string,
  text?: string
}

export interface galleryItem {
  type: 'gallery';
  images: image[];
}

interface image {
  src: string
  alt: string
}

export type sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type weights = "light" | "normal" | "semibold" | "bold";
export type types = "text" | "title" | "link";