import React, { useEffect, useState } from 'react';
function EditMovie(props) {
    const [Movie, setMovie] = useState(props.movie)
    const [name, setname] = useState('')
    const [nameErr, setnameErr] = useState('')
    const [genres, setgenres] = useState('')
    const [genresErr, setgenresErr] = useState('')
    const [image, setimage] = useState('')
    const [imageErr, setimageErr] = useState('')
    const [premired, setpremired] = useState('')
    const [premiredErr, setpremiredErr] = useState('')

    useEffect(() => {
        const Get_Movie_To_Edit= async()=> {
            setname(props.movie.name)
            setgenres(props.movie.genres)
            setimage(props.movie.image)
            setpremired(props.movie.premired)
     }
         Get_Movie_To_Edit()
     }, [])

     const Check_And_Send =async()=> {
        let nameError = "";
        let genresError = "";
        let imageError = "";
        let premiredError = "";
        if (!name) {
            nameError = "Name field is required";
        }
        if (!genres ) {
            genresError = "Genres field is required ";
        }
        if (!image) {
            imageError = "Image field is required";
        }
        if (!premired) {
            premiredError = "Premired field is required";
        }
        if (nameError || genresError || imageError || premiredError) {
            setnameErr(nameError)
            setgenresErr(genresError)
            setimageErr(imageError)
            setpremiredErr(premiredError)
         return false
        }props.update(Movie)
      }
      const Cancel=async()=>  props.cancel()

    return <div className='EditMovie'  >
    Name:<input className='EditMovieInput' defaultValue={props.movie.name} onChange={e => {setMovie({ ...Movie, name: e.target.value })
    setname(e.target.value)}} /> <br></br>
    <span className="text-danger">{nameErr}</span> <br></br>

    Genres: <input className='EditMovieInput' defaultValue={props.movie.genres} onChange={e => {setMovie({ ...Movie, genres: e.target.value })
    setgenres(e.target.value)}}/><br></br>
    <span className="text-danger">{genresErr}</span><br></br>

    Image url: <input className='EditMovieInput' defaultValue={props.movie.image} onChange={e => {setMovie({ ...Movie, image: e.target.value })
    setimage(e.target.value)}}/><br></br>
    <span className="text-danger">{imageErr}</span><br></br>

    Premired: <input className='EditMovieInput' defaultValue={props.movie.premired.split('T')[0]} type={"date"} onChange={e => {setMovie({ ...Movie, premired: e.target.value })
    setpremired(e.target.value)}}/><br></br>
    <span className="text-danger">{premiredErr}</span><br></br>
    <div className='EditMoviecontainer'>

    <button className='EditMovieButtons' onClick={Check_And_Send}>Update</button>
    <button className='EditMovieButtons' onClick={Cancel}>cancel</button>
    </div>
        </div>
}
export default EditMovie
