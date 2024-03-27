const form = document.querySelector("#userForm");
const allUsersData = [];

const resetForm = () => {
  form.classList.remove('was-validated');
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('website').value = "";
  document.getElementById('image').value = "";
  document.querySelectorAll('input[name="gender"]').forEach(rb => rb.checked = false);
  document.querySelectorAll('input[name="skill"]').forEach(rb => rb.checked = false);
};

const getData = () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const website = document.getElementById('website').value;
  const image = document.getElementById('image').value;
  let gender;
  let skills = [];
  document.querySelectorAll('input[name="gender"]').forEach(rb => {
    if (rb.checked) gender = rb.value;
  });
  document.querySelectorAll('input[name="skill"]').forEach(rb => {
    if (rb.checked) skills.push(rb.value);
  });
  return { name, email, website, image, gender, skills };
};

form.addEventListener("submit", event => {
  event.preventDefault();
  if (form.checkValidity()) {
    const data = getData();
    allUsersData.push(data);
    printResult(data);
    resetForm();
  } else {
    form.classList.add('was-validated');
  }
  removeSpan();
});

const removeSpan = () => {
  const span = document.getElementById("span");
  if (span) span.remove();
};

const printResult = data => {
  const resultEl = document.getElementById('enrolled-students');
  let sectionHeading = null;
  if (allUsersData.length == 1) {
    sectionHeading = document.createElement('div');
    const description = document.createElement('p');
    description.innerHTML = "Description";
    description.className = "description";

    const image = document.createElement('p');
    image.innerHTML = "Image"
    image.className = "Image";

    sectionHeading.className = "sectionHeading";
    sectionHeading.append(description, image);
  }

  const wrapper = document.createElement('div');
  wrapper.className = "wrapper";
  wrapper.addEventListener('click', e => {
    if (e.target.className.includes('userDeleteBtn')) {
      e.currentTarget.remove();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = "+";
  deleteBtn.className = "userDeleteBtn";

  const textInfoContainer = document.createElement('div');
  textInfoContainer.className = "textInfoContainer";

  const imageContainer = document.createElement('div');
  imageContainer.className = "imageContainer";

  const imageHyperlink = document.createElement('a');
  imageHyperlink.href = data.image;
  imageHyperlink.target = "_blank";

  const name = document.createElement('p');
  name.className = "infoText userName";
  name.innerHTML = data.name;

  const gender = document.createElement('p');
  gender.className = "infoText gender";
  gender.innerHTML = data.gender;

  const email = document.createElement('p');
  email.className = "infoText email";
  email.innerHTML = data.email;

  const website = document.createElement('a');
  website.className = "infoText website";
  website.innerHTML = data.website;
  website.href = data.website;
  website.target = "_blank";

  const skills = document.createElement('p');
  skills.className = "infoText skills";
  skills.innerHTML = data.skills.join(', ');

  const userImage = document.createElement('img');
  userImage.className = "userImage";
  userImage.src = data.image;

  textInfoContainer.append(name, gender, email, website, skills);
  imageHyperlink.appendChild(userImage);
  imageContainer.appendChild(imageHyperlink);

  wrapper.append(textInfoContainer, imageContainer, deleteBtn);

  if (sectionHeading == null) {
    resultEl.append(wrapper);
  } else {
    resultEl.append(sectionHeading, wrapper);
  }
};
