export class UserService {
  getUsers(url = "http://localhost:4545/users", method = "GET") {
    return fetch(url, {
      method: method,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .catch((err) => {
        console.error(`Fetch problem: ${err.message}`);

        const div = document.createElement("div");
        const table = document.querySelector(".table-responsive");
        div.textContent = "Произошла ошибка, данных нет!";
        table.append(div);
      });
  }

  addUser(user, url = "http://localhost:4545/users", method = "POST") {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((error) => {
        const div = document.createElement("div");
        const table = document.querySelector(".table-responsive");
        div.textContent = "Произошла ошибка, данных нет!";
        table.append(div);
      });
  }

  removeUser(id) {
    return this.getUsers(`http://localhost:4545/users/${id}`, "DELETE");

    // return fetch(`http://localhost:4545/users/${id}`, {
    //   method: "DELETE",
    // }).then((res) => res.json());
  }

  changeUser(id, data) {
    return this.addUser(data, `http://localhost:4545/users/${id}`, "PATCH");

    // return fetch(`http://localhost:4545/users/${id}`, {
    //   method: "PATCH",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => res.json());
  }

  getUser(id) {
    return this.getUsers(`http://localhost:4545/users/${id}`);
    // return fetch(`http://localhost:4545/users/${id}`).then((res) => res.json())
  }

  editUser(id, user) {
    return this.addUser(user, `http://localhost:4545/users/${id}`, "PUT");

    // return fetch(`http://localhost:4545/users/${id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(user),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => res.json());
  }

  filterUsers(filterOption) {
    return this.getUsers(`http://localhost:4545/users?${filterOption}=true`);
    // return fetch(`http://localhost:4545/users?${filterOption}=true`).then((res) => res.json())
  }

  getSortUsers(sortOption) {
    return this.getUsers(
      `http://localhost:4545/users?_sort=${sortOption.name}&_order=${sortOption.value}`
    );
    // return fetch(`http://localhost:4545/users?_sort=${sortOption.name}&_order=${sortOption.value}`).then((res) => res.json())
  }

  getSearchUsers(str) {
    return this.getUsers(`http://localhost:4545/users?name_like=${str}`);

    // return fetch(`http://localhost:4545/users?name_like=${str}`).then((res) =>
    //   res.json()
    // );
  }
}
