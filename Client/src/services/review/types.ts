import { ReviewStatus } from "../../types";
export type CreateReviewRequestPayload = {
  rating: number;
  content: string;
  productId: string;
  reservationId?: string; // <-- Make this optional
};
export type ChangeStatusRequestPayload = {
  id: string;
  status: ReviewStatus.Approved | ReviewStatus.Rejected;
};
