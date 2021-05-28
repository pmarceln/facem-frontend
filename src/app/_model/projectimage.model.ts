import { ProjectImageInterface } from "../_interface/projectimage";

export class ProjectImage implements ProjectImageInterface {
    constructor(
        public image = null,
        public text = null,
        public order = 0
    ) {}
}
