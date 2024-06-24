const loadServices = () => {
    fetch("https://testing-8az5.onrender.com/services/")
      .then((res) => res.json())
      .then((data) => displayService(data))
      .catch((err) => console.log(err));
  };
  
  const displayService = (services) => {
    //   console.log(services);
    services.forEach((service) => {
      const parent = document.getElementById("service-container");
      const li = document.createElement("li");
      li.innerHTML = `
                <div style="width: 350px; height: 450px; border-radius: 20px" class="shadow">
                  <div>
                    <img
                      src=${service.image}
                      style="width: 300px; height: 200px; border-radius: 20px"
                      class="mt-4"
                      loading="lazy"
                      alt="..."
                    />
                  </div>
                  <div">
                    <h3 class="mt-3">${service.name}</h3>
                    <p class="w-75 mx-auto">
                      ${service.description.slice(0, 120)}
                    </p>
                    <a href="#" class="learn-more">Learn more</a>
                  </div>
                </div>
        `;
      parent.appendChild(li);
    });
  };




  const loadDoctors = (search) => {
    document.getElementById("doctors").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    console.log(search);
    fetch(
      `https://testing-8az5.onrender.com/doctor/list/?search=${
        search ? search : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.results.length > 0) {
          document.getElementById("spinner").style.display = "none";
          document.getElementById("nodata").style.display = "none";
          displyDoctors(data?.results);
        } else {
          document.getElementById("doctors").innerHTML = "";
          document.getElementById("spinner").style.display = "none";
          document.getElementById("nodata").style.display = "block";
        }
      });
  };
  
  const displyDoctors = (doctors) => {
    doctors?.forEach((doctor) => {
      // console.log(doctor);
      const parent = document.getElementById("doctors");
      const div = document.createElement("div");
      div.classList.add("doc-card");
      div.innerHTML = `
          <img class="doc-img mt-3" src=${doctor.image} alt="" />
                <h5 style="color: #007E85" class="mt-2">${doctor?.full_name}</h5>
                <h6>${doctor?.designation[0]}</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                  numquam!
                </p>
          `;
  
      parent.appendChild(div);
    });
  };


  const loadDesignation = () => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("drop-deg");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerText = item?.name;
          parent.appendChild(li);
        });
      });
  };
  const loadSpecialization = () => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("drop-spe");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `
          <li onclick="loadDoctors('${item.name}')"> ${item.name}</li>
            `;
          parent.appendChild(li);
        });
      });
  };



  const handleSearch = () => {
    const value = document.getElementById("search").value;
    loadDoctors(value);
  };
  


//   Calling Functions

loadServices();
// loadDoctors();
loadDesignation();
loadSpecialization();
handleSearch();