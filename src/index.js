document.addEventListener("DOMContentLoaded", () => {
  const dogInfo = document.getElementById("table-body");
  const dogsNameInput = document.getElementById("name");
  const dogsBreedInput = document.getElementById("breed");
  const dogId = document.getElementById("id");
  const dogsSexInput = document.getElementById("sex");
  const form = document.getElementById("dog-form");
  fetch("http://localhost:3000/dogs")
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((dog) => {
        const row = dogInfo.insertRow();
        const dogName = row.insertCell();
        dogName.innerHTML = dog.name;
        const dogBreed = row.insertCell();
        dogBreed.innerHTML = dog.breed;
        const dogSex = row.insertCell();
        dogSex.innerHTML = dog.sex;
        const edit = document.createElement("button");
        row.append(edit);
        edit.innerHTML = "Edit dog";
        edit.addEventListener("click", () => {
          dogsNameInput.value = dog.name;
          dogsBreedInput.value = dog.breed;
          dogsSexInput.value = dog.sex;
          dogId.value = dog.id;
        });
      });
    });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = dogId.value;
    const name = dogsNameInput.value;
    const breed = dogsBreedInput.value;
    const sex = dogsSexInput.value;
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, breed, sex }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let row;
        row.cells[0].innerHTML = data.name;
        row.cells[1].innerHTML = data.breed;
        row.cells[2].innerHTML = data.sex;
      });
  });
});
