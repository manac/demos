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

function run() {
    console.log('run')
    emailjs.init('ersnyAV0gQv1AH9dn');


    const check = {
        plant_no_1: 'text',
        plant_no_2: 'text',
        location_depot: 'string',

        rego_1: 'text',
        rego_2: 'text',

        rego_expiry_1: 'date',
        rego_expiry_2: 'date',
        tsl_labels_checked: 'bool',

        hubo_reading_1: 'number',
        hubo_reading_2: 'number',
        logbook_filled_in: 'bool',

        ruc_expiry_1: 'date',
        ruc_expiry_2: 'date',
        dg_sheets_filled_in: 'bool',

        speedo_reading: 'number',
        pre_check_ewp: 'bool',

        hour_reading: 'number',
        wof_cof_1: 'date',

        service_due: 'date',
        wof_cof_2: 'date',
    }

    //some fake user data retireved on login
    const user = {
        name: 'Mana Coromandel'
    };

    //register plant type from which user can select a plant type
    //if the machine is identifiable via its plant number or QRCode then this will be  loaded

    //examples of registered check profile
    const checks_template = [
        {
            category: null,
            types: [
                'V/P'
            ],
            types_display: 'header',
            entries: [
                {
                    text: 'Engine oil level',
                    types: ['V/P']
                },
                {
                    text: 'Coolant level',
                    types: ['V/P']
                },
                {
                    text: 'Fuel levels',
                    types: ['V/P']
                },
                {
                    text: 'Hydraulic oil level',
                    types: ['V/P']
                },
                {
                    text: 'Air system / leaks',
                    types: ['V/P']
                },
                {
                    text: 'Air tanks drain',
                    types: ['V/P']
                },
                {
                    text: 'Wipers / Washers',
                    types: ['V/P']
                },
                {
                    text: 'Trailer coupling',
                    types: ['V/P']
                },
                {
                    text: 'Brakes',
                    types: ['V/P']
                },
                {
                    text: 'Handbrake',
                    types: ['V/P']
                },
                {
                    text: 'Tracks damage',
                    types: ['V/P']
                },
                {
                    text: 'Track adjustment',
                    types: ['V/P']
                },
                {
                    text: 'Grease points',
                    types: ['V/P']
                },
                {
                    text: 'Auto greasers',
                    types: ['V/P']
                }]
        },
        {
            category: 'Lights',
            types: [
                'V/P', 'TR'
            ],
            types_display: 'header',
            entries: [
                {
                    text: 'Beacon',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Brake',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Tail',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Indicators',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Head',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Day lamps',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Reflectors',
                    types: ['V/P', 'TR']
                }
            ]
        },
        {
            category: 'Tyres',
            types: [
                'V/P', 'TR'
            ],
            types_display: 'none',
            entries: [
                {
                    text: 'Tread',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Inflation',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Damage',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Wheel nuts',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Wheel nut indicators',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Mudflaps/Guards',
                    types: ['V/P', 'TR']
                }
            ]
        },
        {
            category: null, types: [
                'V/P'
            ],
            types_display: 'header',
            entries: [
                {
                    text: 'Windscreen - chipped / cracked',
                    types: ['V/P']
                },
                {
                    text: 'Reverse camera system',
                    types: ['V/P']
                },
                {
                    text: 'Reverse alarm warning',
                    types: ['V/P']
                },
                {
                    text: 'Driver & Passenger Seat belts',
                    types: ['V/P']
                },
                {
                    text: 'Cutting edges / blades / bucket teeth',
                    types: ['V/P']
                },
                {
                    text: 'Bucket blade pins & keepers',
                    types: ['V/P']
                }
            ]
        },
        {
            category: null,
            types: [
                'V/P', 'TR'
            ],
            types_display: 'inlline',
            entries: [
                {
                    text: 'Chains / Twitch',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'DG Signs',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Oversize panels',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Downer branding / ZH stickers',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'Fire Ext (if fitted)',
                    types: ['V/P', 'TR']
                },
                {
                    text: 'First aid kit (if fitted)',
                    types: ['V/P', 'TR']
                }
            ]
        }];

    const profile_types = [
        {
            code: 'V',
            description: 'Ute',
            checks: [
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 1],
                [1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 1]
            ]
        },

        {
            code: 'V',
            description: 'Class 1 Truck',
            checks: [
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 1]
            ]
        },

        {
            code: 'P',
            description: 'Excavator',
            checks: [
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1],
                [0, 0, 0, 1, 1, 1]
            ]
        },

        {
            code: 'TR',
            description: 'Trailer',
            checks: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0, 0, 1],
                [1, 1, 1, 0, 0, 1],
                [1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0]
            ]
        }
    ]

    const profile_type = profile_types[0];

    //example equipment profile data
    const equipment_profile = {
        profile_type: profile_types[0],
        plant_no_1: 2984,
        rego_1: 'TX901',
        rego_expiry_1: '2025-08-14',
        hubo_reading_1: 1243546,
        ruc_expiry_1: '2026-10-14',
        speedo_reading: 43543,
        hour_reading: 11111,
        service_due: '2026-10-1',

        plant_no_2: 1984,
        rego_2: 'TX902',
        rego_expiry_2: '2026-08-14',
        hubo_reading_2: 2243546,
        ruc_expiry_2: '2027-10-14',

        wof_cof_1: '2027-01-01',
        wof_cof_2: '2027-02-02',

        tsl_labels_checked: false,
        logbook_filled_in: true,
        dg_sheets_filled_in: false,
        pre_check_ewp: true,

        checks: {}
    };

    loadCheckTemplate(0, profile_type, 'column_1_header', 'column_1_content', checks_template[0])
    loadCheckTemplate(1, profile_type, 'column_2_header', 'column_2_content', checks_template[1], true)
    loadCheckTemplate(2, profile_type, 'column_2_header', 'column_2_content', checks_template[2], true)
    loadCheckTemplate(3, profile_type, 'column_3_header', 'column_3_content', checks_template[3])
    loadCheckTemplate(4, profile_type, 'column_3_header', 'column_3_content', checks_template[4])

    loadProfile(user, equipment_profile, check)

}

