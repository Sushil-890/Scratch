import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AddForm.css';

const AddMovieForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    release_year: "",
    genre: "",
    director: "",
    cast: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ You must be logged in to add a movie!");
      navigate("/login");
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("⚠️ Please login first!");
    navigate("/login");
    return;
  }

  try {
    // 1. Create Razorpay Order
    const orderRes = await fetch("https://scratch-server.onrender.com/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: 100 }), // ₹1.00 = 100 paise
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok) throw new Error(orderData.message);

    // 2. Open Razorpay popup
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // set in .env file
      amount: orderData.amount,
      currency: orderData.currency,
      name: "SphereCity",
      description: "Movie Listing Fee",
      order_id: orderData.id,
      handler: async function (response) {
        alert("✅ Payment Successful");
        alert(`🧾 Receipt: ${orderData.receipt}`);

        // 3. After successful payment, add movie
        const payload = {
          ...formData,
          genre: formData.genre.split(",").map((g) => g.trim()),
          director: formData.director.split(",").map((d) => d.trim()),
          cast: formData.cast.split(",").map((c) => c.trim()),
        };

        const movieRes = await fetch("https://scratch-server.onrender.com/movies/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const movieData = await movieRes.json();
        if (movieRes.ok) {
          alert("🎬 Movie added!");
          setFormData({
            title: "",
            release_year: "",
            genre: "",
            director: "",
            cast: "",
            image: "",
          });
          navigate("/");
        } else {
          alert("❌ Movie not added after payment!");
          console.error(movieData.error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    alert("❌ Payment failed or movie not added.");
    console.error(error.message);
  }
};


/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const payload = {
      ...formData,
      genre: formData.genre.split(",").map((g) => g.trim()),
      director: formData.director.split(",").map((d) => d.trim()),
      cast: formData.cast.split(",").map((c) => c.trim()),
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/movies/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Movie added!");
      setFormData({
        title: "",
        release_year: "",
        genre: "",
        director: "",
        cast: "",
        image: "",
      });
      navigate("/");
    } else {
      alert("❌ Failed to add movie");
      console.error(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <h2>Add New Movie</h2>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input 
        name="release_year" 
        type="number" 
        placeholder="Release Year" 
        value={formData.release_year} 
        onChange={handleChange} 
        min="1800" 
        max="2100" 
        required 
      />
      <input name="genre" placeholder="Genre (comma-separated)" value={formData.genre} onChange={handleChange} required />
      <input name="director" placeholder="Director (comma-separated)" value={formData.director} onChange={handleChange} required />
      <input name="cast" placeholder="Cast (comma-separated)" value={formData.cast} onChange={handleChange} required />
      <input name="image" placeholder="Poster Image URL" value={formData.image} onChange={handleChange} required />
      <button type="submit">🎬 Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
