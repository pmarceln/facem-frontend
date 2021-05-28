import { ProjectInterface } from '../_interface/project.interface';

export class Project implements ProjectInterface {

    constructor(
        public filters = null,
        public icon = null,
        // tslint:disable-next-line: variable-name
        public icon_hover = null,
        // tslint:disable-next-line: variable-name
        public icon_active = null,
        public id = null,
        public name = null,
        public order = null,
        public photos = null,
        public is_active = 0,
    ) {}
}
