import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Index({ people, createPerson }) {
  const initialFormData = {
    name: "",
    image: "",
    title: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPerson(formData);
    setFormData(initialFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="texte"
          value={formData.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={formData.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <button type="submit">Create Person</button>
      </form>
      <div className="people-container">
        {people ? (
          people.map((person) => (
            <div key={person._id} className="person">
              <Link to={`/people/${person._id}`}>
                <h1>{person.name}</h1>
              </Link>
              <img src={person.image} alt={person.name} />
              <h3>{person.title}</h3>
            </div>
          ))
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </>
  );
}
