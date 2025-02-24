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
  
  type Education = {
    name: string;
    details: {
      major: string;
      school: string;
      start: string;
      end: string;
      description: string;
    }[];
  };
  
  type Skill = {
    name: string;
    details: {
      name: string;
      description: string;
    }[];
  };
  
  type Certificate = {
    name: string;
    details: {
      name: string;
      time: string;
    }[];
  };
  
  type Activity = {
    name: string;
    details: {
      holderName: string;
      start: string;
      end: string;
      description: string;
    }[];
  };
  
  type Hobby = {
    name: string;
    details: string;
  };
  
  type Achievement = {
    name: string;
    details: {
      name: string;
      time: string;
    }[];
  };
  
  type Referencer = {
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
    position: string;
    careerGoals: string;
    experiences: Experience;
    education: Education;
    skills: Skill;
    certificates: Certificate;
    activities: Activity;
    hobbies: Hobby;
    referencer: Referencer;
    achievements: Achievement;
  };
  