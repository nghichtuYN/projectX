export type Experience = {
  name: string;
  details: {
    position: string;
    company: string;
    start: string;
    end: string;
    description: string;
  }[];
};

export type Education = {
  name: string;
  details: {
    major: string;
    school: string;
    start: string;
    end: string;
    description: string;
  }[];
};

export type Skill = {
  name: string;
  details: {
    name: string;
    description: string;
  }[];
};
export type Projects = {
  name: string;
  details: {
    name_project: string;
    position: string;
    position_person: string;
    description_position: string;
    consumer: string;
    consumer_name: string;
    start: string;
    end: string;
    description_stacks: string;
    stacks: string;
    quantity: string;
    quantity_persons: string;
  }[];
};
export type Certificate = {
  name: string;
  details: {
    name: string;
    time: string;
  }[];
};

export type Activity = {
  name: string;
  details: {
    holderName: string;
    start: string;
    end: string;
    description: string;
  }[];
};

export type Hobby = {
  name: string;
  details: string;
};
export type InfoBonus = {
  name: string;
  details: string;
};

export type Achievement = {
  name: string;
  details: {
    name: string;
    time: string;
  }[];
};

export type Referencer = {
  name: string;
  details: {
    info: string;
  }[];
};

export type FormType = {
  email: string;
  phone: string;
  social: string;
  address: string;
  name: string;
  avatar?: string;
  position: string;
  careerGoals: string;
  experiences: Experience;
  educations: Education;
  skills: Skill;
  certificates: Certificate;
  activities: Activity;
  hobbies: Hobby;
  referencer: Referencer;
  achievements: Achievement;
  projects: Projects;
  info_bonus: InfoBonus;
};
