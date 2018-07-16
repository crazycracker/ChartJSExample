import { Component } from '@angular/core';
import { Skill } from './skill.component';
@Component({
  selector: 'app-irene-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent {
  skills: Array<Skill>;
  /**
   * @constructor:The constructor initializes the skill list
   */
  constructor() {
    this.skills = [];
  }
  /**
   * @param  {string} skill
   * @description:The method updates the skills list by adding the new skill passed onto the method
   * @returns {Object} data: push the data into skills object
   */
  addSkill(skill: string): void {
    if (skill !== '') {
      const newSkill = new Skill(skill);
      newSkill.update(skill);
      this.skills.push(newSkill);
    }
  }
  /**
   * @param  {Skill} skill
   * @description:The method updates the skill list variable by removing the skill passed onto the method
   * @returns {Object} data: pop the data from skills object
   */
  removeSkill(skill: Skill): void {
    const index = this.skills.indexOf(skill);
    this.skills.splice(index, 1);
  }
}
