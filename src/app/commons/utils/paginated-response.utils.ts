import { PaginatedResponse } from "../../components/appointments/model/paginated-response.model";
import { Appointment } from "../model/appointment.model";

export function emptyPaginatedResponse(): PaginatedResponse {
  return {
    totalElements: 0,
    totalPages: 0,
    size: 5,
    content: [] as Appointment[],
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    first: true,
    last: false,
    numberOfElements: 0,
    pageable: {
      pageNumber: 0,
      pageSize: 5,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      paged: true,
      unpaged: false
    },
    empty: true
  };
}