import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

export default function Main() {
  const [people, setPeople] = useState(null);
  const URL = "https://ga-express-people-api.herokuapp.com/people";

  const getPeople = async () =>
    await fetch(URL)
      .then((res) => res.json())
      .then((data) => setPeople(data));

  const createPerson = async (person) =>
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    }).then(() => getPeople());

  const updatePeople = async (person, id) =>
    await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then(() => getPeople());

  const deletePerson = async (id) =>
    await fetch(`${URL}/${id}`, { method: "delete" }).then(() => getPeople());

  useEffect(() => getPeople(), []);
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPerson={createPerson} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
              {...rp}
              people={people}
              updatePeople={updatePeople}
              deletePerson={deletePerson}
            />
          )}
        />
      </Switch>
    </main>
  );
}
