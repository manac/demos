const store = {
    ps_number: 2778901,
    inputs: []
};

//have admin dashboard

//add data for look up

//work out data types to be stored

//plant_check_record ...records should be searchable via plant_id 
let plant_check_record = {
    id: '',
    date: '',
    driver_id: '',
    plant_no_1: '',
    plant_rego_1: '',
    qr_code: ''
}

//each plant should have a unique identifier
let plant = {
    qr_code: 1,
}

function initUI() {
    const track = document.getElementById('carouselTrack');
    const pages = document.querySelectorAll('.page');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');

    let currentIndex = 0;

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, pages.length - 1);

        nextBtn.innerHTML = currentIndex >= 2 ? "Submit" : "Next";

        if (currentIndex == 3) {
            process();
        } else {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });

    backBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    //employee select page
    const employeeFilter = (query, employees) => {
        return employees.filter(item =>
            (item.first_name + ' ' + item.last_name).toLowerCase().includes(query)
        );
    }

    const employeeName = (employee) => {
        return employee.first_name + ' ' + employee.last_name;
    }

    const employeeCallback = (employee) => {
        loadUserProfile(employee);
    }
    initDropDown(Data.USERS, 'employeeSearchBox', 'employeeDropdown', employeeFilter, employeeName, employeeCallback);

    //equipment select page
    const equipmentFilter = (query, equipment) => {
        return equipment.filter(item =>
            (item.rego_1).toLowerCase().includes(query)
        );
    }

    const equipmentName = (equipment) => {
        return equipment.rego_1;
    }

    const equipmentCallback = (equipment) => {
        loadEquipmentProfile(equipment, Constants.CHECK_DATA_TYPES)
    }
    initDropDown(Data.EQUIPMENT, 'equipmentSearchBox', 'equipmentDropdown', equipmentFilter, equipmentName, equipmentCallback);

}

function initDropDown(data, searchId, dropId, filter, format, callback) {


    const searchBox = document.getElementById(searchId);
    const dropdown = document.getElementById(dropId);

    searchBox.addEventListener('input', () => {
        const query = searchBox.value.toLowerCase();
        dropdown.innerHTML = '';

        const filtered = filter(query, data);

        filtered.forEach(item => {
            const li = document.createElement('li');
            li.style.fontSize = '20px';
            li.textContent = format(item);
            li.onclick = () => {
                searchBox.value = format(item);
                dropdown.innerHTML = '';

                callback(item);
            };
            dropdown.appendChild(li);
        });

        dropdown.style.display = filtered.length ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            dropdown.innerHTML = '';
        }
    });

}

function run() {
    registerEnterListener('plant_no_1');
    registerEnterListener('rego_1');



}

function registerEnterListener(id) {
    const field = id;
    const el = document.getElementById(id);
    el.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Optional: stop default newline behavior

            const search = el.innerHTML.toUpperCase();
            const equipment_profile = Data.EQUIPMENT.find(p => p[id] == search);
            // console.log("Enter was pressed!", equipment_profile);

            if (equipment_profile) {
                loadEquipmentProfile(equipment_profile, Constants.CHECK_DATA_TYPES)
            }

        }
    });
}

function loadUserProfile(user) {
    // const user = Data.USERS[user_id];

    //load up the profile for today
    const today = new Date();
    document.getElementById('user_name').innerHTML = user.first_name + ' ' + user.last_name;

    //load users signature
    document.getElementById('signature_image').src = 'images/' + user.id + '.png';

    //load today's date
    document.getElementById('todays_date').value = today.toLocaleDateString('en-CA');

    // Object.entries(equipment_profile).forEach(([id, value]) => {
    //     const setting_type = check[id];
    //     let pre = '*';
    //     switch (setting_type) {
    //         case 'text':
    //             renderText(id, value);
    //             break;
    //         case 'number':
    //             renderNumber(id, value);
    //             break;
    //         case 'bool':
    //             renderBool(id, value);
    //             break;
    //         case 'date':
    //             renderDate(id, value);
    //             break;
    //     }
    // });
}