function loadProfile(user, machine_profile, check) {
    //load up the profile for today
    const today = new Date();
    document.getElementById('user_name').innerHTML = user.name

    //load today's date
    document.getElementById('todays_date').value = today.toLocaleDateString('en-CA');//today.toISOString().split('T')[0];

    Object.entries(machine_profile).forEach(([id, value]) => {
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
}

/**
 * Loads the template for the checks used by the asset
 */
function loadCheckTemplate(check_index, profile_type, header_id, content_id, checks) {
    // console.log('load template', profile_type, checks);


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

        textEl = document.createElement('div');
        textEl.className = 'text';
        textEl.innerHTML = check.text;

        rightEl = document.createElement('div');
        rightEl.className = 'right';
        let t, total = false;
        for (const type of check.types) {
            t = profile_type.checks[check_index][index] == 0;
            disabled = t || (type == 'V/P' ? !(profile_type.code == 'V' || profile_type.code == 'P') : profile_type.code != 'TR');
            total = !disabled || total;

            ckEl = document.createElement('input');
            ckEl.type = 'checkbox';
            ckEl.className = disabled ? 'check_box_disabled' : 'check_box';
            ckEl.disabled = disabled;

            if (!disabled) {
                store.inputs.push({
                    text: check.text,
                    input: ckEl
                })

            }

            rightEl.appendChild(ckEl);
        }

        cellEl.appendChild(textEl);
        cellEl.appendChild(rightEl);
        container.appendChild(cellEl);

        cellEl.className = !total ? 'check_cell_disabled' : 'check_cell';
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
    const date = new Date(value)
    document.getElementById(id).value = '2025-08-14';//date;//date.toLocaleDateString();
}

function renderNumber(id, value) {
    document.getElementById(id).innerHTML = value
}

function renderText(id, value) {
    document.getElementById(id).innerHTML = 't_' + value
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