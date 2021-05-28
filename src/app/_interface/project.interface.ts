import { PhotoInterface } from './photo.interface';

export interface ProjectInterface {
    filters: number[];
    icon: string;
    icon_hover: string;
    icon_active: string;
    id: number;
    name: string;
    order: number;
    photos: PhotoInterface[];
    is_active: number;
}
