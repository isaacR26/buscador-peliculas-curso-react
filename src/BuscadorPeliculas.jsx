import React, { useState } from 'react'

export const BuscadorPeliculas = () => {
    const urlbase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '5a5221ddec70e181c9ef6a9625aa140a'
    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])
    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas = async () => {
        try {
            
            const response = await fetch(`${urlbase}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)
        } catch (error) {
            console.error(' ha ocurrido un error', error)
        }
    }
    return (
        <div className='container'>
            <h1 className='title'>Buscador de Peliculas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='¿Que Pelicula quieres ver?'
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className='serach-button'>Buscar</button>
            </form>

            <div className='movie-list'>
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className='movie-card'>
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
