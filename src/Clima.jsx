import { useEffect, useState } from "react";


export function Clima() {
    const [ciudad, setCiudad] = useState("");
    const [clima, setClima] = useState(null);
    const [cargando, setCargando] = useState(false);

    const buscarClima = () => {

        setCargando(true);
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}?unitGroup=metric&key=GHJDSLTXTUUW3VNEN2FV36MEG&contentType=json`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setClima(data);
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error al obtener el clima:", error);
                setCargando(false);
            });
    };

    return (
        <div className="ContainerClima">
            <div className="ContainerSearch">
                <h2>¿Querés saber el clima?</h2>
                <div className="containeToResponsive">
                <input className="inputSerch"
                    type="text"
                    placeholder="Escribí una ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                />
                <button className="btn_Serch" onClick={buscarClima}>Buscar</button>
             </div>
                {cargando && <p>Cargando clima...</p>}
            </div>
            {
                clima && (
                    <div className="containerWeather">
                        <div className="containerResults">
                            <h3>{clima.resolvedAddress}</h3>
                            <label>Temperatura actual:</label>
                            <p className="temp">{clima.currentConditions.temp}°C</p>
                            <p>Condiciones: {clima.currentConditions.conditions}</p>
                        </div>
                        {clima?.days?.[0]?.hours && (
                            <div className="hourlyForecast">
                                <h4>Pronóstico por hora:</h4>
                                <div className="containerHourGrid">
                                    <div className="hourGrid">
                                        {clima.days[0].hours.slice(0, 25).map((hour, index) => (
                                            <div key={index} className="hourCard">
                                                <p><strong>{hour.datetime.slice(0, 5)}</strong></p>
                                                <p>{hour.temp}°C</p>
                                                <p>{hour.conditions}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                )
            }
        </div>

    );
}

