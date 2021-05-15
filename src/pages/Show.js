import React, { useState } from "react";

export default function Show({
  // Get id from router props
  match: {
    params: { id },
  },
  // Get the people array from props
  people,
  updatePeople,
  history,
  deletePerson,
}) {
  const person = people.find((person) => person._id === id);

  const initialFormData = { ...person };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePeople(formData, person._id);
    history.push("/");
  };

  const removePerson = () => {
    deletePerson(person._id);
    history.push("/");
  };

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <button onClick={removePerson} id="delete">
        Delete Person
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit">Update Person</button>
      </form>
    </div>
  );
}
