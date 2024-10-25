export interface Event {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  date: string;
  image: string | React.ReactNode | undefined;
  href: string;
}
