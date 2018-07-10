export class Skill {
    skill: string;
    entries = [];
    selectedEntry: { [key: string]: any } = {
        value: null,
        description: null
    };

    constructor(skill) {
        this.skill = skill;
    }

    update(skill){
        this.entries = [
            {
                description: 'High',
                id: 1,
                value:skill
            },
            {
                description: 'Medium',
                id: 2,
                value:skill
            },
            {
                description: 'Low',
                id: 3,
                value:skill
            }
        ];

        if (this.entries) {
            this.onSelectionChange(this.entries[0]);
        }
    }
    onSelectionChange(entry) {
        this.selectedEntry = Object.assign({}, this.selectedEntry, entry);
    }

}