import { Location } from "./../types/locations";
import { Major } from "@/types/majors";

export type Company = {
  id: string;
  companyName: string;
  shortName: string;
  headQuarterAddress: string;
  logo: string;
  contactEmail: string;
  foundedYear: number;
  size: number;
  introduction: string;
  location: Location;
  major: Major;
  taxCode: string;
};

// Mảng các công ty
type CompanyList = Company[];
export const companyExample: CompanyList = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    companyName: "TechNova Solutions",
    shortName: "TechNova",
    headQuarterAddress: "123 Innovation Street, Silicon Valley, CA 94043111111111111111111111111111111 aaaaaaaaaaaaaaaaaaa",
    logo: "https://www.google.com/imgres?q=image%20company&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F269077%2Fpexels-photo-269077.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-pixabay-269077.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcompany%2520building%2F&docid=RXoHPaoehMdtnM&tbnid=HvITte0g-IkZ7M&vet=12ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA..i&w=2048&h=1365&hcb=2&ved=2ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA",
    taxCode: "8108208262",
    contactEmail: "contact@technova.com",
    foundedYear: 2015,
    size: 250,
    introduction:
      "TechNova Solutions is a leading provider of innovative software solutions.",
    location: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Silicon Valley",
      region: 1,
    },
    major: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Software Development",
    },
  },
  {
    id: "5bb85f64-5717-4562-b3fc-2c963f66afa7",
    companyName: "GreenEnergy Corp",
    shortName: "GreenEnergy",
    headQuarterAddress: "456 Eco Lane, Austin, TX 73301",
    logo: "https://www.google.com/imgres?q=image%20company&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F269077%2Fpexels-photo-269077.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-pixabay-269077.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcompany%2520building%2F&docid=RXoHPaoehMdtnM&tbnid=HvITte0g-IkZ7M&vet=12ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA..i&w=2048&h=1365&hcb=2&ved=2ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA",
    taxCode: "8108208262",
    contactEmail: "info@greenenergy.com",
    foundedYear: 2010,
    size: 150,
    introduction:
      "GreenEnergy Corp specializes in renewable energy solutions for a sustainable future.",
    location: {
      id: "5bb85f64-5717-4562-b3fc-2c963f66afa7",
      name: "Austin",
      region: 2,
    },
    major: {
      id: "5bb85f64-5717-4562-b3fc-2c963f66afa7",
      name: "Renewable Energy",
    },
  },
  {
    id: "7cc85f64-5717-4562-b3fc-2c963f66afa8",
    companyName: "HealthPlus Innovations",
    shortName: "HealthPlus",
    headQuarterAddress: "789 Wellness Road, Boston, MA 02108",
    logo: "https://www.google.com/imgres?q=image%20company&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F269077%2Fpexels-photo-269077.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-pixabay-269077.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcompany%2520building%2F&docid=RXoHPaoehMdtnM&tbnid=HvITte0g-IkZ7M&vet=12ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA..i&w=2048&h=1365&hcb=2&ved=2ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA",
    taxCode: "8108208262",
    contactEmail: "support@healthplus.com",
    foundedYear: 2018,
    size: 80,
    introduction:
      "HealthPlus Innovations is dedicated to advancing healthcare technology.",
    location: {
      id: "7cc85f64-5717-4562-b3fc-2c963f66afa8",
      name: "Boston",
      region: 3,
    },
    major: {
      id: "7cc85f64-5717-4562-b3fc-2c963f66afa8",
      name: "Healthcare Technology",
    },
  },
  {
    id: "9dd85f64-5717-4562-b3fc-2c963f66afa9",
    companyName: "SkyNet Robotics",
    shortName: "SkyNet",
    headQuarterAddress: "101 Future Drive, Seattle, WA 98101",
    logo: "https://www.google.com/imgres?q=image%20company&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F269077%2Fpexels-photo-269077.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-pixabay-269077.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcompany%2520building%2F&docid=RXoHPaoehMdtnM&tbnid=HvITte0g-IkZ7M&vet=12ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA..i&w=2048&h=1365&hcb=2&ved=2ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA",
    taxCode: "8108208262",
    contactEmail: "hello@skynetrobotics.com",
    foundedYear: 2020,
    size: 120,
    introduction:
      "SkyNet Robotics pioneers the development of advanced robotic systems.",
    location: {
      id: "9dd85f64-5717-4562-b3fc-2c963f66afa9",
      name: "Seattle",
      region: 4,
    },
    major: {
      id: "9dd85f64-5717-4562-b3fc-2c963f66afa9",
      name: "Robotics",
    },
  },
  {
    id: "1ee85f64-5717-4562-b3fc-2c963f66afaa",
    companyName: "DataSphere Analytics",
    shortName: "DataSphere",
    headQuarterAddress: "321 Data Avenue, New York, NY 10001",
    logo: "https://www.google.com/imgres?q=image%20company&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F269077%2Fpexels-photo-269077.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-pixabay-269077.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcompany%2520building%2F&docid=RXoHPaoehMdtnM&tbnid=HvITte0g-IkZ7M&vet=12ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA..i&w=2048&h=1365&hcb=2&ved=2ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA",
    taxCode: "8108208262",
    contactEmail: "info@datasphere.com",
    foundedYear: 2012,
    size: 300,
    introduction:
      "DataSphere Analytics provides cutting-edge data analysis and insights.",
    location: {
      id: "1ee85f64-5717-4562-b3fc-2c963f66afaa",
      name: "New York",
      region: 5,
    },
    major: {
      id: "1ee85f64-5717-4562-b3fc-2c963f66afaa",
      name: "Data Analytics",
    },
  },
  {
    id: "2ff85f64-5717-4562-b3fc-2c963f66afab",
    companyName: "EduFuture Inc",
    shortName: "EduFuture",
    headQuarterAddress: "654 Learning Way, Chicago, IL 60601",
    logo: "https://www.google.com/imgres?q=image%20company&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F269077%2Fpexels-photo-269077.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-pixabay-269077.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fcompany%2520building%2F&docid=RXoHPaoehMdtnM&tbnid=HvITte0g-IkZ7M&vet=12ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA..i&w=2048&h=1365&hcb=2&ved=2ahUKEwivt6WVibyMAxVZsVYBHdwZCWAQM3oECBYQAA",
    taxCode: "8108208262",
    contactEmail: "contact@edufuture.com",
    foundedYear: 2016,
    size: 90,
    introduction:
      "EduFuture Inc is transforming education through technology and innovation.",
    location: {
      id: "2ff85f64-5717-4562-b3fc-2c963f66afab",
      name: "Chicago",
      region: 6,
    },
    major: {
      id: "2ff85f64-5717-4562-b3fc-2c963f66afab",
      name: "EdTech",
    },
  },
];
