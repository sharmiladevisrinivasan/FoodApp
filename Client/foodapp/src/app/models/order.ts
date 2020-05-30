import { Restaurant } from './restaurant';
import { User } from './user';
export interface Order {
  _id ?: string;
  orderDetails: any;
  restaurantId: Restaurant;
  restaurantName?: string;
  user: User;
}
