let data = []
axios.get('http://localhost:3001/contacts')
    .then((response) => {
        console.log(response);
        console.log(response.data);

        const tampilanHTML = document.getElementById("contactList")
        data = response.data;

        response.data.forEach(item => {

            const {
                id,
                name,
                address,
                email,
                phone,
                company
            } = item;
            console.log(name);

            const isiHTML = `<div class="col-sm">
    <div class="card" style="width: 17rem;margin: 20px;">
        <img src="/assets/user.png" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">
            No.ID : ${id}
            <br>
            Name : ${name}
            <br>
            Address : ${address}
            <br>
            Email : ${email}
            <br>
            Phone Number : ${phone}
            <br>
            Company : ${company}
            </p>
        </div>  
        <button onclick ="edit(${id})"><b>EDIT</b></button>
        <br>
        <button onclick ="hapus(${id})"><b>DELETE</b></button>
    </div>

</div>`;
            tampilanHTML.innerHTML += isiHTML;

        })
    })

    .catch((pesanError) => {
        console.error(pesanError);
    })

document.getElementById('simpanContact').addEventListener('submit', function (event) {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    debugger;
    axios.post('http://localhost:3001/contacts', {


        name,
        address,
        email,
        phone,
        company
    })
})

const hapus = id => {
    axios.delete(`http://localhost:3001/contacts/${id}`)
}
const edit = id => {
    const pencarianContact = data.find(item => {
        return item.id == id
    })
    console.log(pencarianContact);

    if (pencarianContact) {
        const name = window.prompt('Name', pencarianContact.name);
        const address = window.prompt('Address', pencarianContact.address);
        const email = window.prompt('email', pencarianContact.email);
        const phone = window.prompt('phone', pencarianContact.phone);
        const company = window.prompt('company', pencarianContact.company);
        axios.put(`http://localhost:3001/contacts/${id}`, {
            name,
            address,
            email,
            phone,
            company
        });

    }
}