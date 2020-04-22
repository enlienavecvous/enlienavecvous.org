import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../config";
import {formatDateForTable, formatTime} from "../utils/DateUtils";

function BookingConfirmation(props) {
    const [appoint, setAppoint] = useState({});
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        setLoading(true);
        const appoint = JSON.parse(localStorage.getItem('booking'));
        setAppoint(appoint);
        setLoading(false);
    },[]);

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        const status = await axios.get(`${API_URL}confirm/booking/${appoint.bookingId}`).then(response => {
            return response.status
        });
        if (status === 200) {
            localStorage.removeItem('booking');
            setIsConfirmed(true);
        }
        setLoading(false);
    }

    return (
        <div>
            {loading && <div className="container"><p>Chargement en cours...</p></div>}
            {
                !loading &&
                <div className="container">
                    {
                        isConfirmed ?
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                Rendez-vous confirmé !
                                <button onClick={props.resetBooking} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> :
                            <div>
                                <h2>Demande de rendez-vous</h2>
                                Le {appoint.bookingDate && formatDateForTable(appoint.bookingDate)} à {formatTime(appoint.bookingStart)} avec {appoint.therapistFirstName} {appoint.therapistLastName}
                                <div className="alert alert-warning">
                                    En cas d'annulation, merci de prévenir votre thérapeute au plus vite en cliquant sur le bouton d'annulation disponible dans vos rendez-vous.
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <button className="btn btn-primary" type="submit">Confirmer mon rendez-vous</button>
                                    <button onClick={props.resetBooking} className="btn btn-danger" type="button">Annuler ce rendez-vous</button>
                                </form>
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default BookingConfirmation