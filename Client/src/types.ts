export type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isBlocked: boolean;
  createdAt: string;
  role: UserRole;
  address: string;
  number: number;
};

export type Location = {
  _id: string;
  createdAt: string;
  name: string;
};

export type Category = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type Brand = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type Display = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type Processor = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type GraphicsCard = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type Capacity = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type Ram = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type Product = {
  _id: string;
  name: string;
  fuel: number;
  price: number;
  description: string;
  createdAt: string;
  currency: string;
  discount: number;
  category: Category;
  brand: Brand;
  display: Display;
  processor: Processor;
  graphicscard: GraphicsCard;
  capacity: Capacity;
  ram: Ram;
  images: string[];
  showInRecommendation: boolean;
  reviews: Review[];
};

// export type Reservation = {
//   billing: {
//     name: string;
//     phoneNumber: string;
//     address: string;
//     townCity: string;
//   };
//   createdAt: string;
//   dropOffLocation: string;
//   endDate: string;
//   id: string;
//   pickUpLocation: string;
//   rent: Rent | string;
//   startDate: string;
//   status: ReservationStatus;
//   total: number;
//   updatedAt: string;
//   user: string;
//   _id: string;
//   hasReview: boolean;
// };

export type Review = {
  author: User;
  content: string;
  createdAt: string;
  id: string;
  rating: number;
  product: Product;
  status: ReviewStatus;
  _id: string;
};

export type Conversation = {
  _id: string;
  userName: string;
  userEmail: string;
  userId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  _id: string;
  text: string;
  userId: string;
  userName: string;
  conversation: string | Conversation;
  createdAt: string;
  updatedAt: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export enum ReservationStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Cancelled = "cancelled",
}

export enum ReviewStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}
