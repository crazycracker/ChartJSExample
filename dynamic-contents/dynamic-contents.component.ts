import {Component} from '@angular/core';
import {Skill} from './skill.component';

@Component({
    selector: 'app-dynamic-contents',
    templateUrl: 'dynamic-contents.component.html',
    styleUrls: ['dynamic-contents.component.scss']
})

export class DynamicContentsComponent {

    skills: Array<Skill>;
    constructor(){
        this.skills = [];
    }

    addSkill(skill){
        if(skill !== ''){
            let newSkill = new Skill(skill);
            newSkill.update(skill);
            this.skills.push(newSkill);
        }
    }

    removeSkill(skill){
        let index = this.skills.indexOf(skill);
        this.skills.splice(index,1);
    }
}
