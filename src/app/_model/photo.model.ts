import { PhotoInterface } from '../_interface/photo.interface';

export class Photo implements PhotoInterface {

    constructor(
        public id = null,
        public idproject = null,
        public order = null,
        public photo = null,
        public description = null
    ) {}

}
