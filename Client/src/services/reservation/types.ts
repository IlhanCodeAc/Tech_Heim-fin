import { Reservation, ReservationStatus } from "@/types";

export type CreateReservationRequestPayload = {
  billingPhoneNumber: string;
  billingAddress: string;
  billingTownCity: string;
  billingName: string;
  startDate: string;
  endDate: string;
  dropOffLocation: string;
  pickUpLocation: string;
  rentId: string;
};

export type CreateReservationResponseType = {
  item?: Reservation;
  message: string;
};

export type ChangeStatusRequestPayload = {
  id: string;
  status: ReservationStatus.Approved | ReservationStatus.Rejected;
};
