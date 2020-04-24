import React from "react";
import {formatDateForTable, formatTime} from "../utils/DateUtils";

function BookingRow({ createPatientBooking, booking }) {
    return (
        <>
            <td>
                <button onClick={() => createPatientBooking(booking.id)} className={"btn btn-outline-primary"}>
                    Réserver
                </button>
            </td>
            <td>{booking.therapist?.displayName ?? booking.therapist?.firstName + " " + booking.therapist?.lastName}</td>
            <td>{booking.bookingDate && formatDateForTable(booking.bookingDate)}</td>
            <td>{booking.bookingStart && formatTime(booking.bookingStart)}</td>
            <td>{booking.bookingEnd && formatTime(booking.bookingEnd)}</td>
        </>
    )
}

export default BookingRow