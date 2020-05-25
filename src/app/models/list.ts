import Card from './card';

export default interface List {
  name: string;
  cards: Card[];
  userId: string;
}