function loadEquipmentProfile(equipment_profile, check) {
    Object.entries(equipment_profile).forEach(([id, value]) => {
        const setting_type = check[id];
        let pre = '*';
        switch (setting_type) {
            case 'text':
                renderText(id, value);
                break;
            case 'number':
                renderNumber(id, value);
                break;
            case 'bool':
                renderBool(id, value);
                break;
            case 'date':
                renderDate(id, value);
                break;
        }
    });

    const profile_index = Constants.PROFILE_TYPES.findIndex(p => p.id == equipment_profile.profile_type);

    const profile_type = Constants.PROFILE_TYPES[profile_index];

    // console.log(profile_type);

    loadCheckTemplate(0, profile_type, 'column_1_header', 'column_1_content', Constants.PROFILE_CHECKS_TEMPLATE[0])
    loadCheckTemplate(1, profile_type, 'column_2_header', 'column_2_content', Constants.PROFILE_CHECKS_TEMPLATE[1], true)
    loadCheckTemplate(2, profile_type, 'column_2_header', 'column_2_content', Constants.PROFILE_CHECKS_TEMPLATE[2], true)
    loadCheckTemplate(3, profile_type, 'column_3_header', 'column_3_content', Constants.PROFILE_CHECKS_TEMPLATE[3])
    loadCheckTemplate(4, profile_type, 'column_3_header', 'column_3_content', Constants.PROFILE_CHECKS_TEMPLATE[4])

}

/**
 * Loads the template for the checks used by the asset
 */
function loadCheckTemplate(check_index, profile_type, header_id, content_id, checks) {
    const container = document.getElementById(content_id);

    let headerEl, headerNameEl, rightEl, categoryEL, cellEl, textEl, ckEl;

    //check to see if there is a category name
    if (checks.category) {
        categoryEL = document.createElement('div');
        categoryEL.className = 'check_category';
        categoryEL.innerHTML = checks.category;
        container.appendChild(categoryEL);
    }

    if (checks.types_display != 'none') {
        if (checks.types_display == 'header') {
            headerEl = document.getElementById(header_id);

        } else {
            // headerEl = document.getElementById(header_id);
            headerEl = document.createElement('div');
            headerEl.className = 'check_cell_header';
            headerEl.innerHTML = '<div></div>';
            container.appendChild(headerEl);
        }

        rightEl = document.createElement('div');
        rightEl.className = 'right';
        headerEl.appendChild(rightEl);

        let wrap;

        for (const type of checks.types) {

            console.log(profile_type.code, type)

            if (type == 'TR') {
                addHeaderEl(profile_type.code == 'TR', 'TR', rightEl);

            } else {
                addHeaderEl(profile_type.code == 'V', 'V', rightEl);
                addHeaderEl(false, '/', rightEl);
                addHeaderEl(profile_type.code == 'P', 'P', rightEl);
            }
        }
    }

    let disabled, index = 0;
    for (const check of checks.entries) {

        //add a check entry
        cellEl = document.createElement('div');
        container.appendChild(cellEl);


        textEl = document.createElement('div');
        // textEl.className = 'text';
        textEl.innerHTML = check.text;

        rightEl = document.createElement('div');
        rightEl.className = 'right';

        cellEl.appendChild(textEl);
        cellEl.appendChild(rightEl);

        let t, total = false;
        for (const type of check.types) {
            t = profile_type.checks[check_index][index] == 0;
            disabled = t || (type == 'V/P' ? !(profile_type.code == 'V' || profile_type.code == 'P') : profile_type.code != 'TR');
            total = !disabled || total;

            ckEl = document.createElement('input');

            ckEl.id = check.text.toLowerCase().replace(/\s+/g, '_');
            ckEl.name = ckEl.id;

            ckEl.type = 'checkbox';
            ckEl.disabled = disabled;

            textEl.className = disabled ? 'text_disabled' : 'text';

            if (!disabled) {
                store.inputs.push({
                    text: check.text,
                    input: ckEl
                })
            }

            rightEl.appendChild(ckEl);
        }

        index += 1;
    }
}

