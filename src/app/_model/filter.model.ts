import { FilterInterface } from '../_interface/filter.interface';

export class Filter implements FilterInterface {
    constructor(public id = null, public name = null, public order = 0, public is_active = false) { }
}