function addHeaderEl(wrap, html, parentEl) {
    const headerNameEl = document.createElement('div');
    headerNameEl.className = 'right_cell'
    headerNameEl.innerHTML = html;

    if (wrap) {
        const wrapEl = document.createElement('div');
        wrapEl.className = html == 'TR' ? 'big_circle-wrapper' : 'small_circle-wrapper';
        wrapEl.appendChild(headerNameEl);

        parentEl.appendChild(wrapEl)
    } else {
        parentEl.appendChild(headerNameEl);
    }

}

function renderDate(id, value) {
    document.getElementById(id).value = value;
}

function renderNumber(id, value) {
    document.getElementById(id).innerHTML = value
}

function renderText(id, value) {
    document.getElementById(id).innerHTML = value
}

function renderBool(id, value) {
    document.getElementById(id).checked = value;
}

class Check {
    constructor(settings) {
        this.settings = settings
    }
}

function process() {

    generateImage();
    return;


    const zip = new JSZip();

    const service_id = 'service_5d2e5xd';
    const template_id = 'template_pbuzx95';
    const to_email = 'warriorhard13@gmail.com';

    html2canvas(container).then(canvas => {
        const scale = 0.25; // Adjust this to reduce size
        const resizedCanvas = document.createElement("canvas");
        resizedCanvas.width = canvas.width * scale;
        resizedCanvas.height = canvas.height * scale;

        const ctx = resizedCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);

        const base64Image = resizedCanvas.toDataURL("image/jpeg", 0.7); // Use JPEG + compression
        //   sendViaEmailJS(base64Image);


        // const base64Image = canvas.toDataURL("image/png"); // This is a data URL

        // Send it via EmailJS
        emailjs.send(service_id, template_id, {
            to_email: to_email,
            message: "Plant Check",
            attachment: {
                name: "plant_check.png",
                data: base64Image // This must be a full data URL
            }
        }).then(response => {
            console.log("Email sent!", response.status, response.text);
        }).catch(error => {
            console.error("Email failed:", error);
        });
    });

    console.log('a', zip);

    // alert('process');



    // zip.file("hello.txt", "This is the content of the file.");
    // zip.generateAsync({ type: "blob" }).then(content => {
    //     saveAs(content, "example.zip"); // Requires FileSaver.js
    // });


    // zip.generateAsync({ type: "base64" }).then(base64Zip => {
    //     emailjs.send(sevrice_id, template_id, {
    //         name: 'Mr Mana Coromandel',
    //         to_email: to_email,
    //         message: 'Hey My Honey'
    //     }).then(response => {
    //         console.log("Email sent!", response.status, response.text);
    //     }).catch(err => {
    //         console.error("Failed to send email:", err);
    //     });
    // });

    return;

    const constainer = document.getElementById('container');

    // console.log('process', html2canvas);

    html2canvas(container).then(canvas => {
        const link = document.createElement("a");
        link.download = "capture.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });


    //create a report of all of the inputs that have not passed
    const report = [];

    store.inputs.forEach((input, index) => {
        if (!input.input.checked) {
            report.push({
                text: input.text,
                reason: ''
            });
        }
    });

    console.log(report);

}

function generateImage() {
    const constainer = document.getElementById('container');



    // html2canvas(container).then(canvas => {
    //     const img = document.createElement("img");
    //     img.src = canvas.toDataURL("image/png");
    //     img.alt = "Captured Image";
    //     img.style.maxWidth = "100%"; // Optional: scale image to fit container
    //     document.body.appendChild(img); // Or append to a specific element
    // });

    html2canvas(container).then(canvas => {
        canvas.toBlob(blob => {
            const file = new File([blob], "capture.png", { type: "image/png" });

            const shareData = {
                title: "My Screenshot",
                text: "Check out this image!",
                files: [file]
            };

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share(shareData)
                    .then(() => console.log("Shared successfully"))
                    .catch(err => console.error("Share failed:", err));
            } else {
                alert("Sharing not supported on this device or browser.");
            }
        });
    });

}

function auto() {
    store.inputs.forEach((input, index) => {
        input.input.checked = true;
    });
}

class Profile {

    constructor(data) {
        this.plant_no_1 = data.plant_no_1;
        this.rego_1 = data.rego_1;
    }
}